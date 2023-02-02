import { useState } from 'react'
import './App.css'
import DnDDemo from './DnDDemo'
import SortableList from './SortableList'

function App() {
  const [count, setCount] = useState(0)

  const sampleData = [ 'cyan', 'magenta', 'yellow', 'black']

  return (
    <div className="App">
      {/* <a href="https://www.youtube.com/watch?v=Q1PYQPK9TaM">based on this youtube tutorial</a> */}
      <DnDDemo />
      <SortableList data={ sampleData }/>
    </div>
  )
}

export default App
