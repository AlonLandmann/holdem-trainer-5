import EndMain from "./EndMain";
import EndToolbar from "./EndToolbar";

export default function TrainerEndPage({ user, setPage, stats, setStats, refreshTrainingTotals }) {
  return (
    <div className="grow overflow-x-hidden max-h-screen">
      <EndToolbar
        setPage={setPage}
        setStats={setStats}
        refreshTrainingTotals={refreshTrainingTotals}
      />
      <EndMain
        user={user}
        stats={stats}
      />
    </div>
  );
};