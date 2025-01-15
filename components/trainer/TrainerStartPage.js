import StartToolbar from "./StartToolbar";
import StartMain from "./StartMain";

export default function TrainerStartPage({ user, setPage, selected, setSelected, nrCombos, setNrCombos }) {
  return (
    <div className="grow overflow-x-hidden">
      <StartToolbar
        selected={selected}
        setPage={setPage}
        nrCombos={nrCombos}
        setNrCombos={setNrCombos}
      />
      <StartMain
        user={user}
        selected={selected}
        setSelected={setSelected}
      />
    </div>
  );
};