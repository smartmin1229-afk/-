
export enum PerformanceStage {
  GoalSetting = 'goalSetting',
  MidtermFeedback = 'midtermFeedback',
  FinalEvaluation = 'finalEvaluation',
}

export enum PerformanceStatus {
  NotStarted = 'Not Started',
  InProgress = 'In Progress',
  Completed = 'Completed',
}

export type PerformanceStageStatus = {
  stage: PerformanceStage;
  status: PerformanceStatus;
  notes?: string;
  date?: string;
};

export interface InterviewHistory {
  id: string;
  date: string;
  type: '목표설정' | '중간피드백' | '최종평가' | '개인면담';
  title: string;
  content: string;
}

export interface TeamMember {
  id: number;
  name: string;
  position: string;
  avatar: string;
  performance: PerformanceStageStatus[];
  history: InterviewHistory[];
}

export interface Supervisor {
  id: string;
  name: string;
}

export interface ChatMessage {
  role: 'user' | 'model' | 'coach';
  text: string;
  coachAnalysis?: string;
  coachChoices?: string[];
}

export type PersonaType = 'low' | 'mid' | 'high' | 'custom';

export interface CustomPersonaData {
    name: string;
    role: string;
    rank: string;
    years: string;
    job: string;
    performance: string;
    personality: string;
    extra: string;
}

export type ScenarioType = 'goal' | 'feedback' | 'evaluation';
export type EvaluationSubtype = 'before' | 'appeal' | '';
