import EditorMain from "@/components/editor/EditorMain";
import RangePlaceholder from "@/components/manager/RangePlaceholder";
import AppLayout from "../_layout/AppLayout";
import EditorHotkeys from "./EditorHotkeys";
import { useEffect, useState } from "react";
import { useUserData } from "@/hooks/useUserData";

export default function EditorRoot() {
  const [user, loaded] = useUserData();
  const [viewHotkeyInfo, setViewHotkeyInfo] = useState(null);
  
  useEffect(() => {
    if (loaded.initialComplete && !user.info) {
      window.location = "/auth/login";
    }
  }, [loaded.initialComplete]);
  
  useEffect(() => {
    if (loaded.folders && user.folders.length > 0 && user.settings) {
      setViewHotkeyInfo(!user.settings.hotkeyInfoDismissed);
    }
  }, [loaded.folders, loaded.settings]);
  
  return (
    <AppLayout>
      {loaded.folders && user.folders.length === 0 &&
        <RangePlaceholder />
      }
      {loaded.folders && loaded.firstRange && user.folders.length > 0 && user.settings &&
        <EditorMain
          user={user}
          setViewHotkeyInfo={setViewHotkeyInfo}
        />
      }
      {loaded.folders && viewHotkeyInfo &&
        <EditorHotkeys
          settings={user.settings}
          setViewHotkeyInfo={setViewHotkeyInfo}
        />
      }
    </AppLayout>
  );
};