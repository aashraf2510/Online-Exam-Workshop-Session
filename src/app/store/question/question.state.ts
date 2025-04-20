import { Answer, Question } from '../../core/interfaces/question.interface';

export interface QuestionDataState {
  answers: Answer[];
  _id: string;
  index: number;
  question: string;
  correct: string;
  selectedAnswer?: string; // Optional, only filled for answered questions
}

export interface QuestionState {
  currentQuestion: QuestionDataState | null;
  questions: QuestionDataState[];
  numberOfCorrect: number;
  numberOfWrong: number;
  numberOfQuestions: number;
}
