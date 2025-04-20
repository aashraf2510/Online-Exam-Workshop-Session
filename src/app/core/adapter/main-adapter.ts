import { Injectable } from '@angular/core';
import { Adapter } from '../interfaces/adapter';
import {
  ExamsAdaptResponse,
  ExamsResponse,
} from '../interfaces/exam.interface';
import {
  QuestionsAdaptResponse,
  QuestionsResponse,
} from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root',
})
export class MainAPIAdapter implements Adapter {
  examAdapter(data: ExamsResponse): ExamsAdaptResponse {
    return {
      message: data.message,
      exams: data.exams.map((exam) => ({
        _id: exam._id,
        title: exam.title,
        duration: exam.duration,
        subject: exam.subject,
        numberOfQuestions: exam.numberOfQuestions,
        active: exam.active,
        createdAt: exam.createdAt,
      })),
    };
  }
  questionAdapter(data: QuestionsResponse): QuestionsAdaptResponse {
    return {
      message: data.message,
      questions: data.questions.map((question, index) => ({
        answers: question.answers.map((answer) => ({
          answer: answer.answer,
          key: answer.key,
        })),
        _id: question._id,
        question: question.question,
        correct: question.correct,
        subject: question.subject,
        index: index,
      })),
    };
  }
}
