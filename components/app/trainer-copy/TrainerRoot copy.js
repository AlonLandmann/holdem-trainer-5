import FooterSmall from '@/components/_common_/FooterSmall'
import Navbar from '@/components/_common_/Navbar'
import css from '@/styles/trainer/TrainerRoot.module.scss'
import TrainerToolbar from './TrainerToolbar'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/useUser'
import axios from 'axios'
import TrainerSidebar from './TrainerSidebar'
import TrainerMain from './TrainerMain'
import TrainerStats from './TrainerStats'
import TrainerPlaceholder from './TrainerPlaceholder'
import useWindowDimensions from '@/hooks/useWindowDimensions'

export default function TrainerRoot() {
  const router = useRouter()
  const [user] = useUser()
  const [ranges, setRanges] = useState(null)
  const [selected, setSelected] = useState([])
  const [stats, setStats] = useState([])
  const [sidebarInView, setSidebarInView] = useState(true)
  const [statsInView, setStatsInView] = useState(true)
  const [statFilter, setStatFilter] = useState(false)
  const windowDims = useWindowDimensions()
  const [sidebarIsOverlay, setSidebarIsOverlay] = useState(false)
  const [statsIsOverlay, setStatsIsOverlay] = useState(false)


  const mainDims = {
    w: windowDims.w - 40 - ((sidebarInView && !sidebarIsOverlay) ? 300 : 0) - (statsInView ? 300 : 0),
    h: windowDims.h - 80
  }

  useEffect(() => {
    if (mainDims.w < 400 && !sidebarIsOverlay) {
      setSidebarIsOverlay(true)
    }

    if (mainDims.w > 720 && sidebarIsOverlay) {
      setSidebarIsOverlay(false)
    }

    if (mainDims.w < 400 && sidebarIsOverlay && !statsIsOverlay) {
      setStatsIsOverlay(true)
    }

    if (mainDims.w > 720 && sidebarIsOverlay && statsIsOverlay) {
      setStatsIsOverlay(false)
    }
  }, [mainDims.w])

  useEffect(() => {
    (async () => {
      if (user && user.folders) {
        try {
          const ids = []

          user.folders.forEach(folder => {
            folder.ranges.forEach(range => {
              ids.push(range.id)
            })
          })

          const res = await axios.get(`api/ranges?ids=${JSON.stringify(ids)}`)

          if (res.data.success) {
            setRanges(res.data.documents)
          }
        } catch (error) {
          console.log(error)
        }
      }
    })()
  }, [user])

  useEffect(() => {
    const ids = router.query.ids ? JSON.parse(router.query.ids) : []
    setSelected(ids)
  }, [router])

  return (
    <div className={css.container}>
      <Navbar>
        <TrainerToolbar
          sidebarInView={sidebarInView}
          setSidebarInView={setSidebarInView}
          statsInView={statsInView}
          setStatsInView={setStatsInView}
          statFilter={statFilter}
          setStatFilter={setStatFilter}
          setStats={setStats}
        />
      </Navbar>
      {user &&
        <div className={css.main}>
          {(ranges && ranges.length > 0 && sidebarInView) &&
            <TrainerSidebar
              selected={selected}
              setSelected={setSelected}
              overlay={sidebarIsOverlay}
            />
          }
          {(ranges && ranges.length > 0 && selected.length > 0) &&
            <TrainerMain
              ranges={ranges}
              selected={selected}
              setStats={setStats}
              dims={mainDims}
            />
          }
          {!(ranges && ranges.length > 0 && selected.length > 0) &&
            <TrainerPlaceholder
              notLoaded={!ranges}
              noRanges={ranges && ranges.length === 0}
              nothingSelected={selected.length === 0}
            />
          }
          {(ranges && ranges.length > 0 && statsInView) &&
            <TrainerStats
              stats={stats}
              statFilter={statFilter}
              overlay={statsIsOverlay}
            />
          }
        </div>
      }
      <FooterSmall />
    </div>
  )
}
