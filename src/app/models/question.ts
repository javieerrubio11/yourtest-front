import { User } from './user';
import { Quiz } from './quiz';
import { Answer } from './answer';

export class Question {
    id: number;
    name: string;
    owner: User;
    quiz: Quiz;
    answers: Array<Answer>;
}
