
import React, { useState, useMemo, useEffect } from 'react';
import { Supervisor, TeamMember, PerformanceStage, PerformanceStatus, PerformanceStageStatus, InterviewHistory } from '../types';
import { STAGE_DETAILS } from '../constants';

interface DashboardProps {
  supervisor: Supervisor;
  teamMembers: TeamMember[];
  onStartPractice: () => void;
  onLogout: () => void;
  onUpdateTeamMember: (updatedMember: TeamMember) => void;
}

const statusStyles: { [key in PerformanceStatus]: string } = {
  [PerformanceStatus.NotStarted]: 'bg-gray-200 text-gray-700',
  [PerformanceStatus.InProgress]: 'bg-yellow-200 text-yellow-800',
  [PerformanceStatus.Completed]: 'bg-green-200 text-green-800',
};

const stageOrder = [PerformanceStage.GoalSetting, PerformanceStage.MidtermFeedback, PerformanceStage.FinalEvaluation];

const typeToStageMap: Record<string, PerformanceStage | null> = {
  '목표설정': PerformanceStage.GoalSetting,
  '중간피드백': PerformanceStage.MidtermFeedback,
  '최종평가': PerformanceStage.FinalEvaluation,
  '개인면담': null
};

const stageToTypeMap: Record<PerformanceStage, '목표설정' | '중간피드백' | '최종평가'> = {
  [PerformanceStage.GoalSetting]: '목표설정',
  [PerformanceStage.MidtermFeedback]: '중간피드백',
  [PerformanceStage.FinalEvaluation]: '최종평가'
};

const Timeline: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<PerformanceStage | null>(null);

  return (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-slate-700">성과관리 타임라인</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {stageOrder.map((stage) => {
          const details = STAGE_DETAILS[stage];
          return (
            <div 
              key={stage} 
              onClick={() => setSelectedStage(stage)}
              className="relative p-6 bg-slate-50 rounded-xl border border-transparent hover:border-teal-500 hover:shadow-lg transition-all cursor-pointer text-center group"
            >
                <div className="text-teal-600 font-bold mb-2 text-sm uppercase tracking-wider">{details.timeline}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-teal-700 transition-colors">{details.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{details.description}</p>
            </div>
          );
        })}
      </div>

      {/* Stage Guide Modal */}
      {selectedStage && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity" 
            onClick={() => setSelectedStage(null)}
        >
             <div 
                className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl transform transition-all scale-100" 
                onClick={e => e.stopPropagation()}
             >
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-teal-500 pb-1 inline-block">
                        {STAGE_DETAILS[selectedStage].title} 가이드
                    </h3>
                    <button onClick={() => setSelectedStage(null)} className="text-gray-400 hover:text-gray-600 text-2xl">&times;</button>
                </div>
                <div className="bg-teal-50 p-4 rounded-lg mb-6">
                    <p className="text-slate-700 whitespace-pre-line leading-relaxed text-sm md:text-base">
                        {STAGE_DETAILS[selectedStage].guide}
                    </p>
                </div>
                <div className="text-right">
                    <button 
                        onClick={() => setSelectedStage(null)} 
                        className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition shadow-md font-bold"
                    >
                        확인
                    </button>
                </div>
             </div>
        </div>
      )}
    </div>
  );
};

const MemberCard: React.FC<{ 
  member: TeamMember; 
  onEditStage: (member: TeamMember, stage: PerformanceStage) => void;
  onAddInterview: (member: TeamMember) => void;
  onViewHistory: (member: TeamMember) => void;
}> = ({ member, onEditStage, onAddInterview, onViewHistory }) => {
    const getStatusForStage = (stage: PerformanceStage) => {
        return member.performance.find(p => p.stage === stage)?.status || PerformanceStatus.NotStarted;
    };

    return (
        <div className="bg-white p-4 rounded-xl shadow-md flex items-center space-x-4 transition-transform transform hover:scale-105 hover:shadow-lg">
            <div 
              className="flex items-center space-x-4 flex-grow cursor-pointer group" 
              onClick={() => onViewHistory(member)}
            >
              <div className="relative">
                <img src={member.avatar} alt={member.name} className="w-16 h-16 rounded-full object-cover ring-2 ring-transparent group-hover:ring-teal-500 transition-all" />
                <div className="absolute bottom-0 right-0 bg-teal-600 text-white text-xs p-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                   🕒
                </div>
              </div>
              <div>
                  <div className="flex items-center">
                    <h4 className="font-bold text-lg text-slate-800 group-hover:text-teal-600 transition-colors">{member.name}</h4>
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddInterview(member); }}
                      className="ml-2 p-1 text-slate-400 hover:text-teal-600 rounded-full hover:bg-slate-100 transition-colors"
                      title="면담 결과 입력 (개인면담 등)"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-slate-500">{member.position}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
                {stageOrder.map(stage => (
                    <button
                        key={stage}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditStage(member, stage);
                        }}
                        title={`${STAGE_DETAILS[stage].title}: ${getStatusForStage(stage)}`}
                        className={`w-8 h-8 rounded-full transition-transform transform hover:scale-110 ${statusStyles[getStatusForStage(stage)]}`}
                    >
                      {getStatusForStage(stage) === PerformanceStatus.Completed ? '✓' : ''}
                    </button>
                ))}
            </div>
        </div>
    );
};

const ProgressIndicator: React.FC<{ title: string; percentage: number }> = ({ title, percentage }) => (
    <div className="text-center">
        <p className="font-bold text-teal-600 text-2xl">{percentage}%</p>
        <p className="text-sm text-slate-500">{title}</p>
    </div>
);

const HistoryModal: React.FC<{ member: TeamMember; onClose: () => void }> = ({ member, onClose }) => {
  const historyByYear = useMemo(() => {
    const groups: { [year: string]: InterviewHistory[] } = {};
    member.history.forEach(h => {
      const year = h.date.split('-')[0];
      if (!groups[year]) groups[year] = [];
      groups[year].push(h);
    });
    const sortedYears = Object.keys(groups).sort((a, b) => Number(b) - Number(a));
    sortedYears.forEach(y => {
      groups[y].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    return { groups, sortedYears };
  }, [member]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl h-[85vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center bg-teal-50 rounded-t-xl">
           <div className="flex items-center space-x-3">
             <img src={member.avatar} alt={member.name} className="w-12 h-12 rounded-full object-cover" />
             <div>
               <h3 className="text-xl font-bold text-slate-800">{member.name} {member.position}</h3>
               <p className="text-sm text-teal-600 font-medium">면담 이력 리포트 (2023~)</p>
             </div>
           </div>
           <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-2xl font-bold">&times;</button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
           {historyByYear.sortedYears.length === 0 && (
             <div className="text-center text-gray-500 mt-10">등록된 면담 이력이 없습니다.</div>
           )}
           {historyByYear.sortedYears.map(year => (
             <div key={year} className="mb-8 last:mb-0">
               <h4 className="text-2xl font-bold text-slate-300 mb-4 border-b pb-2 sticky top-0 bg-white z-10">{year}년</h4>
               <div className="space-y-4 pl-2">
                 {historyByYear.groups[year].map(record => (
                   <div key={record.id} className="relative pl-6 border-l-2 border-teal-200 pb-2">
                     <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-teal-500 border-2 border-white"></div>
                     <div className="bg-slate-50 p-4 rounded-lg hover:bg-slate-100 transition-colors">
                       <div className="flex justify-between items-start mb-2">
                         <div>
                           <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold mb-1 ${
                             record.type === '개인면담' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                           }`}>
                             {record.type}
                           </span>
                           <h5 className="font-bold text-slate-800 text-lg">{record.title}</h5>
                         </div>
                         <span className="text-sm text-gray-500 whitespace-nowrap">{record.date}</span>
                       </div>
                       <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                         {record.content}
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
           ))}
        </div>
        
        <div className="p-4 border-t bg-gray-50 rounded-b-xl flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700">닫기</button>
        </div>
      </div>
    </div>
  );
};


const Dashboard: React.FC<DashboardProps> = ({ supervisor, teamMembers, onStartPractice, onLogout, onUpdateTeamMember }) => {
  // Generic Interview Modal State
  const [isInterviewModalOpen, setIsInterviewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  const [formData, setFormData] = useState({
    type: '개인면담' as '목표설정' | '중간피드백' | '최종평가' | '개인면담',
    status: PerformanceStatus.InProgress,
    date: '',
    title: '',
    content: ''
  });

  // History Modal State
  const [historyMember, setHistoryMember] = useState<TeamMember | null>(null);

  // 1. Handle clicking on a specific stage circle
  const handleEditStage = (member: TeamMember, stage: PerformanceStage) => {
    setSelectedMember(member);
    const existing = member.performance.find(p => p.stage === stage);
    
    setFormData({
      type: stageToTypeMap[stage],
      status: existing?.status || PerformanceStatus.InProgress,
      date: existing?.date || new Date().toISOString().split('T')[0],
      title: STAGE_DETAILS[stage].title,
      content: existing?.notes || ''
    });
    setIsInterviewModalOpen(true);
  };

  // 2. Handle clicking "Add Interview" (Personal or others)
  const handleAddInterview = (member: TeamMember) => {
    setSelectedMember(member);
    setFormData({
      type: '개인면담',
      status: PerformanceStatus.Completed,
      date: new Date().toISOString().split('T')[0],
      title: '',
      content: ''
    });
    setIsInterviewModalOpen(true);
  };

  const handleViewHistory = (member: TeamMember) => {
    setHistoryMember(member);
  };

  const handleSave = () => {
    if (selectedMember) {
      const newHistoryItem: InterviewHistory = {
        id: Date.now().toString(),
        date: formData.date,
        type: formData.type,
        title: formData.type === '개인면담' ? formData.title : STAGE_DETAILS[typeToStageMap[formData.type]!].title,
        content: formData.content
      };

      let updatedMember = { ...selectedMember };
      
      // 1. Always add to history
      updatedMember.history = [newHistoryItem, ...updatedMember.history];

      // 2. If it's a performance stage, update the status circle as well
      const stage = typeToStageMap[formData.type];
      if (stage) {
         const updatedPerformance = selectedMember.performance.filter(p => p.stage !== stage);
         updatedPerformance.push({
           stage: stage,
           status: formData.status,
           date: formData.date,
           notes: formData.content
         });
         updatedMember.performance = updatedPerformance;
      }

      onUpdateTeamMember(updatedMember);
      setIsInterviewModalOpen(false);
    }
  };
  
  const handleModalClose = () => {
    setIsInterviewModalOpen(false);
    setSelectedMember(null);
  }

  const stageProgress = useMemo(() => {
    const totalMembers = teamMembers.length;
    if (totalMembers === 0) {
        return { goalSetting: 0, midtermFeedback: 0, finalEvaluation: 0 };
    }
    const calculateProgress = (stage: PerformanceStage) => {
        const completedCount = teamMembers.filter(member => 
            member.performance.some(p => p.stage === stage && p.status === PerformanceStatus.Completed)
        ).length;
        return Math.round((completedCount / totalMembers) * 100);
    };

    return {
        goalSetting: calculateProgress(PerformanceStage.GoalSetting),
        midtermFeedback: calculateProgress(PerformanceStage.MidtermFeedback),
        finalEvaluation: calculateProgress(PerformanceStage.FinalEvaluation),
    };
  }, [teamMembers]);


  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          <span className="text-teal-600">{supervisor.name}</span> 반장님, 안녕하세요!
        </h1>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <button onClick={onStartPractice} className="px-4 py-2 bg-emerald-600 text-white rounded-lg shadow-md hover:bg-emerald-700 transition">
            면담 실습하기
          </button>
          <button onClick={onLogout} className="px-4 py-2 bg-slate-600 text-white rounded-lg shadow-md hover:bg-slate-700 transition">
            로그아웃
          </button>
        </div>
      </header>

      <Timeline />
      
      <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 border-b pb-4">
            <h2 className="text-2xl font-bold text-slate-700 mb-4 sm:mb-0">구성원 성과관리 현황</h2>
            <div className="flex space-x-8">
                <ProgressIndicator title="목표설정 진행률" percentage={stageProgress.goalSetting} />
                <ProgressIndicator title="중간피드백 진행률" percentage={stageProgress.midtermFeedback} />
                <ProgressIndicator title="최종평가 진행률" percentage={stageProgress.finalEvaluation} />
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map(member => (
              <MemberCard 
                key={member.id} 
                member={member} 
                onEditStage={handleEditStage} 
                onAddInterview={handleAddInterview}
                onViewHistory={handleViewHistory}
              />
            ))}
        </div>
      </div>

      {/* Unified Interview Input Modal */}
      {isInterviewModalOpen && selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-2 text-slate-800">{selectedMember.name} 면담 입력</h3>
            <p className="text-slate-500 mb-6">면담 결과를 입력하면 이력에 자동 저장됩니다.</p>
            
            <div className="space-y-5">
              <div>
                <label htmlFor="type" className="block text-sm font-bold text-slate-700 mb-1">면담 구분</label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => {
                      const newType = e.target.value as any;
                      // If switching to a stage, try to prefill data
                      const stage = typeToStageMap[newType];
                      if (stage) {
                          const existing = selectedMember.performance.find(p => p.stage === stage);
                          setFormData({
                              ...formData,
                              type: newType,
                              title: STAGE_DETAILS[stage].title,
                              status: existing?.status || PerformanceStatus.InProgress,
                              content: existing?.notes || formData.content
                          });
                      } else {
                          // Personal interview default
                          setFormData({ ...formData, type: newType, title: '' });
                      }
                  }}
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md border"
                >
                  <option value="개인면담">개인면담 (수시)</option>
                  <option value="목표설정">목표설정 (연초)</option>
                  <option value="중간피드백">중간피드백 (중간)</option>
                  <option value="최종평가">최종평가 (연말)</option>
                </select>
              </div>

              {formData.type === '개인면담' ? (
                 <div>
                    <label htmlFor="title" className="block text-sm font-bold text-slate-700 mb-1">면담 제목</label>
                    <input
                      type="text"
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      placeholder="예: 고충 상담, 경력 개발 논의"
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                    />
                 </div>
              ) : (
                 <div>
                    <label htmlFor="status" className="block text-sm font-bold text-slate-700 mb-1">진행 상태 ({formData.type})</label>
                    <select
                      id="status"
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value as PerformanceStatus})}
                      className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-md border"
                    >
                      {Object.values(PerformanceStatus).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>
              )}

               <div>
                <label htmlFor="date" className="block text-sm font-bold text-slate-700 mb-1">면담 일자</label>
                <input
                  type="date"
                  id="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-bold text-slate-700 mb-1">면담 내용 및 결과</label>
                <textarea
                  id="content"
                  rows={6}
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  placeholder="면담 주요 내용, 합의 사항, 향후 계획 등을 상세히 입력하세요."
                  className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-3">
              <button onClick={handleModalClose} className="px-4 py-2 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition font-medium">
                취소
              </button>
              <button onClick={handleSave} className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition font-medium shadow-md">
                저장하기
              </button>
            </div>
          </div>
        </div>
      )}

      {historyMember && (
        <HistoryModal member={historyMember} onClose={() => setHistoryMember(null)} />
      )}
    </div>
  );
};

export default Dashboard;
