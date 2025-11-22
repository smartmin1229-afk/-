
import { TeamMember, PerformanceStage, PerformanceStatus, InterviewHistory } from './types';

// 가상 면담 이력 생성 함수
const generateMockHistory = (memberId: number, name: string): InterviewHistory[] => {
  return [
    // 2025년 데이터
    {
      id: `${memberId}-2025-goal`,
      date: '2025-02-14',
      type: '목표설정',
      title: '2025년 KPI 및 성장 목표 합의',
      content: `올해 전사적 품질 혁신 캠페인에 발맞추어 '공정 불량률 제로'를 도전 목표로 설정함. 또한 후배 사원 OJT 전담 멘토로서 리더십 역량을 키우기로 합의함.`
    },
    {
      id: `${memberId}-2025-personal`,
      date: '2025-01-20',
      type: '개인면담',
      title: '새해 맞이 면담',
      content: '작년 한 해 노고를 치하하고 올해 기대사항을 전달함. 최근 건강 관리에 신경 쓰고 있으며, 운동 동호회 활동을 지원받고 싶다는 의견을 청취함.'
    },
    // 2024년 데이터
    {
      id: `${memberId}-2024-mid`,
      date: '2024-07-20',
      type: '중간피드백',
      title: '2024년 상반기 성과 점검',
      content: `상반기 생산 목표 달성률 98%로 양호함. 다만 5월에 발생한 설비 이슈 대응 과정에서 보고가 다소 지연된 점에 대해 피드백함. ${name}님은 현장 조치에 집중하느라 보고를 놓쳤다고 하며, 추후 즉시 보고 프로세스를 준수하기로 약속함.`
    },
    {
      id: `${memberId}-2024-personal`,
      date: '2024-05-10',
      type: '개인면담',
      title: '직무 역량 개발 및 고충 상담',
      content: '최근 도입된 신규 장비 운용에 대한 교육 니즈가 있음. 본인이 원한다면 다음 달 심화 교육 과정에 추천하기로 함. 팀 내 소통에는 문제없으나 야간 근무 시 체력적인 부담을 호소함.'
    },
    {
      id: `${memberId}-2024-goal`,
      date: '2024-02-15',
      type: '목표설정',
      title: '2024년 연간 목표 수립',
      content: '올해 핵심 목표로 "공정 불량률 0.5% 미만 유지"와 "표준작업절차(SOP) 개정 제안 2건"을 설정함. 본인이 주도적으로 개선 활동에 참여하겠다는 의지가 강함.'
    },
    // 2023년 데이터
    {
      id: `${memberId}-2023-final`,
      date: '2023-11-25',
      type: '최종평가',
      title: '2023년 종합 성과 평가',
      content: `연간 KPI를 모두 초과 달성하여 'A' 등급 부여. 특히 하반기 수율 안정화 프로젝트에서 팀 내 기여도가 높았음. 동료 평가에서도 협업 태도에 대한 긍정적인 피드백이 많음.`
    },
    {
      id: `${memberId}-2023-personal`,
      date: '2023-09-05',
      type: '개인면담',
      title: '하반기 근무 만족도 면담',
      content: '교대 조 변경 이후 생활 패턴 적응에 대해 논의함. 초기엔 어려움이 있었으나 현재는 안정됨. 동호회 활동 등 워라밸 지원 제도에 관심이 많음.'
    },
    {
      id: `${memberId}-2023-mid`,
      date: '2023-07-15',
      type: '중간피드백',
      title: '2023년 상반기 중간 점검',
      content: '상반기 목표 대비 진척률 100%. 신입 사원 멘토링 역할을 성실히 수행하고 있음. 다만 문서 작업 속도가 다소 느려 엑셀 활용 능력을 보완하면 좋겠다고 조언함.'
    },
    {
      id: `${memberId}-2023-goal`,
      date: '2023-02-10',
      type: '목표설정',
      title: '2023년 목표 합의',
      content: '기본적인 생산성 지표 준수 외에, 안전 사고 Zero화를 최우선 목표로 설정함. 위험성 평가 활동에 월 1회 이상 필수 참여하기로 합의함.'
    }
  ];
};

const TEAM_MEMBERS_A: TeamMember[] = [
  {
    id: 101,
    name: '김민준',
    position: '기정',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop',
    performance: [
      { stage: PerformanceStage.GoalSetting, status: PerformanceStatus.Completed, date: '2024-02-15', notes: '수율 개선을 위한 정량적 목표 설정 완료.' },
      { stage: PerformanceStage.MidtermFeedback, status: PerformanceStatus.InProgress, date: '2024-07-20' },
      { stage: PerformanceStage.FinalEvaluation, status: PerformanceStatus.NotStarted },
    ],
    history: []
  },
  {
    id: 102,
    name: '이서연',
    position: '주임',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    performance: [
      { stage: PerformanceStage.GoalSetting, status: PerformanceStatus.Completed, date: '2024-02-18' },
      { stage: PerformanceStage.MidtermFeedback, status: PerformanceStatus.Completed, date: '2024-07-22', notes: '표준 작업 절차(SOP) 준수율 우수. 현 상태 유지.' },
      { stage: PerformanceStage.FinalEvaluation, status: PerformanceStatus.InProgress },
    ],
    history: []
  },
  {
    id: 103,
    name: '박지훈',
    position: '기정',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
    performance: [
      { stage: PerformanceStage.GoalSetting, status: PerformanceStatus.Completed, date: '2024-02-16' },
      { stage: PerformanceStage.MidtermFeedback, status: PerformanceStatus.Completed, date: '2024-07-19' },
      { stage: PerformanceStage.FinalEvaluation, status: PerformanceStatus.Completed, date: '2024-11-25' },
    ],
    history: []
  },
    {
    id: 104,
    name: '최수빈',
    position: '주임',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
    performance: [
      { stage: PerformanceStage.GoalSetting, status: PerformanceStatus.InProgress },
      { stage: PerformanceStage.MidtermFeedback, status: PerformanceStatus.NotStarted },
      { stage: PerformanceStage.FinalEvaluation, status: PerformanceStatus.NotStarted },
    ],
    history: []
  },
  {
    id: 105,
    name: '정유진',
    position: '기정',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    performance: [
      { stage: PerformanceStage.GoalSetting, status: PerformanceStatus.Completed, date: '2024-02-20' },
      { stage: PerformanceStage.MidtermFeedback, status: PerformanceStatus.NotStarted },
      { stage: PerformanceStage.FinalEvaluation, status: PerformanceStatus.NotStarted },
    ],
    history: []
  },
  {
    id: 106,
    name: '강태현',
    position: '주임',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
    performance: [
      { stage: PerformanceStage.GoalSetting, status: PerformanceStatus.Completed, date: '2024-02-21' },
      { stage: PerformanceStage.MidtermFeedback, status: PerformanceStatus.InProgress },
      { stage: PerformanceStage.FinalEvaluation, status: PerformanceStatus.NotStarted },
    ],
    history: []
  },
  {
    id: 107,
    name: '윤서아',
    position: '기정',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    performance: [
      { stage: PerformanceStage.GoalSetting, status: PerformanceStatus.Completed, date: '2024-02-19' },
      { stage: PerformanceStage.MidtermFeedback, status: PerformanceStatus.Completed, date: '2024-07-25' },
      { stage: PerformanceStage.FinalEvaluation, status: PerformanceStatus.NotStarted },
    ],
    history: []
  },
  {
    id: 108,
    name: '임도윤',
    position: '주임',
    avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=200&auto=format&fit=crop',
    performance: [
      { stage: PerformanceStage.GoalSetting, status: PerformanceStatus.NotStarted },
      { stage: PerformanceStage.MidtermFeedback, status: PerformanceStatus.NotStarted },
      { stage: PerformanceStage.FinalEvaluation, status: PerformanceStatus.NotStarted },
    ],
    history: []
  },
  {
    id: 109,
    name: '한지우',
    position: '기정',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200&auto=format&fit=crop',
    performance: [
      { stage: PerformanceStage.GoalSetting, status: PerformanceStatus.Completed, date: '2024-02-25' },
      { stage: PerformanceStage.MidtermFeedback, status: PerformanceStatus.Completed, date: '2024-07-28' },
      { stage: PerformanceStage.FinalEvaluation, status: PerformanceStatus.InProgress },
    ],
    history: []
  },
];

// 히스토리 주입
TEAM_MEMBERS_A.forEach(member => {
  member.history = generateMockHistory(member.id, member.name);
});


export const SUPERVISORS_DATA: { [key: string]: { name: string; team: TeamMember[] } } = {
  'S12345': {
    name: '홍길동',
    team: TEAM_MEMBERS_A,
  },
};

export const STAGE_DETAILS: { [key in PerformanceStage]: { title: string; description: string; timeline: string; guide: string } } = {
  [PerformanceStage.GoalSetting]: {
    title: '목표 설정',
    description: '연초 목표 수립 면담',
    timeline: '1분기 (2월)',
    guide: '연초에 조직의 목표와 연계하여 개인의 업무 목표를 수립하고 합의하는 단계입니다.\n\nSMART 원칙(Specific, Measurable, Achievable, Relevant, Time-bound)에 따라 구체적이고 측정 가능한 목표를 설정해야 하며, 구성원이 납득하고 몰입할 수 있도록 충분한 소통이 필요합니다.',
  },
  [PerformanceStage.MidtermFeedback]: {
    title: '중간 피드백',
    description: '연중 성과 점검 및 코칭',
    timeline: '3분기 (7월)',
    guide: '상반기 성과를 점검하고 하반기 목표 달성을 위한 피드백과 코칭을 제공하는 단계입니다.\n\n잘한 점은 구체적으로 칭찬하여 강화하고, 개선이 필요한 점은 행동 중심으로 피드백하여 성장을 지원해야 합니다. 필요한 경우 목표를 수정하거나 지원 방안을 논의합니다.',
  },
  [PerformanceStage.FinalEvaluation]: {
    title: '최종 평가',
    description: '연말 종합 평가',
    timeline: '4분기 (11월)',
    guide: '연간 성과를 종합적으로 리뷰하고 평가 등급을 확정하는 단계입니다.\n\n단순히 결과를 통보하는 자리가 아니라, 지난 1년의 성과와 역량을 기반으로 공정하게 평가 근거를 설명하고, 차년도 성장을 위한 육성 면담을 병행해야 합니다.',
  },
};
