export interface AppSession {
  username: string;
  level: number;
  isTeacher?: boolean;
  studentId?: string;
}

export type AppView =
  | 'home'
  | 'calcul'
  | 'revisions'
  | 'revision-quiz'
  | 'sujets'
  | 'problemes'
  | 'monde'
  | 'pourcentages';
