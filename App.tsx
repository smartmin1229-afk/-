import React, { useState } from 'react';
import { Supervisor, TeamMember } from './types';
import { SUPERVISORS_DATA } from './constants';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import InterviewPractice from './components/InterviewPractice';

const App: React.FC = () => {
  const [currentSupervisor, setCurrentSupervisor] = useState<Supervisor | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [view, setView] = useState<'login' | 'dashboard' | 'practice'>('login');

  const handleLogin = (supervisorId: string) => {
    const supervisorData = SUPERVISORS_DATA[supervisorId];
    if (supervisorData) {
      setCurrentSupervisor({ id: supervisorId, name: supervisorData.name });
      setTeamMembers(supervisorData.team);
      setView('dashboard');
    } else {
      alert('유효하지 않은 반장 사번입니다.');
    }
  };

  const handleLogout = () => {
    setCurrentSupervisor(null);
    setTeamMembers([]);
    setView('login');
  };

  const startPractice = () => {
    setView('practice');
  };

  const endPractice = () => {
    setView('dashboard');
  };

  const updateTeamMember = (updatedMember: TeamMember) => {
    setTeamMembers(prevMembers =>
      prevMembers.map(member =>
        member.id === updatedMember.id ? updatedMember : member
      )
    );
     // Also update the master data structure (for demo purposes)
    if (currentSupervisor) {
        const supervisorData = SUPERVISORS_DATA[currentSupervisor.id];
        if (supervisorData) {
            const memberIndex = supervisorData.team.findIndex(m => m.id === updatedMember.id);
            if (memberIndex !== -1) {
                supervisorData.team[memberIndex] = updatedMember;
            }
        }
    }
  };

  const renderView = () => {
    switch (view) {
      case 'login':
        return <Login onLogin={handleLogin} />;
      case 'dashboard':
        if (currentSupervisor) {
          return (
            <Dashboard
              supervisor={currentSupervisor}
              teamMembers={teamMembers}
              onStartPractice={startPractice}
              onLogout={handleLogout}
              onUpdateTeamMember={updateTeamMember}
            />
          );
        }
        return <Login onLogin={handleLogin} />;
      case 'practice':
        return <InterviewPractice onEndPractice={endPractice} />;
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return (
    <div className="bg-slate-100 min-h-screen font-sans text-slate-800">
      {renderView()}
    </div>
  );
};

export default App;
