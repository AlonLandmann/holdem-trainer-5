import { useLoadingQueue } from "@/hooks/useLoadingQueue";
import { useState } from "react";
import LoadingDots from "../_ui/LoadingDots";
import toast from "react-hot-toast";

export default function SidebarGap({ index, target, setTarget }) {
  const [loadingQueue, setLoadingQueue] = useLoadingQueue();
  const [loading, setLoading] = useState(false);

  function handleDragOver(event) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData("text/plain"));

      if (data.type === "folder" && !loadingQueue) {
        event.preventDefault();
      }
    }
  }

  async function handleDrop(event) {
    if (!loadingQueue) {
      const data = JSON.parse(event.dataTransfer.getData("text/plain"));

      if (data.type === "folder") {
        if (target === data.origin || target === data.origin + 1) {
          setTarget(null);
        } else {
          setLoading(true);
          setLoadingQueue(true);

          const res = await fetch("/api/manager/move-folder", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ origin: data.origin, originId: data.originId, target: target }),
          });

          const json = await res.json();

          if (json.success) {
            window.location.reload();
          } else {
            toast.error(json.message || "An unexpected error occurred");
          }

          setLoading(false);
          setLoadingQueue(false);
          setTarget(null);
        }
      }
    }
  }

  return (
    <div
      className={`relative ${target === index ? "h-4 border-b" : ""}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {loading &&
        <LoadingDots utilClasses="h-full items-center" />
      }
    </div>
  );
};