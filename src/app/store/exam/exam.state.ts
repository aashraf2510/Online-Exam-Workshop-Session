//  Completed show the scores
//  Review show the Wrong answers
export type examStatus =
  | 'Not Started'
  | 'Started'
  | 'Completed'
  | 'Review Answers'
  | 'Closed';

export interface ExamState {
  exam: [];
  examStatus: examStatus;
  isExamModalOpen: boolean;
}
