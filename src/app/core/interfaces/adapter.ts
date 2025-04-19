import { ExamsAdaptResponse, ExamsResponse } from './exam.interface';
import {
  QuestionsAdaptResponse,
  QuestionsResponse,
} from './question.interface';

export interface Adapter {
  examAdapter(data: ExamsResponse): ExamsAdaptResponse;
  questionAdapter(data: QuestionsResponse): QuestionsAdaptResponse;
}
