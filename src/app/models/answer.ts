import { Question } from './question';

export class Answer {
    id: number;
    name: string;
    correct: string;
    question: Question;
}
