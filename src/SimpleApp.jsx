import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, RefreshCw, Share2, Award } from 'lucide-react';

// 設計規範常量
const COLORS = {
    background: '#FDFCFB', // 暖白/奶油色
    primary: '#1A1A1A',    // 深炭黑
    secondary: '#7A7A7A',  // 灰褐色
    accent: '#C5A059',     // 奢華金
    border: '#E5E5E5'      // 淺灰邊框
};

// 模擬題庫與 TCV 向量邏輯
const QUESTIONS = [
    {
        id: 1,
        dimension: 'EI',
        text: '在社交場合中，你通常傾向於：',
        options: [
            { text: '主動開啟對話並享受熱鬧氛圍', value: 'E', weight: 1 },
            { text: '傾向於深度對談或安靜地觀察', value: 'I', weight: 1 }
        ]
    },
    {
        id: 2,
        dimension: 'SN',
        text: '處理訊息時，你更看重：',
        options: [
            { text: '具體的細節與當下的事實', value: 'S', weight: 1 },
            { text: '整體的概念與未來的可能性', value: 'N', weight: 1 }
        ]
    },
    {
        id: 3,
        dimension: 'TF',
        text: '做決定時，你的優先考量是：',
        options: [
            { text: '邏輯分析與客觀的標準', value: 'T', weight: 1 },
            { text: '價值觀與對他人的影響', value: 'F', weight: 1 }
        ]
    },
    {
        id: 4,
        dimension: 'JP',
        text: '你偏好的生活方式是：',
        options: [
            { text: '井然有序且有明確的計畫', value: 'J', weight: 1 },
            { text: '靈活隨性且保持多種選擇', value: 'P', weight: 1 }
        ]
    }
];

const MBTI_DESCRIPTIONS = {
    'INTJ': { title: '建築師', description: '具備想像力與戰略能力的思想家。' },
    'ENFP': { title: '競選者', description: '熱情、有創造力且自由自在的靈魂。' },
    'ISTJ': { title: '物流師', description: '務實且注重事實，可靠性不容置疑。' },
    // 可擴充其他類型
};

export default function SimpleApp() {
    const [view, setView] = useState('landing'); // landing, quiz, result
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({ EI: 0, SN: 0, TF: 0, JP: 0 });
    const [result, setResult] = useState(null);

    const startQuiz = () => {
        setAnswers({ EI: 0, SN: 0, TF: 0, JP: 0 });
        setCurrentStep(0);
        setView('quiz');
    };

    const handleSelect = (dimension, value) => {
        const newAnswers = { ...answers, [dimension]: (answers[dimension] || 0) + (value === dimension[0] ? 1 : -1) };
        setAnswers(newAnswers);

        if (currentStep < QUESTIONS.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers) => {
        const type = [
            finalAnswers.EI >= 0 ? 'E' : 'I',
            finalAnswers.SN >= 0 ? 'S' : 'N',
            finalAnswers.TF >= 0 ? 'T' : 'F',
            finalAnswers.JP >= 0 ? 'J' : 'P'
        ].join('');
        setResult(type);
        setView('result');
    };

    // 進度條組件
    const ProgressBar = () => (
        <div className="w-full h-px bg-gray-200 mb-12 relative">
            <div
                className="absolute top-0 left-0 h-full bg-black transition-all duration-700 ease-in-out"
                style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
            />
        </div>
    );

    return (
        <div className="min-h-screen font-serif flex flex-col items-center justify-center p-6 sm:p-12 transition-colors duration-1000" style={{ backgroundColor: COLORS.background, color: COLORS.primary }}>
            <div className="max-w-3xl w-full">

                {/* Landing View */}
                {view === 'landing' && (
                    <div className="text-center animate-fade-in">
                        <h2 className="tracking-widest text-sm mb-4 uppercase" style={{ color: COLORS.accent }}>The Core Vector</h2>
                        <h1 className="text-5xl sm:text-7xl font-light mb-8 leading-tight">
                            探索你的<br />人格深處
                        </h1>
                        <p className="text-lg font-sans mb-12 max-w-md mx-auto leading-relaxed" style={{ color: COLORS.secondary }}>
                            基於 Editorial Luxury 審美規範，為您提供一場沉浸式的自我發現之旅。精確的向量計算，揭示最真實的內在特質。
                        </p>
                        <button
                            onClick={startQuiz}
                            className="group relative px-10 py-4 overflow-hidden border border-black hover:text-white transition-colors duration-500"
                        >
                            <span className="relative z-10 tracking-widest text-sm uppercase">開始評測</span>
                            <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                    </div>
                )}

                {/* Quiz View */}
                {view === 'quiz' && (
                    <div className="animate-fade-in min-h-[500px] flex flex-col justify-center">
                        <ProgressBar />
                        <div className="mb-4 text-sm tracking-widest uppercase" style={{ color: COLORS.accent }}>
                            Question {currentStep + 1} of {QUESTIONS.length}
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-light mb-16 leading-snug">
                            {QUESTIONS[currentStep].text}
                        </h2>
                        <div className="grid grid-cols-1 gap-6">
                            {QUESTIONS[currentStep].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSelect(QUESTIONS[currentStep].dimension, option.value)}
                                    className="w-full text-left p-8 border border-gray-200 hover:border-black transition-all duration-300 group flex justify-between items-center"
                                >
                                    <span className="text-lg font-sans pr-4">{option.text}</span>
                                    <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                        {currentStep > 0 && (
                            <button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="mt-12 flex items-center text-sm uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                            >
                                <ChevronLeft className="w-4 h-4 mr-2" /> 返回上題
                            </button>
                        )}
                    </div>
                )}

                {/* Result View */}
                {view === 'result' && (
                    <div className="text-center animate-fade-in">
                        <div className="flex justify-center mb-8">
                            <div className="p-4 rounded-full border border-gray-200">
                                <Award className="w-8 h-8" style={{ color: COLORS.accent }} />
                            </div>
                        </div>
                        <h2 className="tracking-[0.2em] text-sm mb-4 uppercase" style={{ color: COLORS.secondary }}>評測結果</h2>
                        <h1 className="text-7xl sm:text-9xl font-light mb-6 tracking-tighter">
                            {result}
                        </h1>
                        <div className="max-w-lg mx-auto mb-12">
                            <h3 className="text-2xl mb-4 italic">
                                {MBTI_DESCRIPTIONS[result]?.title || '獨特的觀察者'}
                            </h3>
                            <p className="text-lg font-sans leading-relaxed text-gray-600">
                                {MBTI_DESCRIPTIONS[result]?.description || '你的性格組合展現了極高的深度與複雜性。在 TCV 向量空間中，你位於一個充滿潛力的象限。'}
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <button
                                onClick={startQuiz}
                                className="flex items-center px-8 py-3 bg-black text-white text-sm uppercase tracking-widest hover:bg-gray-800 transition-colors"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" /> 重新測試
                            </button>
                            <button className="flex items-center px-8 py-3 border border-gray-200 text-sm uppercase tracking-widest hover:border-black transition-colors">
                                <Share2 className="w-4 h-4 mr-2" /> 分享結果
                            </button>
                        </div>
                    </div>
                )}

            </div>

            {/* Footer Design Element */}
            <footer className="fixed bottom-8 w-full text-center pointer-events-none">
                <div className="text-[10px] tracking-[0.4em] uppercase opacity-30">
                    Editorial Luxury Design System © 2024
                </div>
            </footer>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
      ` }} />
        </div>
    );
}
