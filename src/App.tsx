import { useState } from 'react'
import {v4 as uuidv4} from 'uuid' ;
import './App.css'
import Sidebar from './component/Sidebar'
import Canvas from './component/Canvas'
import type { Shape } from './types'

function App() {
  const [shapes , setShapes] = useState<Shape[]>([]);

  const addShape = (s: Omit<Shape, 'id'>) => {
    setShapes((prev) => [...prev, { ...s, id: uuidv4() }]);
  };

  const removeShape = (id: string) => {
    setShapes((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div style={{ display: 'flex', flex: 1 ,  height: '100vh' , width: '100vw'}}>
        <div
          style={{
            width: 200,
            borderLeft: '1px solid #ccc',
            borderRight: '1px solid #ccc',
            padding: 16,
          }}
        >
          <Sidebar />
        </div>
        <Canvas
          shapes={shapes}
          onAddShape={addShape}
          onRemoveShape={removeShape}
        />
    </div>
  )
}

export default App
