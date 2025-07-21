import React from "react";
import ShapeObject from "./ShapeObject";
import { ShapeSize, type ShapeType } from "../types";


const shapes: ShapeType[] = ['circle' , 'square' , 'triangle'];

const Sidebar: React.FC = () =>{
    const on_drag_start = (
        ev : React.DragEvent<HTMLDivElement>,
        shape: ShapeType
    ) =>{
        ev.dataTransfer.setData('shape' , shape) ;
        const rect = (ev.target as HTMLElement).getBoundingClientRect();
        const offsetX = ev.clientX - rect.left;
        const offsetY = ev.clientY - rect.top;
        ev.dataTransfer.setData('offsetX', offsetX.toString());
        ev.dataTransfer.setData('offsetY', offsetY.toString());
        console.log(shape + " started dragged at offset:", offsetX, offsetY);
    };

    return(
        <div
            style={
                {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap : 16,
                }
            }
        >
            {
                shapes.map((shape) =>(
                    <div
                        key={shape}
                        draggable
                        onDragStart = {(ev) => on_drag_start(ev, shape)}
                        style={{cursor:'grab'}}
                    >
                        <ShapeObject type={shape} size={ShapeSize} />
                    </div>
                    )
                )
            }
        </div>
    )
}


export default Sidebar;