import SettingsMain from "@/components/settings/SettingsMain";
import AppLayout from "../_layout/AppLayout";
import { useEffect } from "react";
import { useUserData } from "@/hooks/useUserData";

export default function SettingsRoot() {
  const [user, loaded] = useUserData();

  useEffect(() => {
    if (loaded.initialComplete && !user.info) {
      window.location = "/auth/login";
    }
  }, [loaded.initialComplete]);

  return (
    <AppLayout>
      {user && user.info && user.settings &&
        <SettingsMain
          userInfo={user.info}
          userSettings={user.settings}
        />
      }
    </AppLayout>
  );
};