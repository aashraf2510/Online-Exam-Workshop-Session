import { Observable } from 'rxjs';
import { QuestionsAdaptResponse } from '../interfaces/question.interface';

export abstract class QuestionsAPI {
  abstract allQuestions(): Observable<QuestionsAdaptResponse>;
  abstract allQuestionsOnExam(
    examId: string
  ): Observable<QuestionsAdaptResponse>;
}
