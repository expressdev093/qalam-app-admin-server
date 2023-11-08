import { IBase } from "./base.interface";
import { IBoardClass } from "./board-class.interface";

export interface IBoard extends IBase {
   
name : string

   isActive: boolean;

  classes?: IBoardClass[];
}