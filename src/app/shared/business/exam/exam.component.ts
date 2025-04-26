import { Component, inject, OnInit } from '@angular/core';
import { QuestionAdapt } from '../../../core/interfaces/question.interface';
import { Store } from '@ngrx/store';
import * as QuestionSelectors from '@questionStore/question.selectors';
import * as QuestionActions from '@questionStore/question.actions';
import { Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-exam',
  imports: [AsyncPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './exam.component.html',
  styleUrl: './exam.component.scss',
})
export class ExamComponent implements OnInit {
  currentQuestionObj: QuestionAdapt = {} as QuestionAdapt;
  private readonly _store = inject(Store);

  numOfQuestions$!: Observable<number>;
  numberOfQuestions: number = 0;

  quizForm!: FormGroup;

  isBackBtnDisabled: boolean = true;
  isNextBtnDisabled: boolean = true;

  enableNextBtn() {
    this.isNextBtnDisabled = false;
  }

  disableNextBtn() {
    this.isNextBtnDisabled = true;
  }

  enableBackBtn() {
    this.isBackBtnDisabled = false;
  }

  disableBackBtn() {
    this.isBackBtnDisabled = true;
  }

  getNumberOfQuestions() {
    this.numOfQuestions$ = this._store.select(
      QuestionSelectors.selectNumberOfQuestions
    );

    this._store.select(QuestionSelectors.selectNumberOfQuestions).subscribe({
      next: (res) => {
        this.numberOfQuestions = res;
      },
    });
  }

  generateRange(num: number) {
    return num ? [...Array(num).keys()] : [];
  }

  initForm() {
    this.quizForm = new FormGroup({
      selectedAnswer: new FormControl(null),
    });
  }

  getCurrentQuestion() {
    this._store.select(QuestionSelectors.selectQuestions).subscribe({
      next: (data) => {
        this.currentQuestionObj = data[0];
        this._store.dispatch(
          QuestionActions.setCurrentQuestion({ question: data[0] })
        );
      },
    });
  }

  onSelectAnswer() {
    this.enableNextBtn();
  }

  onBack() {}

  onNext() {}

  ngOnInit(): void {
    this.initForm();
    this.getNumberOfQuestions();
    this.getCurrentQuestion();
  }
}
