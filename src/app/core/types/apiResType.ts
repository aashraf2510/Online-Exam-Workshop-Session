import { ExamsResponse } from '../interfaces/exam.interface';
import {
  CheckedQuestionResponse,
  QuestionsResponse,
} from '../interfaces/question.interface';

export type ApiResType =
  | QuestionsResponse
  | ExamsResponse
  | CheckedQuestionResponse;
export type ApiAdaptResType = '';
