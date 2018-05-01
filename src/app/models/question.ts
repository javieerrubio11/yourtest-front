import { User } from './user';
import { Quiz } from './quiz';

export class Question {
    id: number;
    name: string;
    owner: User;
    quiz: Quiz;
}
