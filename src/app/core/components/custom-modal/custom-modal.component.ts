import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ExamActions from '../../../store/exam/exam.actions';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-custom-modal',
  imports: [],
  templateUrl: './custom-modal.component.html',
  styleUrl: './custom-modal.component.scss',
})
export class CustomModalComponent {
  private readonly _store = inject(Store);
  closeModal() {
    this._store.dispatch(ExamActions.toggleModal({ isOpen: false }));
  }
}
