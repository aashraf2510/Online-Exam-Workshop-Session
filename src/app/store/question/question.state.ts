// list of questions
// current question
// number of questions
// wrong questions
// number of wrong questions

import { QuestionAdapt } from '../../core/interfaces/question.interface';

export interface QuestionState {
  questions: QuestionAdapt[]; // List all question that related to the EXAM ID
  currentQuestion: QuestionAdapt | null; // To Display the Current Question
  wrongQuestions: QuestionAdapt[]; // To list all wrong answered questions
  numberOfQuestions: number; // Number of all questions
  numberOfWrongQuestions: number; // Number of all wrong questions
}

// Diff => Number of correct answers
