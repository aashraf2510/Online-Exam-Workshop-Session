import { Exam } from './exam.interface';
import { Subject } from './subject.interface';

export interface Answer {
  answer: string;
  key: string;
}

export interface Question {
  answers: Answer[];
  type: string;
  _id: string;
  question: string;
  correct: string;
  subject: Subject;
  exam: Exam;
  createdAt: string;
}

export interface QuestionAdapt {
  answers: Answer[];
  _id: string;
  index: number;
  question: string;
  correct: string;
  selectedAnswer?: string;
}

export interface QuestionsResponse {
  message: string;
  questions: Question[];
}

export interface QuestionsAdaptResponse {
  message: string;
  questions: QuestionAdapt[];
}

export interface WrongQuestion {
  QID: string;
  Question: string;
  inCorrectAnswer: string;
  correctAnswer: string;
  answers: {};
}

export interface CheckedQuestionResponse {
  message: string;
  correct: number;
  wrong: number;
  total: string;
  WrongQuestions: WrongQuestion[];
  correctQuestions: Question[];
}
