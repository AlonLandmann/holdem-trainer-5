import { produce } from "immer";
import { useEffect, useState } from "react";
import LoadingDots from "../_ui/LoadingDots";
import Button from "../_ui/Button";

export default function Predecessor({ user, range, setRange }) {
  const [candidates, setCandidates] = useState([]);
  const [predecessorId, setPredecessorId] = useState(range.predecessorId || "");
  const [loading, setLoading] = useState(false);

  const index = range.spot.linkIndex;

  useEffect(() => {
    setLoading(true);
  }, [user, range.history]);

  useEffect(() => {
    setPredecessorId(range.predecessorId || "");
  }, [range.id]);

  useEffect(() => {
    (async () => {
      if (loading) {
        if (!range.spot.options || typeof index !== "number") {
          setLoading(false);
          return null;
        }

        const historyToMatch = JSON.stringify(range.history.slice(0, index));
        const optionAsAction = { ...range.history[index] };

        if (optionAsAction) {
          delete optionAsAction.p;
        }

        const optionToMatch = JSON.stringify(optionAsAction);
        const res = await fetch(`/api/editor/find-predecessors?userId=${user.info.id}&history=${historyToMatch}&option=${optionToMatch}`);
        const json = await res.json();

        if (!json.success) {
          setLoading(false);
          return null;
        }

        setCandidates(json.ranges.filter(r => r.id != range.id));
        setLoading(false);
      }
    })()
  }, [loading]);

  function handleChange(event) {
    const id = Number(event.target.value);
    const candidate = candidates.find(c => c.id === id);
    setPredecessorId(id);

    if (id === "" || !candidate) {
      setRange(produce(draft => {
        draft.predecessorId = null

        for (let i = 0; i < draft.matrix.length; i++) {
          draft.matrix[i].frequency = 1
        }
      }));
    } else {
      const action = range.history[index];
      const actionIndex = candidate.options.findIndex(o => (
        (o.type === action.type) &&
        (!action.size || o.size === action.size)
      ));

      setRange(produce(draft => {
        draft.predecessorId = id

        for (let i = 0; i < draft.matrix.length; i++) {
          draft.matrix[i].frequency = candidate.matrix[i].frequency * candidate.matrix[i].strategy[actionIndex]
        }
      }));
    }
  }

  function handleRefresh() {
    handleChange({ target: { value: String(predecessorId) } });
  }

  return (!range.spot.options || typeof index !== "number") ? null : (
    <div className="border rounded py-3 px-4 flex flex-col">
      <div className="flex justify-between items-center mb-3">
        <h1 className="text-neutral-400">
          Link
        </h1>
        <Button
          theme="tertiary"
          icon="arrow-repeat"
          onClick={handleRefresh}
        />
      </div>
      <div className="relative min-h-8">
        {!loading &&
          <select className="appearance-none w-full" value={predecessorId} onChange={handleChange}>
            <option value="">-- select a range --</option>
            {candidates.map(candidate => (
              <option key={candidate.id} value={candidate.id}>
                {candidate.name}
              </option>
            ))}
          </select>
        }
        {loading &&
          <LoadingDots utilClasses="min-h-4" />
        }
      </div>
    </div>
  );
};