//  Not Started ==> Modal Is closed

// Started ==>  Questions Comp

// Completed ==> Score Report comp

// Review Answers ===> Wrong answers comp

export type exmStatus =
  | 'Not Started'
  | 'Started'
  | 'Completed'
  | 'Review Answers'
  | 'Closed';

export interface ExamState {
  examStatus: exmStatus;
  isExamModalOpen: boolean;
}
