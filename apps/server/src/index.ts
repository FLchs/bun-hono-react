import { Hono } from 'hono'

const app = new Hono()


const route = app.get(
  '/date',
  async (c) => {
    return c.json(
      {
        ok: true,
        date: new Date().toISOString(),
      },
      200
    )
  }
).get('/', (c) => {
  return c.text("Hello")
})


export default app
export type AppType = typeof route
