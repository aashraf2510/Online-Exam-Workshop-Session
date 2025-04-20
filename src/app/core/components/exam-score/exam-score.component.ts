import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import * as QuestionsSelectors from '@questions-store/question.selectors';

@Component({
  selector: 'app-exam-score',
  imports: [BaseChartDirective],
  templateUrl: './exam-score.component.html',
  styleUrl: './exam-score.component.scss',
})
export class ExamScoreComponent implements AfterViewInit, OnInit {
  private readonly platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);
  private readonly _store = inject(Store);

  numberOfWrongQuestions = 0;
  numberOfQuestions = 0;

  // Doughnut
  doughnutChartLabels!: string[];
  doughnutChartData!: ChartData<'doughnut'>;
  doughnutChartType!: ChartType;

  initChart() {
    this.doughnutChartLabels = ['Wrong', 'Correct'];
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          data: [
            this.numberOfWrongQuestions,
            this.numberOfQuestions - this.numberOfWrongQuestions,
          ],
          backgroundColor: ['#e2162f', '#1688e2'],
        },
      ],
    };
    this.doughnutChartType = 'doughnut';
  }

  calcForChart() {
    this.getTotalQuestion();
    this.getWrongQuestions();
  }

  getWrongQuestions() {
    this._store.select(QuestionsSelectors.selectWrongQuestions).subscribe({
      next: (dataList) => {
        this.numberOfWrongQuestions = dataList.length;
      },
    });
  }

  getTotalQuestion() {
    this._store.select(QuestionsSelectors.selectNumberOfQuestions).subscribe({
      next: (value) => {
        this.numberOfQuestions = value;
      },
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.calcForChart();
    setTimeout(() => {
      this.initChart();
    }, 12);
  }

  // events
  // chartClicked({
  //   event,
  //   active,
  // }: {
  //   event: ChartEvent;
  //   active: object[];
  // }): void {
  //   console.log(event, active);
  // }

  // chartHovered({
  //   event,
  //   active,
  // }: {
  //   event: ChartEvent;
  //   active: object[];
  // }): void {
  //   console.log(event, active);
  // }
}
