import { IBase } from "./base.interface";
import { IBoard } from "./board.interface";

export interface IBoardClass extends IBase {
   
    name : string

    isActive: boolean;

    boardId: number

      board: IBoard;
}