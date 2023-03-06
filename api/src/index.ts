import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { Person } from './types'
import { PersonService, HttpException } from './components'

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())

app.get('/person/:id', async (req: Request, res: Response) => {
  const { id } = req.params

  console.log(id)

  const service: PersonService = new PersonService()

  try {
    res.status(200).json(await service.getPerson(id))
  } catch (ex: any) {
    if (ex instanceof HttpException) {
      res.status(ex.code).json({ error: ex.message })
      return
    }
    console.error(ex)
    res.status(500).json({ error: 'service error' })
  }
});

app.post('/person', async (req: Request, res: Response) => {
  const person: Person = req.body
  const service: PersonService = new PersonService()

  try {
    res.status(201).json(await service.createPerson(person))
  } catch (ex: any) {
    if (ex instanceof HttpException) {
      res.status(ex.code).json({ error: ex.message })
      return
    }
    console.error(ex)
    res.status(500).json({ error: 'service error' })
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
