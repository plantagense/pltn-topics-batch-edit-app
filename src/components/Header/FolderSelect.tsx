import type { Item } from "@crystallize/schema";

interface FolderChooserProps {
  folders: Item[];
}

export const FolderChooser = ({ folders }: FolderChooserProps) => {
  return (
    <div>
      <select
        className="p-2 rounded text-sm"
        defaultValue=""
        onChange={(e) =>
          folders.find((folder) => folder.tree?.path === e.target.value) as Item
        }
      >
        <option value="" disabled>
          Select location
        </option>
        {folders.map((folder) => (
          <option key={folder.tree?.path} value={folder.tree?.path}>
            {folder?.tree?.path}
          </option>
        ))}
      </select>
    </div>
  );
};
