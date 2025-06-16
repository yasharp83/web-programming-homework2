import React from "react";
import type { Shape , ShapeType } from "../types";
import ShapeObject from "./ShapeObject";


interface CanvasProps {
    shapes : Shape[],
    onAddShape: (shape : Omit<Shape , 'id'>) => void,
    onRemoveShape: (id:string) => void;
}


const Canvas : React.FC<CanvasProps> =({
        shapes,
        onAddShape,
        onRemoveShape
}) =>
{
    const ref = React.useRef<HTMLDivElement>(null);
    
    const handleDragOver = (ev : React.DragEvent) =>{
        ev.preventDefault();
    };

    const handleDrop = (ev :React.DragEvent) =>{
        ev.preventDefault();
        const shapeType = ev.dataTransfer.getData('shape') as ShapeType;
        if (ref.current && shapeType){
            const rect = ref.current.getBoundingClientRect();
            const x = ev.clientX - rect.left;
            const y = ev.clientY - rect.top;
            onAddShape({
                type: shapeType, x, y,
            });
        }
    };


    return (
        <div
            ref = {ref}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style = {
                {
                    flex:1,
                    margin:16,
                    border: '1px solid #ccc',
                    position: 'relative'
                }
            }
        >
            {
                shapes.map((s) =>(
                    <div
                        key={s.id}
                        onDoubleClick={()=>onRemoveShape(s.id)}
                        style={
                            {
                                position:'absolute',
                                left:s.x,
                                top:s.y,
                                transform: 'translate(-50%, -50%)',
                                cursor: 'pointer',
                            }
                        }
                    >
                        <ShapeObject type={s.type} size={120}/>
                    </div>
                ))
            }

        </div>
    );

};


export default Canvas;