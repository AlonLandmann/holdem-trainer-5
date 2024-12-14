import ManagerMain from "@/components/manager/ManagerMain";
import RangePlaceholder from "@/components/manager/RangePlaceholder";
import AppLayout from "../_layout/AppLayout";
import { useEffect } from "react";
import { useUserData } from "@/hooks/useUserData";

export default function ManagerRoot() {
  const [user, loaded] = useUserData();
  
  useEffect(() => {
    if (loaded.initialComplete && !user.info) {
      window.location = "/auth/login";
    }
  }, [loaded.initialComplete]);

  return (
    <AppLayout>
      {loaded.folders && user.folders.length === 0 &&
        <RangePlaceholder />
      }
      {loaded.folders && user.folders.length > 0 &&
        <ManagerMain user={user} />
      }
    </AppLayout>
  );
};