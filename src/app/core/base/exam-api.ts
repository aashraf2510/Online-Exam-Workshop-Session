import { Observable } from 'rxjs';
import {
  ExamsAdaptResponse,
  ExamsResponse,
} from '../interfaces/exam.interface';

export abstract class ExamsAPI {
  abstract allExams(): Observable<ExamsAdaptResponse>;
  abstract allExamsBySubject(subjectId: string): Observable<ExamsAdaptResponse>;
}
