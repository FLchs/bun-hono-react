import { Sidebar } from "@/components/sidebar";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="w-full flex">
        <Sidebar />
        <div className="p-2 bg-gray-800 w-full text-white">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  );
}
