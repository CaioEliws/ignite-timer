import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles.'

export function Home() {
  const { register, handleSubmit, watch } = useForm()

  function handleCreateNewCycle(data: any) {
    console.log(data)
  }

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
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
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
