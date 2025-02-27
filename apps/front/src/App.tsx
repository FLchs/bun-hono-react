import './App.css'
import { AppType } from "@bunfs/server"
import { hc } from 'hono/client'
import { useQuery } from '@tanstack/react-query'


const client = hc<AppType>('http://localhost:3000/')


function App() {

  const { data, isFetching, refetch } = useQuery({
    queryKey: ['date'], queryFn: async () => {
      const response = await client.date.$get()
      return await response.json()
    },
    refetchInterval: 10000 // refetch every 10 seconds
  })


  return (
    <>
      <p>Date is :</p>
      <p>{isFetching ? "Pending..." : data?.date}</p>
      <p onClick={() => refetch()}>Refresh</p>
    </>
  )
}


export default App
