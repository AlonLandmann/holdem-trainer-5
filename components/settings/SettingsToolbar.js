import Button from "@/components/_ui/Button";
import toast from "react-hot-toast";

export default function SettingsToolbar({ userInfo, username, settings }) {
  async function handleSave() {
    let res = await fetch("/api/settings/update", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    let json = await res.json();

    if (!json.success) {
      toast.error(json.message || "An unexpected error occurred.");
    }

    if (username === userInfo.username) {
      window.location.reload();
    }

    if (username.length < 2 || username.length > 30) {
      toast.error("Usernames should be between 2 and 30 characters long.");
    }

    res = await fetch("/api/auth/change-username", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });

    window.location.reload();
  }

  return (
    <div className="border-b h-[49px] flex items-center px-3">
      <h1 className="text-neutral-500 mr-auto">
        Settings
      </h1>
      <Button
        theme="nice"
        utilClasses="h-[39px] px-3 gap-1 rounded-sm"
        icon="floppy"
        text="Save Changes"
        onClick={handleSave}
        useQueue
      />
    </div>
  );
};