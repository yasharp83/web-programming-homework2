import { useState } from 'react'
import {v4 as uuidv4} from 'uuid' ;
import './App.css'
import Sidebar from './component/Sidebar'
import Canvas from './component/Canvas'
import type { Shape } from './types'
import Footer from './component/Footer';
import Header from './component/Header';
import { useParams } from 'react-router-dom';
import { updatePainting , getPainting } from './api';

function App() {
  const { username } = useParams<{ username: string }>();
  const [shapes , setShapes] = useState<Shape[]>([]);
  const [title , setTitle] = useState('')

  useState(() => {
    if (username) {
      console.log(username);
      getPainting(username)
        .then(data => {
          console.log(data);
          setTitle(data.title);
          setShapes(data.shapes);
        })
        .catch(error => {
          console.error('Error fetching painting:', error);
        });
    }
  });

  const addShape = (s: Omit<Shape, 'id'>) => {
    setShapes((prev) => [...prev, { ...s, id: uuidv4() }]);
  };

  const removeShape = (id: string) => {
    setShapes((prev) => prev.filter((s) => s.id !== id));
  };


  const handleImport = (data : {title : string , shapes : Shape[]}) => {
      setTitle(data.title);
      setShapes(data.shapes);
  };

  const handleSave = (data : { title: string; shapes: Shape[] }) => {
      updatePainting(username!, data.title, data.shapes);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh' , width: '80vw' , border:'4px solid #ccc'}}>
        <div
          style={{
              display: 'flex',
              alignItems: 'center',
              padding: 16,
              borderBottom: '4px solid #ccc',
          }}
        >
          <Header
              title={title}
              onTitleChange={setTitle}
              shapes={shapes}
              onImport={handleImport}
              onSave={handleSave}
          />
        </div>
        <div style={{ display: 'flex', flex: 1 }}>
            <Canvas
              shapes={shapes}
              onAddShape={addShape}
              onRemoveShape={removeShape}
            />
            <div
              style={{
                width: 150,
                borderLeft: '4px solid #ccc',
                border:'4px solid #ccc',
                padding: 16
              }}
            >
              <Sidebar />
            </div>
        </div>
        <Footer shapes={shapes}/>
    </div>
  )
}

export default App;
