import { Component, inject, OnInit } from '@angular/core';
import { CustomModalComponent } from '../../components/custom-modal/custom-modal.component';
import { Store } from '@ngrx/store';
import {
  selectExamModal,
  selectExamStatus,
} from '../../../store/exam/exam.selectors';
import * as ExamActions from '../../../store/exam/exam.actions';
import { QuestionsService } from '../../../shared/services/questions.service';
import * as QuestionActions from '../../../store/question/question.actions';
import { QuestionDataState } from '../../../store/question/question.state';
import { ExamModalComponent } from '../../components/exam-modal/exam-modal.component';
import { examStatus } from '../../../store/exam/exam.state';
import { ExamScoreComponent } from '../../components/exam-score/exam-score.component';

@Component({
  selector: 'app-home',
  imports: [CustomModalComponent, ExamModalComponent, ExamScoreComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly _examId: string = '670070a830a3c3c1944a9c63';
  readonly examName: string = 'HTML';
  private readonly _store = inject(Store);
  private readonly _questionsService = inject(QuestionsService);
  examStatus: examStatus = 'Not Started';
  modalState: boolean = false;
  examQuestionsList: QuestionDataState[] = [] as QuestionDataState[];

  initEvents() {
    this._store.select(selectExamStatus).subscribe((state) => {
      this.examStatus = state;
    });

    this._store.select(selectExamModal).subscribe((state) => {
      this.modalState = state;
    });
  }

  getExamQuestions() {
    this._questionsService.allQuestionsOnExam(this._examId).subscribe({
      next: (res) => {
        this.examQuestionsList = res.questions;

        let currQues = this.examQuestionsList[0];

        this._store.dispatch(
          QuestionActions.setQuestions({ questions: this.examQuestionsList })
        );
        this._store.dispatch(
          QuestionActions.setCurrentQuestion({ question: currQues })
        );
        this._store.dispatch(
          ExamActions.updateExamStatus({ status: 'Started' })
        );

        this._store.dispatch(ExamActions.toggleModal());
      },
    });
  }

  startExam() {
    this.getExamQuestions();
  }

  ngOnInit() {
    this.initEvents();
  }
}
