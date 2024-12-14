import Button from "@/components/_ui/Button";
import SidebarFolder from "@/components/manager/SidebarFolder";
import SidebarGap from "@/components/manager/SidebarGap";
import { useLoadingQueue } from "@/hooks/useLoadingQueue";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Sidebar({ folders, selectedFolder, setSelectedFolder }) {
  const [loadingQueue, setLoadingQueue] = useLoadingQueue();
  const [target, setTarget] = useState(null);

  const nrRanges = folders.reduce((acc, f) => (acc + f.ranges.length), 0);

  async function handleAddFolder() {
    const res = await fetch("/api/manager/add-folder", { method: "POST" });
    const json = await res.json();

    if (json.success) {
      window.location.reload();
    } else {
      toast.error(json.message || "An unexpected error occurred.");
    }
  }

  function handleDragLeave(event) {
    if (!loadingQueue) {
      const isLeavingParent = !event.currentTarget.contains(event.relatedTarget);

      if (isLeavingParent) {
        setTarget(null);
      }
    }
  }

  return (
    <div className="border-r min-w-48 max-w-48 flex flex-col">
      <div className="border-b p-3 flex justify-between items-center">
        <h1 className="text-neutral-500">
          Manager
        </h1>
        <Button
          theme="tertiary"
          utilClasses="text-neutral-500 hover:text-neutral-300"
          icon="plus-lg"
          onClick={handleAddFolder}
          useQueue
        />
      </div>
      <div onDragLeave={handleDragLeave}>
        <SidebarGap
          index={0}
          target={target}
          setTarget={setTarget}
        />
        {folders.map((folder, i) => (
          <div key={"folder" + folder.id}>
            <SidebarFolder
              folder={folder}
              isSelected={selectedFolder.id === folder.id}
              setSelectedFolder={setSelectedFolder}
              target={target}
              setTarget={setTarget}
            />
            <SidebarGap
              index={i + 1}
              target={target}
              setTarget={setTarget}
            />
          </div>
        ))}
      </div>
      <div className="border-t mt-auto p-3 flex items-center">
        <span className="text-neutral-600 mr-auto">
          {nrRanges} ranges
        </span>
      </div>
    </div>
  );
};