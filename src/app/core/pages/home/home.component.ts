import { Component, inject, OnInit } from '@angular/core';
import { CustomModalComponent } from '../../components/custom-modal/custom-modal.component';
import { Store } from '@ngrx/store';
import { examModal } from '../../../store/exam/exam.selectors';
import * as ExamActions from '../../../store/exam/exam.actions';

@Component({
  selector: 'app-home',
  imports: [CustomModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly _subjectId: string = '670037f6728c92b7fdf434fc';
  readonly subjectName: string = 'HTML';
  private readonly _store = inject(Store);
  modalState: boolean = false;

  initEvents() {
    this._store.select(examModal).subscribe((state) => {
      console.log(state);
      this.modalState = state.isOpen;
    });
  }

  startExam() {
    console.log('s');
    this._store.dispatch(ExamActions.toggleModal({ isOpen: true }));
  }

  ngOnInit() {
    this.initEvents();
  }
}
