import { Component, inject, OnDestroy, OnInit } from '@angular/core';
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
export class ExamComponent implements OnInit, OnDestroy {
  currentQuestionObj: QuestionAdapt = {} as QuestionAdapt;
  private readonly _store = inject(Store);

  numOfQuestions$!: Observable<number>;
  numOfQuestions: number = 0;

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
  }

  getNumberOfQuestionsWithoutAsyncPipe() {
    this._store.select(QuestionSelectors.selectNumberOfQuestions).subscribe({
      next: (data) => {
        this.numOfQuestions = data;
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
    this._store.select(QuestionSelectors.selectCurrentQuestion).subscribe({
      next: (data) => {
        this.currentQuestionObj = data!;
      },
    });
  }

  startShowReport() {
    this._store.dispatch(QuestionActions.setWrongQuestions());
  }

  setValueInForm(fieldName: string, value: string | undefined) {
    if (value) {
      this.quizForm.get(fieldName)?.setValue(value);
    } else {
      this.quizForm.get(fieldName)?.setValue(null);
    }
  }

  onSelectAnswer() {
    this.enableNextBtn();
  }

  onBack() {
    //1- Get the prev question
    this._store.dispatch(
      QuestionActions.onBack({ currentIndex: this.currentQuestionObj.index })
    );
    //2- Set the selected value in the form
    this.setValueInForm(
      'selectedAnswer',
      this.currentQuestionObj.selectedAnswer
    );
    //3- Enable Next Button
    this.enableNextBtn();

    //4- Check if the we are in the last question, exit from back function
    if (this.currentQuestionObj.index === 0) {
      console.log('Already in the last question');
      this.disableBackBtn();
    }
  }

  onNext() {
    // 1- Get the selected answer
    const selectedVal = this.quizForm.get('selectedAnswer')?.value;
    // 2- Update the question with the selected answer
    this._store.dispatch(
      QuestionActions.updateQuestion({
        questionId: this.currentQuestionObj._id,
        selectedAnswer: selectedVal,
      })
    );
    // 3- Check if in the last question , if yes run the report & exit from function
    if (this.currentQuestionObj.index === this.numOfQuestions - 1) {
      this.startShowReport();
      console.log('Complete');
      return;
    }
    // 4- Disable Next Button
    this.disableNextBtn();
    // 5- Update current question to be the next one
    this._store.dispatch(
      QuestionActions.onNext({ currentIndex: this.currentQuestionObj.index })
    );
    // 6- Check if the current question answered or not, if answered set the value in the input
    // 7- If already answered, we should enable the next button otherwise will be disabled
    this.setValueInForm(
      'selectedAnswer',
      this.currentQuestionObj.selectedAnswer
    );
    if (this.currentQuestionObj.selectedAnswer) {
      this.enableNextBtn();
    } else {
      this.disableNextBtn();
    }

    // 8- Enable back button
    this.enableBackBtn();
  }

  ngOnInit(): void {
    this.initForm();
    this.getNumberOfQuestionsWithoutAsyncPipe();
    this.getNumberOfQuestions();
    this.getCurrentQuestion();
  }

  ngOnDestroy() {
    this.quizForm.reset();
  }
}
