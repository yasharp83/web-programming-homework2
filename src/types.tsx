export type ShapeType = 'circle' | 'square' | 'triangle' ; 

export interface Shape {
    id : string ; 
    type : string ; 
    color : string ; 
    size : number;
    x : number;
    y : number ;
}