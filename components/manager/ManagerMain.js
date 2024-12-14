import FolderContent from "@/components/manager/FolderContent";
import Sidebar from "@/components/manager/Sidebar";
import { useState } from "react";

export default function ManagerMain({ user }) {
  const [selectedFolder, setSelectedFolder] = useState(user.folders[0]);

  return !selectedFolder ? null : (
    <div className="bg-neutral-900 grow flex">
      <Sidebar
        folders={user.folders}
        selectedFolder={selectedFolder}
        setSelectedFolder={setSelectedFolder}
      />
      <FolderContent
        selectedFolder={selectedFolder}
      />
    </div>
  );
};