import { intersection, isEqual } from "lodash";
import Checkbox from "../_ui/Checkbox";

export default function StartMain({ user, selected, setSelected }) {
  function toggleRange(rangeId) {
    setSelected(prev => {
      if (prev.includes(rangeId)) {
        return prev.filter(rId => rId !== rangeId);
      } else {
        return prev.concat([rangeId]);
      }
    })
  }

  function toggleFolder(folder) {
    const rangeIds = folder.ranges.map(r => r.id);

    setSelected(prev => {
      if (isEqual(intersection(prev, rangeIds), rangeIds)) {
        return prev.filter(rId => !rangeIds.includes(rId));
      } else {
        return prev.filter(rId => !rangeIds.includes(rId)).concat(rangeIds);
      }
    });
  }

  return (
    <div
      className="p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-7 xl:gap-9 overflow-y-auto"
      style={{ maxHeight: "calc(100vh - 49px)" }}
    >
      {user.folders.map(folder => (
        <div key={"folder" + folder.id}>
          <h3
            className="text-neutral-400 bg-neutral-800 py-2 px-3 rounded-sm mb-1 bg-opacity-40 transition hover:bg-opacity-70 cursor-pointer select-none truncate"
            onClick={() => { toggleFolder(folder) }}
          >
            {folder.name}
          </h3>
          <div className="flex flex-col gap-1 p-1">
            {folder.ranges.map(range => (
              <div key={"range" + range.id} className="flex items-center gap-2">
                <Checkbox
                  isSelected={selected.includes(range.id)}
                  onClick={() => { toggleRange(range.id) }}
                />
                <div className="text-neutral-300 text-sm truncate">
                  {range.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};