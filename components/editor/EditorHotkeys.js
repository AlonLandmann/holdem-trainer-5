import { useState } from "react";
import Button from "../_ui/Button";

export default function EditorHotkeys({ settings, setViewHotkeyInfo }) {
  const [isMacOS, setIsMacOS] = useState(false);

  async function handleDismiss() {
    setViewHotkeyInfo(false);

    if (!settings.hotkeyInfoDismissed) {
      await fetch("/api/settings/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hotkeyInfoDismissed: true }),
      });
    }
  }

  return (
    <div className="fixed z-50 w-full h-screen bg-[#000000dd] flex justify-center items-center p-5">
      <div className="bg-neutral-950 rounded border">
        <div className="flex items-center border-b pt-5 pb-4 px-6">
          <h1 className="text-neutral-400 font-medium mr-auto">
            Hotkey Information
          </h1>
          <Button
            theme={isMacOS ? "secondary" : "primary"}
            utilClasses="w-8 h-8 rounded-r-none"
            icon="windows"
            onClick={() => { setIsMacOS(false) }}
            disabled={!isMacOS}
          />
          <Button
            theme={isMacOS ? "primary" : "secondary"}
            utilClasses="w-8 h-8 rounded-l-none"
            icon="apple"
            onClick={() => { setIsMacOS(true) }}
            disabled={isMacOS}
          />
        </div>
        <div className="py-6 px-7">
          <p className="max-w-[55ch] mb-6 text-neutral-400">
            To select and deselected a specific combo, simply click on it.
            To facilitate speedy selections, you can use the following hotkeys while clicking on combos.
          </p>
          <div className="grid gap-y-1 gap-x-4" style={{ gridTemplateColumns: "2fr 5fr" }} >
            <div>-</div>
            <div>select / deselect a single combo</div>
            <div>{isMacOS ? "Command" : "Ctrl"} </div>
            <div>select all combos of equal value</div>
            <div>{isMacOS ? "Command" : "Ctrl"} + Shift</div>
            <div>deselect all combos of equal value</div>
            <div>{isMacOS ? "Option" : "Alt"}</div>
            <div>select all suited combos of equal value</div>
            <div>{isMacOS ? "Option" : "Alt"} + Shift</div>
            <div>deselect all suited combos of equal value</div>
          </div>
          <div className="flex items-center gap-4 mt-10">
            <Button
              theme="nice"
              utilClasses="py-3 px-4"
              text="OK"
              onClick={handleDismiss}
            />
            <div className="text-sm text-neutral-500 max-w-[55ch]">
              View the hotkeys again at any time by clicking on the <i className="bi bi-alt"></i> icon in the toolbar.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};