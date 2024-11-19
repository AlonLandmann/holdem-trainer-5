import { produce } from 'immer'
import { useRouter } from 'next/router'
import { createContext, useContext, useEffect, useState } from 'react'

const UserDataContext = createContext();

export function useUserData() {
  return useContext(UserDataContext);
}

function getFirstRanges(folders) {
  if (folders.length > 0) {
    return folders[0].ranges.map(r => r.id);
  }
  return [];
}

function getFirstRange(folders, routerParam) {
  if (routerParam === 'first-range') {
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].ranges.length > 0) {
        return [folders[i].ranges[0].id];
      }
    }
  } else if (routerParam) {
    return [routerParam];
  }
  return [];
}

export function UserDataProvider({ children }) {
  const router = useRouter();
  
  const [user, setUser] = useState({
    info: null,
    settings: null,
    folders: null,
    ranges: null,
    trainingTotals: null,
    trainingHistory: null,
  });

  const [loaded, setLoaded] = useState({
    initialComplete: false,
    lazyComplete: false,
    info: false,
    settings: false,
    folders: false,
    firstRange: false,
    firstRanges: false,
    allRanges: false,
    trainingTotals: false,
    trainingHistory: false,
  });

  async function initialLoad(withSettings, withFolders) {
    try {
      const res = await fetch(`/api/user/initial-load?settings=${withSettings}&folders=${withFolders}`);
      const json = await res.json();

      if (json.success) {
        setUser(produce(draft => {
          draft.info = {
            id: json.user.id,
            createdAt: json.user.createdAt,
            email: json.user.email,
            username: json.user.username,
            isGoogleUser: json.user.isGoogleUser,
            isVerified: json.user.isVerified,
            role: json.user.role,
            membership: json.user.membership,
          };

          if (withSettings) {
            draft.settings = json.user.settings;
          }

          if (withFolders) {
            draft.folders = json.user.folders;
          }
        }));

        setLoaded(produce(draft => {
          draft.initialComplete = true;
          draft.info = true;

          if (withSettings) {
            draft.settings = true;
          }

          if (withFolders) {
            draft.folders = true;
          }
        }));

        console.log(`Initial load ${withSettings ? 'with settings ' : ''}${withFolders ? 'with folders ' : ''}done.`);
      } else {
        setLoaded(produce(draft => {
          draft.initialComplete = true
        }));

        console.log(json.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function lazyLoad(order) {
    try {
      for (let i = 0; i < order.length; i++) {
        if (order[i] === 'settings' && !loaded.settings) {
          const res = await fetch(`/api/user/settings?userId=${user.info.id}`);
          const json = await res.json();

          if (json.success) {
            setUser(produce(draft => { draft.settings = json.settings }));
            setLoaded(produce(draft => { draft.settings = true }));
            console.log('Settings loaded lazily.')
          } else {
            console.log(json.message);
          }
        } else if (order[i] === 'folders' && !loaded.folders) {
          const res = await fetch(`/api/user/folders?userId=${user.info.id}`);
          const json = await res.json();

          if (json.success) {
            setUser(produce(draft => { draft.folders = json.folders }));
            setLoaded(produce(draft => { draft.folders = true }));
            console.log('Folders loaded lazily.')
          } else {
            console.log(json.message);
          }
        } else if (order[i] === 'trainingTotals' && !loaded.trainingTotals) {
          const res = await fetch(`/api/user/training-totals?userId=${user.info.id}`);
          const json = await res.json();

          if (json.success) {
            setUser(produce(draft => { draft.trainingTotals = json.trainingTotals }));
            setLoaded(produce(draft => { draft.trainingTotals = true }));
            console.log('Training totals loaded lazily.')
          } else {
            console.log(json.message);
          }
        } else if (order[i] === 'trainingHistory' && !loaded.trainingHistory) {
          const res = await fetch(`/api/user/training-history?userId=${user.info.id}`);
          const json = await res.json();

          if (json.success) {
            setUser(produce(draft => { draft.trainingHistory = json.trainingHistory }));
            setLoaded(produce(draft => { draft.trainingHistory = true }));
            console.log('Training History loaded lazily.')
          } else {
            console.log(json.message);
          }
        } else if (order[i] === 'firstRange' && !loaded.firstRange && user.folders) {
          const firstRange = getFirstRange(user.folders, router.query['range-id']);
          const res = await fetch(`/api/user/ranges?rangeIds=${JSON.stringify(firstRange)}`);
          const json = await res.json();

          if (json.success) {
            setUser(produce(draft => {
              if (!draft.ranges) {
                draft.ranges = {};
              }
              for (let i = 0; i < json.ranges.length; i++) {
                draft.ranges[String(json.ranges[i].id)] = json.ranges[i];
              }
            }));
            setLoaded(produce(draft => { draft.firstRange = true }));
            console.log('First range loaded lazily.');
          } else {
            console.log(json.message);
          }
        } else if (order[i] === 'firstRanges' && !loaded.firstRanges && user.folders) {
          const firstRanges = getFirstRanges(user.folders);
          const res = await fetch(`/api/user/ranges?rangeIds=${JSON.stringify(firstRanges)}`);
          const json = await res.json();

          if (json.success) {
            setUser(produce(draft => {
              if (!draft.ranges) {
                draft.ranges = {};
              }
              for (let i = 0; i < json.ranges.length; i++) {
                draft.ranges[String(json.ranges[i].id)] = json.ranges[i];
              }
            }));
            setLoaded(produce(draft => { draft.firstRanges = true }));
            console.log('First ranges loaded lazily.');
          } else {
            console.log(json.message);
          }
        } else if (order[i] === 'allRanges' && !loaded.allRanges) {
          const res = await fetch(`/api/user/ranges?all=true&userId=${user.info.id}`);
          const json = await res.json();

          if (json.success) {
            setUser(produce(draft => {
              if (!draft.ranges) {
                draft.ranges = {};
              }
              for (let i = 0; i < json.ranges.length; i++) {
                draft.ranges[String(json.ranges[i].id)] = json.ranges[i];
              }
            }))
            setLoaded(produce(draft => { draft.allRanges = true }));
            console.log('All ranges loaded lazily');
          } else {
            console.log(json.message);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    setLoaded(produce(draft => { draft.lazyComplete = true }));
  }

  useEffect(() => {
    (async () => {
      const pathElements = router.pathname.slice(1).split('/');
      let withSettings = false
      let withFolders = false;

      if (pathElements[0] === 'app') {
        if (pathElements[1].slice(0, 8) === 'overview') {
          withFolders = true;
        }
        if (pathElements[1].slice(0, 7) === 'manager') {
          withFolders = true;
        }
        if (pathElements[1].slice(0, 6) === 'editor') {
          withSettings = true;
          withFolders = true;
        }
        if (pathElements[1].slice(0, 7) === 'trainer') {
          withSettings = true;
          withFolders = true;
        }
        if (pathElements[1].slice(0, 8) === 'settings') {
          withSettings = true;
        }
      }

      await initialLoad(withSettings, withFolders);
    })();
  }, [router.isReady]);

  useEffect(() => {
    (async () => {
      if (loaded.initialComplete && user.info) {
        const pathElements = router.pathname.slice(1).split('/');
        let lazyLoadOrder = ['folders', 'allRanges', 'trainingTotals', 'trainingHistory', 'settings'];

        if (pathElements[0] === 'app') {
          if (pathElements[1].slice(0, 8) === 'overview') {
            lazyLoadOrder = ['trainingTotals', 'trainingHistory', 'folders', 'allRanges', 'settings'];
          }
          if (pathElements[1].slice(0, 7) === 'manager') {
            lazyLoadOrder = ['folders', 'firstRanges', 'allRanges', 'trainingTotals', 'trainingHistory', 'settings'];
          }
          if (pathElements[1].slice(0, 6) === 'editor') {
            lazyLoadOrder = ['folders', 'firstRange', 'allRanges', 'trainingTotals', 'trainingHistory', 'settings'];
          }
          if (pathElements[1].slice(0, 7) === 'trainer') {
            lazyLoadOrder = ['folders', 'allRanges', 'trainingTotals', 'trainingHistory', 'settings'];
          }
          if (pathElements[1].slice(0, 8) === 'settings') {
            lazyLoadOrder = ['folders', 'allRanges', 'trainingTotals', 'trainingHistory', 'settings'];
          }
        }

        await lazyLoad(lazyLoadOrder);
      }
    })();
  }, [loaded.initialComplete])

  return (
    <UserDataContext.Provider value={[user, loaded]}>
      {children}
    </UserDataContext.Provider>
  )
}