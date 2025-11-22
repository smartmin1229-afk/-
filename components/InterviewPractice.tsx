import React from 'react';

interface InterviewPracticeProps {
    onEndPractice: () => void;
}

const InterviewPractice: React.FC<InterviewPracticeProps> = ({ onEndPractice }) => {
    return (
        <div className="fixed inset-0 bg-slate-100 flex flex-col z-50">
            <header className="p-3 bg-white text-slate-800 flex justify-between items-center flex-shrink-0 shadow-md border-b">
                <h2 className="text-xl font-bold">면담 실습 시뮬레이터</h2>
                <button
                    onClick={onEndPractice}
                    className="px-4 py-2 bg-slate-600 text-white rounded-lg shadow-md hover:bg-slate-700 transition text-sm"
                >
                    대시보드로 복귀
                </button>
            </header>
            <div className="flex-grow w-full h-full bg-slate-100">
                <iframe
                    src="/practice.html"
                    title="Interview Practice Simulator"
                    className="w-full h-full border-none"
                    // Allow microphone access for the speech-to-text feature inside the iframe
                    allow="microphone"
                />
            </div>
        </div>
    );
};

export default InterviewPractice;
