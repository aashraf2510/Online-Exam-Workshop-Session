import { Metadata } from './common';

export interface Exam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

export interface ExamsResponse {
  message: string;
  metadata: Metadata;
  exams: Exam[];
}

export interface ExamsAdaptResponse {
  message: string;
  exams: Exam[];
}
