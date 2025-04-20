export type examStatus = 'Not Started' | 'Started' | 'Completed';

export interface ExamState {
  exam: [];
  examStatus: examStatus;
}
