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
  return (
    <>
      <InputTodo
        name={name}
        age={age}
        info={info}

      />
    </>
  )
}

export default App
