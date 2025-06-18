import React from "react";
import ShapeObject from "./ShapeObject";
import type { ShapeType } from "../types";


const shapes: ShapeType[] = ['circle' , 'square' , 'triangle'];

const Sidebar: React.FC = () =>{
    const on_drag_start = (
        ev : React.DragEvent<HTMLDivElement>,
        shape: ShapeType
    ) =>{
        ev.dataTransfer.setData('shape' , shape) ;
        console.log(shape + " started dragged");
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
                        <ShapeObject type={shape} size={120} />
                    </div>
                    )
                )
            }
        </div>
    )
}


export default Sidebar;