import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { hc } from "hono/client";
import { AppType } from "@cm3k/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const client = hc<AppType>("http://localhost:3000/");

function App() {

  const queryClient = useQueryClient();

  const { data } = useQuery({ queryKey: ["count"], queryFn: async () => { const request = await client.ping.$get(); return await request.json(); } });

  const { mutateAsync } = useMutation({
    mutationFn: async () => { await client.ping.$post({ json: { count: (data?.count ?? 0) + 1 } }); },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["count"] });
    },
  });

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => mutateAsync()}>
          count is {data?.count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
