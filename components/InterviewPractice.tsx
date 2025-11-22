
import React, { useState, useEffect } from 'react';

interface InterviewPracticeProps {
    onEndPractice: () => void;
}

const InterviewPractice: React.FC<InterviewPracticeProps> = ({ onEndPractice }) => {
    const [iframeKey, setIframeKey] = useState(0);
    const [htmlContent, setHtmlContent] = useState<string>('');
    const [loading, setLoading] = useState(true);

    const handleReload = () => {
        setIframeKey(prev => prev + 1);
    };

    useEffect(() => {
        setLoading(true);
        // Fetch the HTML content
        fetch('/practice.html')
            .then(res => res.text())
            .then(html => {
                // Inject the API key directly into the HTML string
                // We look for the placeholder variable definition
                const processedHtml = html.replace(
                    "let GEMINI_API_KEY = 'AIzaSyAyuLp39374D5PnCk0gYYqAPCgZUFemny0';",
                    `let GEMINI_API_KEY = '${process.env.API_KEY}';`
                );
                setHtmlContent(processedHtml);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to load practice simulator:", err);
                setLoading(false);
            });
    }, [iframeKey]);

    return (
        <div className="fixed inset-0 bg-slate-100 flex flex-col z-50">
            <header className="p-3 bg-white text-slate-800 flex justify-between items-center flex-shrink-0 shadow-md border-b">
                <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-bold">면담 실습 시뮬레이터</h2>
                    <button 
                        onClick={handleReload}
                        className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-full transition-colors"
                        title="새로고침"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                    </button>
                    <a 
                        href="/practice.html" 
                        download="interview_simulator.html"
                        className="p-1.5 text-slate-500 hover:text-teal-600 hover:bg-slate-100 rounded-full transition-colors"
                        title="HTML 파일 다운로드"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                    </a>
                </div>
                <button
                    onClick={onEndPractice}
                    className="px-4 py-2 bg-slate-600 text-white rounded-lg shadow-md hover:bg-slate-700 transition text-sm"
                >
                    대시보드로 복귀
                </button>
            </header>
            <div className="flex-grow w-full h-full bg-slate-100 relative">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mr-3"></div>
                        시뮬레이터 준비 중...
                    </div>
                ) : (
                    <iframe
                        key={iframeKey}
                        srcDoc={htmlContent}
                        title="Interview Practice Simulator"
                        className="w-full h-full border-none"
                        // Allow microphone access for speech-to-text
                        allow="microphone"
                        sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
                    />
                )}
            </div>
        </div>
    );
};

export default InterviewPractice;
