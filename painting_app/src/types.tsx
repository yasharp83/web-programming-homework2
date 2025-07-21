export type ShapeType = 'circle' | 'square' | 'triangle' ; 
export const ShapeSize: number = 100;


export interface Shape {
    id : string ; 
    type : ShapeType ; 
    x : number;
    y : number ;
}