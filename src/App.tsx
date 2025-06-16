import { useState } from 'react'
import {v4 as uuidv4} from 'uuid' ;
import './App.css'
import Sidebar from './component/Sidebar'
import Canvas from './component/Canvas'
import type { Shape } from './types'
import Footer from './component/Footer';
import Header from './component/Header';

function App() {
  const [shapes , setShapes] = useState<Shape[]>([]);
  const [title , setTitle] = useState('Title')

  const addShape = (s: Omit<Shape, 'id'>) => {
    setShapes((prev) => [...prev, { ...s, id: uuidv4() }]);
  };

  const removeShape = (id: string) => {
    setShapes((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh' , width: '80vw' , border:'1px solid #ccc'}}>
        <div
          style={{
              display: 'flex',
              alignItems: 'center',
              padding: 16,
              borderBottom: '1px solid #ccc',
          }}
        >
          <Header
              title={title}
              onTitleChange={setTitle}
          />
        </div>
        <div style={{ display: 'flex', flex: 1 }}>
            <div
              style={{
                width: 150,
                borderLeft: '1px solid #ccc',
                borderRight: '1px solid #ccc',
                border:'1px solid #ccc',
                padding: 16
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
        <Footer shapes={shapes}/>
    </div>
  )
}

export default App;
