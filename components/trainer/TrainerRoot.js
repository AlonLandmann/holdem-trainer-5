import { useEffect, useState } from "react";
import AppLayout from "../_layout/AppLayout";
import TrainerStartPage from "./TrainerStartPage";
import TrainerSessionPage from "./TrainerSessionPage";
import TrainerEndPage from "./TrainerEndPage";
import { useRouter } from "next/router";
import RangePlaceholder from "../manager/RangePlaceholder";
import { useUserData } from "@/hooks/useUserData";

export default function TrainerRoot() {
    const router = useRouter();
    const [user, loaded, refreshTrainingTotals] = useUserData();
    const [page, setPage] = useState("start");
    const [selected, setSelected] = useState([]);
    const [nrCombos, setNrCombos] = useState(20);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        if (router.query.ids) {
            setSelected(JSON.parse(router.query.ids));
            setPage("session");
        }
    }, [router.isReady]);

    useEffect(() => {
        if (loaded.initialComplete && !user.info) {
            window.location = "/auth/login";
        }

        if (loaded.initialComplete && user.settings) {
            setNrCombos(user.settings.defaultSessionLength);
        }
    }, [loaded]);

    return (
        <AppLayout>
            {loaded.folders && user.folders.length === 0 &&
                <RangePlaceholder />
            }
            {loaded.folders && user.folders.length > 0 && page === "start" &&
                <TrainerStartPage
                    user={user}
                    setPage={setPage}
                    selected={selected}
                    setSelected={setSelected}
                    nrCombos={nrCombos}
                    setNrCombos={setNrCombos}
                />
            }
            {loaded.folders && user.folders.length > 0 && page === "session" && loaded.allRanges &&
                <TrainerSessionPage
                    user={user}
                    setPage={setPage}
                    selected={selected}
                    nrCombos={nrCombos}
                    stats={stats}
                    setStats={setStats}
                />
            }
            {loaded.folders && user.folders.length > 0 && page === "end" && loaded.trainingTotals &&
                <TrainerEndPage
                    user={user}
                    setPage={setPage}
                    stats={stats}
                    setStats={setStats}
                    refreshTrainingTotals={refreshTrainingTotals}
                />
            }
        </AppLayout>
    );
};