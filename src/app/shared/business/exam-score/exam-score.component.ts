import { AfterViewInit, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as QuestionSelectors from '@questionStore/question.selectors';
import * as QuestionActions from '@questionStore/question.actions';
import * as ExamActions from '@examStore/exam.actions';

@Component({
  selector: 'app-exam-score',
  imports: [BaseChartDirective],
  templateUrl: './exam-score.component.html',
  styleUrl: './exam-score.component.scss',
})
export class ExamScoreComponent implements AfterViewInit {
  doughnutChartLabels: string[] = [] as string[];
  doughnutChartData!: ChartData<'doughnut'>;
  doughnutChartType: ChartType = 'doughnut';
  numOfWrong: number = 0;
  numOfQuestions: number = 0;
  timer!: NodeJS.Timeout;

  private readonly _store = inject(Store);

  getWrongQuestionsNum() {
    this._store
      .select(QuestionSelectors.selectNumberOfWrongQuestions)
      .subscribe({
        next: (value) => {
          this.numOfWrong = value;
        },
      });
  }

  getQuestionsNum() {
    this._store.select(QuestionSelectors.selectNumberOfQuestions).subscribe({
      next: (value) => {
        this.numOfQuestions = value;
      },
    });
  }

  initChart() {
    this.doughnutChartLabels = ['Wrong', 'Correct'];
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: [this.numOfWrong, this.numOfQuestions - this.numOfWrong],
          backgroundColor: ['#e2162f', '#1688e2'],
        },
      ],
    };
  }

  closeModal() {
    // Clear Exam State
    this._store.dispatch(ExamActions.resetExamState());
    //Clear Question State
    this._store.dispatch(QuestionActions.resetQuestionState());
  }

  showFullSummary() {
    // Update Exam Status to be Review Answers
    this._store.dispatch(
      ExamActions.updateExamStatus({ status: 'Review Answers' })
    );
  }

  ngAfterViewInit(): void {
    this.timer = setTimeout(() => {
      this.getQuestionsNum();
      this.getWrongQuestionsNum();
      this.initChart();
    });
  }

  ngOnDestroy(): void {
    clearTimeout(this.timer);
  }
}
