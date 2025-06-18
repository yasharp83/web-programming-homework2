import React from "react";
import type {Shape , ShapeType} from '../types';
import ShapeObject from "./ShapeObject";



interface FooterProps{
    shapes: Shape[];
}

const Footer: React.FC<FooterProps> = ({shapes}) =>{

    const countShapes = (shapes : Shape[]) : { [key in ShapeType]: number } => {
        const shapeCounts: { [key in ShapeType]: number } = {
            circle: 0,
            square: 0,
            triangle: 0,
        };
        shapes.forEach((shape) => {
            shapeCounts[shape.type]++;
        });
        return shapeCounts;
    };

    const counts = countShapes(shapes);

    return (
        <div
            style={
                {
                    borderTop: '4px solid #ccc',
                    padding: '8px 16px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: 32,
                }
            }
        >
            {(['circle', 'square', 'triangle'] as ShapeType[]).map((t) => (
                <div
                    key={t}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                    >
                    <ShapeObject type={t} size={40} />
                    <span>{counts[t]}</span>
                </div>
            ))} 
        </div>
    );
};


export default Footer;