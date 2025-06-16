import React from "react";
import ShapeObject from "./ShapeObject";
import type { ShapeType } from "../types";


const shapes: ShapeType[] = ['circle' , 'square' , 'triangle'];

const Sidebar: React.FC = () =>{
    const onDrag = (
        ev : React.DragEvent<HTMLDivElement>,
        shape: ShapeType
    ) =>{
        ev.dataTransfer.setData('shape' , shape) ;
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
                        onDrag = {(ev) => onDrag(ev, shape)}
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