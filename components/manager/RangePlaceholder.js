import Button from "@/components/_ui/Button";
import toast from "react-hot-toast";

export default function RangePlaceholder() {
  async function handleAddRange() {
    const res = await fetch("/api/manager/add-range", { method: "POST" });
    const json = await res.json();

    if (json.success) {
      window.location.reload();
    } else {
      toast.error(json.message || "An unexpected error occurred.");
    }
  }

  return (
    <div className="grow bg-neutral-900 p-4 flex flex-col justify-center items-center">
      <div className="text-neutral-700 text-7xl mb-3">
        <i className="bi bi-inbox-fill"></i>
      </div>
      <h1 className="text-xl font-medium mb-2">
        No ranges yet
      </h1>
      <p className="text-neutral-500 mb-7 text-center">
        Click on the button to add your first range.
      </p>
      <Button
        theme="secondary"
        utilClasses="py-3 px-4"
        icon="plus-lg"
        text="Add Range"
        onClick={handleAddRange}
        useQueue
      />
    </div>
  );
};