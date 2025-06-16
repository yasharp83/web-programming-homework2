import React from 'react';
import type { ShapeType} from '../types';


interface ShapeObjectProps {
    type: ShapeType;
    color?: string;
    size?: number;
}

interface TypeColorDict{
    [key: string] : string;
}
const typeColorDict : TypeColorDict = {
    "circle" : "blue",
    "square" : "green",
    "triangle" : "red"
}

const ShapeObject: React.FC<ShapeObjectProps> = ({
    type,
    color = null,
    size = 100,
}) => {
    switch(type){
        case 'circle' : 
            return(
                <div
                    style = {
                        {
                            width : size,
                            height : size,
                            borderRadius:'50%',
                            background: color?color:typeColorDict['circle'],
                        }
                    }
                />
            );
        case 'square' : 
            return(
                <div
                    style={
                        {
                            width : size , 
                            height : size , 
                            background : color?color:typeColorDict['square'],
                        }
                    }
                />
            );
        case 'triangle' : 
            return(
                <div
                    style={
                        {
                            width: 0,
                            height: 0,
                            borderLeft: `${size / 2}px solid transparent`,
                            borderRight: `${size / 2}px solid transparent`,
                            borderBottom: `${size}px solid ${color?color:typeColorDict['triangle']}`,
                        }
                    }
                />
            );
        default:
            return null;
    }
};


export default ShapeObject;