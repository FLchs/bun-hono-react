import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "./lib/client";

function App() {

  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["count"], queryFn: async () => {
      const response = await client.ping.$get();
      return await response.json();
    }
  });

  const { mutate, error } = useMutation({
    mutationFn: async () => {
      await client.ping.$post({ json: { count: (data?.count ?? 0) + 1 } });
    },
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
        <button onClick={() => mutate()}>
          count is {data?.count}
        </button>
        <p>{error?.message}</p>
        <pre>{error?.issues}</pre>
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
