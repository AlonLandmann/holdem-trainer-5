import SettingsToolbar from "./SettingsToolbar";
import Button from "../_ui/Button";
import SettingsGroup from "./SettingsGroup";
import Setting from "./Setting";
import { useState } from "react";
import { produce } from "immer";
import Input from "../_ui/Input";
import toast from "react-hot-toast";

export default function SettingsMain({ userInfo, userSettings }) {
  const [username, setUsername] = useState(userInfo.username);
  const [settings, setSettings] = useState(userSettings);
  const [linkSent, setLinkSent] = useState(false);

  function handleChangeUsername(event) {
    setUsername(event.target.value);
  }

  function handleChangeSettings(event, modifier) {
    setSettings(produce(draft => {
      draft[event.target.name] = modifier(event.target.value);
    }));
  }

  async function handleResendVerificationLink() {
    const res = await fetch("/api/auth/resend", { method: "POST" });
    const json = await res.json();

    if (json.success) {
      setLinkSent(true);
      toast.success(`A verification link has been sent to ${userInfo.email}.`);
    } else {
      toast.error(json.message || "An unexpected error occurred.");
    }
  }

  return (
    <div className="grow overflow-x-hidden">
      <SettingsToolbar
        userInfo={userInfo}
        username={username}
        settings={settings}
      />
      <div className="p-7 flex flex-col gap-5">
        <SettingsGroup title="Account">
          <Setting label="Email">
            <div>
              {userInfo.email}
            </div>
            {!userInfo.isGoogleUser && userInfo.isVerified &&
              <div className="text-neutral-400">
                <i className="bi bi-check2"></i>
                <span> verified</span>
              </div>
            }
            {!userInfo.isGoogleUser && !userInfo.isVerified && !linkSent &&
              <Button
                theme="link"
                utilClasses="underline"
                text="resend verifcation link"
                onClick={handleResendVerificationLink}
                useQueue
              />
            }
            {!userInfo.isGoogleUser && !userInfo.isVerified && linkSent &&
              <div className="text-neutral-400">
                verification link sent
              </div>
            }
            {!userInfo.isGoogleUser &&
              <div className="text-neutral-500">
                To change your email address contact info@holdem-trainer.com directly.
              </div>
            }
          </Setting>
          <Setting label="Username">
            <Input
              utilClasses="py-[10px] px-[15px] min-w-0"
              style={{ lineHeight: "20px" }}
              value={username}
              onChange={handleChangeUsername}
            />
          </Setting>
          <Setting label="Password" condition={!userInfo.isGoogleUser}>
            <Button
              theme="link"
              utilClasses="underline"
              text="reset"
              onClick={() => { window.open("/auth/reset", "_blank") }}
            />
          </Setting>
          <Setting label="Account">
            <div className="text-neutral-500">
              To delete your account email info@holdem-trainer.com directly.
            </div>
          </Setting>
        </SettingsGroup>
        <SettingsGroup title="App">
          <Setting label="On brush application">
            <select
              name="deselectAfterBrush"
              className="appearance-none"
              value={settings.deselectAfterBrush ? "true" : ""}
              onChange={e => { handleChangeSettings(e, value => Boolean(value)) }}
            >
              <option value="true">Deselect all combos</option>
              <option value="">Keep selection</option>
            </select>
          </Setting>
          <Setting label="On range edits">
            <select
              name="afterPredecessorEdit"
              className="appearance-none"
              value={settings.afterPredecessorEdit}
              onChange={e => { handleChangeSettings(e, value => value) }}
            >
              <option value="never">Never open linked ranges</option>
              <option value="ask">Ask to open linked ranges</option>
              <option value="always">Always open linked ranges</option>
            </select>
          </Setting>
          <Setting label="Session length">
            <select
              name="defaultSessionLength"
              className="appearance-none"
              value={String(settings.defaultSessionLength)}
              onChange={e => { handleChangeSettings(e, value => Number(value)) }}
            >
              <option value="20">20 Combos</option>
              <option value="50">50 Combos</option>
              <option value="100">100 Combos</option>
            </select>
          </Setting>
        </SettingsGroup>
      </div>
    </div>
  );
};