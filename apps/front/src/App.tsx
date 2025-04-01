import './App.css'
import { AppType } from "@bunfs/server"
import { hc } from 'hono/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

const client = hc<AppType>('http://localhost:3000/')

function App() {

  const queryClient = useQueryClient()

  const { status, data } = useQuery({
    queryKey: ['data'], queryFn: async () => {
      const response = await client.items.$get()
      return await response.json()
    },
  })

  const { status: mutatingStatus, mutateAsync } = useMutation({
    mutationKey: ['data'], mutationFn: async (item: { name: string, id: number }) => {
      return await client.items.$post({ json: item })
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['data'] }) }
  })

  if (status === 'pending') {
    return <p>Loading...</p>
  }

  if (status === 'error') {
    return <p>Error</p>
  }

  return (
    <>
      <p>Date is :</p>
      {data.map((item) => <p>{item.name} </p>)}
      <button disabled={mutatingStatus === "pending"} onClick={() => mutateAsync({ name: window.crypto.randomUUID(), id: data.length })}>{mutatingStatus === "pending" ? "loading" : "Add new"}</button>
    </>
  )
}


export default App
