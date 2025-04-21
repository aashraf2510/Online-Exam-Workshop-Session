import { Component, inject, input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as QuestionSelectors from '../../../store/question/question.selectors';
import * as QuestionActions from '../../../store/question/question.actions';
import { QuestionDataState } from '../../../store/question/question.state';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { selectExamState } from '@exams-store/exam.selectors';
import * as ExamActions from '@exams-store/exam.actions';

@Component({
  selector: 'app-exam-modal',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './exam-modal.component.html',
  styleUrl: './exam-modal.component.scss',
})
export class ExamModalComponent implements OnInit {
  private readonly _store = inject(Store);
  private destroy$ = new Subject<void>();
  numberOfQuestions: number = 0;
  questionsSteps: number[] = [];
  questionObj: QuestionDataState = {} as QuestionDataState;
  quizForm!: FormGroup;

  isNextBtnDisabled = true;
  isBackBtnDisabled = true;

  getNumberOfQuestions() {
    this._store
      .select(QuestionSelectors.selectNumberOfQuestions)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (value) => {
          this.numberOfQuestions = value;
          this.questionsSteps = [...Array(this.numberOfQuestions).keys()];
        },
      });
  }

  initForm() {
    this.quizForm = new FormGroup({
      selectedAnswer: new FormControl(null, [Validators.required]),
    });
  }

  getCurrentQuestion() {
    this._store
      .select(QuestionSelectors.selectCurrentQuestion)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (obj) => {
          console.log(obj);
          this.questionObj = obj!;
          this.initForm();
        },
      });
  }

  onSelectAnswer() {
    if (this.quizForm.valid) {
      this.isNextBtnDisabled = false;
    }
  }

  getWrongQuestions() {
    let wrongQuestions: QuestionDataState[] = [];
    this._store.select(QuestionSelectors.selectQuestionsList).subscribe({
      next: (dataList) => {
        wrongQuestions = dataList.filter(
          (data) => data.correct != data.selectedAnswer
        );

        this._store.dispatch(
          QuestionActions.setWrongQuestions({ questions: wrongQuestions })
        );
      },
    });

    console.log(wrongQuestions);
  }

  // showQuickReport() {
  //   this._store.dispatch(ExamActions.updateExamStatus({ status: 'Completed' }));
  // }

  onBack() {
    if (this.questionObj.index - 1 == 0) {
      this.isBackBtnDisabled = true;
    }

    if (this.questionObj.index == 0) {
      console.log('Already in first question');
    } else {
      this._store.dispatch(
        QuestionActions.onBack({ currIndex: this.questionObj.index })
      );

      this.quizForm
        .get('selectedAnswer')
        ?.setValue(this.questionObj.selectedAnswer);
    }
    this.isNextBtnDisabled = false;
  }

  onNext() {
    let selectedAnswer = this.quizForm.get('selectedAnswer')?.value;
    this._store.dispatch(
      QuestionActions.updateQuestion({
        questionId: this.questionObj._id,
        selectedAnswer: selectedAnswer,
      })
    );

    if (!this.quizForm.valid) {
      console.log('Select One Answer to procceed');
      return;
    }

    if (this.questionObj.index == this.numberOfQuestions - 1) {
      console.log('Already in last question');
      this.getWrongQuestions();

      return;
    }

    this.isNextBtnDisabled = false;
    this._store.dispatch(
      QuestionActions.onNext({ currIndex: this.questionObj.index })
    );

    console.log(this.quizForm.get('selectedAnswer')?.value);
    this.quizForm
      .get('selectedAnswer')
      ?.setValue(this.questionObj.selectedAnswer);

    this.isNextBtnDisabled = true;

    if (this.questionObj.selectedAnswer) {
      this.isNextBtnDisabled = false;
    }

    this.isBackBtnDisabled = false;
  }

  ngOnInit(): void {
    this.getCurrentQuestion();
    this.getNumberOfQuestions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
