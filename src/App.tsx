import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import MyFirstComponent from './test/myComponent'
import SecondComponent from './test/secondComponent'
import InputTodo from './todo/InputTodo'

function App() {
  const name = "Hoi dan IT"
  const age = 25
  const info = {
    address: "HCM",
    gender: "male"
  }

  const handleTest = (name: string) => {
    alert(`handle test = ${name}`)
  }
  const [listTodos, setListTodos] = useState(
    ["todo 1", "todo 2", "todo 3", "todo 4", "todo 5", "todo 6"]
  )
  return (
    <>
      <InputTodo
        name={name}
        age={age}
        info={info}
        handleTest={handleTest}
        listTodos={listTodos}
        setListTodos={setListTodos}
      />
      <br />
      <ul>
        {listTodos.map((item, index) => {
          return (
            <div key={index}>
              <li>{item}</li>
            </div>
          )
        })}
      </ul>
    </>
  )
}

export default App
