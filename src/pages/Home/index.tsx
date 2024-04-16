import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Play } from 'phosphor-react'
import { useState } from 'react'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles.'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser no mínimo de 5 minutos.')
    .max(60, 'O ciclo precisa ser no máximo de 60 minutos.'),
})

// interface newCycleForData {
//   task: string
//   minutesAmount: number
// }
// or with full typescript:
type newCycleForData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activedCycleID, setactivedCycleID] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<newCycleForData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: newCycleForData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...state, newCycle])
    setactivedCycleID(id)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activedCycleID)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Cuz cuz" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}

// form uncontrolled
// export function Home() {
//   function handleSubmit(event) {
//     event.target.task.value
//   }

//   return (
//     <HomeContainer>
//       <form onSubmit={handleSubmit}>
//         <FormContainer>
//           <label htmlFor="task">Vou trabalhar em</label>
//           <TaskInput
//             id="task"
//             name="task1"
//             list="task-suggestions"
//             placeholder="Dê um nome para o seu projeto"
//           />

//           <datalist id="task-suggestions">
//             <option value="Projeto 1" />
//             <option value="Projeto 2" />
//             <option value="Projeto 3" />
//             <option value="Cuz cuz" />
//           </datalist>

//           <label htmlFor="minutesAmount">durante</label>
//           <MinutesAmountInput
//             type="number"
//             id="minutesAmount"
//             placeholder="00"
//             step={5}
//             min={5}
//             max={60}
//           />

//           <span>minutos.</span>
//         </FormContainer>

//         <CountdownContainer>
//           <span>0</span>
//           <span>0</span>
//           <Separator>:</Separator>
//           <span>0</span>
//           <span>0</span>
//         </CountdownContainer>

//         <StartCountdownButton disabled={!task} type="submit">
//           <Play size={24} />
//           Começar
//         </StartCountdownButton>
//       </form>
//     </HomeContainer>
//   )
// }

/* 
form controlled
export function Home() {
  const [task, setTask] = useState('')

  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            onChange={(e) => setTask(e.target.value)}
            value={task}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
            <option value="Cuz cuz" />
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={5}
            max={60}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={!task} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}

*/
