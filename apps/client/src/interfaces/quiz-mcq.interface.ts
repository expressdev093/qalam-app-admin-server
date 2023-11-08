import { IBase } from "./base.interface";
import { IQuizMcqOption } from "./quiz-mcqption.interface";
import { IQuiz } from "./quiz.interface";

export interface IQuizMcq extends IBase {
   
    text: string;
  
    quizId: number;
  
    quiz: IQuiz;
  
    options: IQuizMcqOption[];
}