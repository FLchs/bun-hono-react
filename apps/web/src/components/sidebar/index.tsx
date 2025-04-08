import { MenuItem } from "./menu-item";

export function Sidebar() {
  return (
    <div className="w-64 bg-gray-900 text-gray-50 h-screen flex flex-col p-2 gap-1">
      <MenuItem to="/">Home</MenuItem>
      <MenuItem to="/tasks">Tasks</MenuItem>
    </div>
  );
}
