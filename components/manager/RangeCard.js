import Button from "@/components/_ui/Button";
import MatrixDisplay from "@/components/manager/MatrixDisplay";
import RangeHistory from "@/components/manager/RangeHistory";
import RangeLegend from "@/components/manager/RangeLegend";
import RangeName from "@/components/manager/RangeName";
import RangeUiButtons from "@/components/manager/RangeUiButtons";
import { useLoadingQueue } from "@/hooks/useLoadingQueue";
import { useUserData } from "@/hooks/useUserData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function RangeCard({ rangeMetaData, selectedRanges, setSelectedRanges, folderLength }) {
  const router = useRouter();
  const [loadingQueue, setLoadingQueue] = useLoadingQueue();
  const [renaming, setRenaming] = useState(false);
  const [user, loaded] = useUserData();
  const [range, setRange] = useState(null);

  useEffect(() => {
    if (user.ranges && !range) {
      setRange(user.ranges[rangeMetaData.id]);
    }
  }, [loaded.firstRanges, loaded.allRanges]);

  async function handleSelect() {
    setSelectedRanges(prev => {
      if (prev.includes(range.id)) {
        return prev.filter(id => id !== range.id);
      } else {
        return prev.concat([range.id]);
      }
    })
  }

  function handleDragStart(event) {
    if (!loadingQueue) {
      event.dataTransfer.setData("text/plain", JSON.stringify({
        type: "range",
        origin: range.index,
        originId: range.id,
        originFolderId: range.folderId,
      }));
    }
  }

  return !range ? null : (
    <div
      className="relative bg-neutral-900 p-2 rounded"
      draggable={!renaming}
      onDragStart={handleDragStart}
    >
      <RangeName
        range={range}
        renaming={renaming}
        setRenaming={setRenaming}
      />
      <RangeHistory range={range} />
      <div className="flex gap-1">
        <MatrixDisplay range={range} />
        <RangeUiButtons
          range={range}
          folderLength={folderLength}
        />
      </div>
      <div className="w-[418px] flex items-start justify-between gap-5">
        <RangeLegend range={range} />
        <div className="flex items-center gap-1 py-1">
          <Button
            theme="secondary"
            utilClasses="py-3 px-4 rounded-sm"
            icon={selectedRanges.includes(range.id) ? "check-square" : "square"}
            text="Select"
            onClick={handleSelect}
            useQueue
          />
          <Button
            theme="nice"
            utilClasses="py-3 px-4 rounded-sm font-normal"
            icon="crosshair"
            text="Train Now"
            onClick={() => { router.push(`/app/trainer?ids=${JSON.stringify([range.id])}`) }}
          />
        </div>
      </div>
    </div>
  );
};