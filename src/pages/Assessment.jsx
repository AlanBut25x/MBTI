import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react'
import questionsData from '../data/questions.json'
import QuestionCard from '../components/QuestionCard'

const Assessment = () => {
    const { mode } = useParams()
    const navigate = useNavigate()

    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState({})
    const [isFinished, setIsFinished] = useState(false)

    const activeQuestions = useMemo(() => {
        let q = [...questionsData]
        if (mode === 'rapid') {
            // 快速模式：每個維度取 2 題 + Grip
            const eiQuestions = questionsData.filter(x => x.dimension === 'E_I').slice(0, 2)
            const snQuestions = questionsData.filter(x => x.dimension === 'S_N').slice(0, 2)
            const tfQuestions = questionsData.filter(x => x.dimension === 'T_F').slice(0, 2)
            const jpQuestions = questionsData.filter(x => x.dimension === 'J_P').slice(0, 2)
            const gripQuestions = questionsData.filter(x => x.dimension === 'Grip')
            q = [...eiQuestions, ...snQuestions, ...tfQuestions, ...jpQuestions, ...gripQuestions]
        }
        return q
    }, [mode])

    const handleAnswer = (value) => {
        setAnswers(prev => ({ ...prev, [activeQuestions[currentIndex].id]: value }))

        if (currentIndex < activeQuestions.length - 1) {
            setTimeout(() => setCurrentIndex(prev => prev + 1), 400)
        } else {
            finishAssessment()
        }
    }

    const goToPrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    const goToNext = () => {
        const currentQuestion = activeQuestions[currentIndex]
        if (answers[currentQuestion.id] !== undefined && currentIndex < activeQuestions.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const finishAssessment = () => {
        setIsFinished(true)
        setTimeout(() => {
            navigate('/result', { state: { answers, mode } })
        }, 2500)
    }

    const progress = activeQuestions.length > 0
        ? ((currentIndex + 1) / activeQuestions.length) * 100
        : 0
    const currentQuestion = activeQuestions[currentIndex]
    const hasAnswered = currentQuestion && answers[currentQuestion.id] !== undefined

    // Safety check - show loading if no questions
    if (!activeQuestions || activeQuestions.length === 0 || !currentQuestion) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 50%, #F5F3FF 100%)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem'
            }}>
                <div className="orb orb-1" />
                <div className="orb orb-2" />
                <Loader2
                    size={48}
                    style={{
                        color: '#8B5CF6',
                        animation: 'spin 1s linear infinite'
                    }}
                />
                <p style={{ color: '#6B7280', fontSize: '1rem' }}>
                    正在載入題目...
                </p>
            </div>
        )
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 50%, #F5F3FF 100%)',
            backgroundAttachment: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />

            {/* Header with Progress */}
            <header style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 50,
                background: 'rgba(250, 245, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid rgba(139, 92, 246, 0.1)'
            }}>
                {/* Progress Bar */}
                <div className="progress-bar" style={{ borderRadius: 0, height: '4px' }}>
                    <motion.div
                        className="progress-bar-fill"
                        style={{ borderRadius: 0 }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                </div>

                {/* Navigation */}
                <div style={{
                    maxWidth: '900px',
                    margin: '0 auto',
                    padding: '1rem 1.5rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--text-muted)'
                        }}
                    >
                        <ArrowLeft size={14} />
                        離開
                    </button>

                    <div style={{
                        fontSize: '0.875rem',
                        fontWeight: 700,
                        letterSpacing: '0.05em',
                        color: 'var(--text-deep)'
                    }}>
                        <span style={{
                            background: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontSize: '1.125rem'
                        }}>{currentIndex + 1}</span>
                        <span style={{ color: 'var(--text-light)', margin: '0 0.25rem' }}>/</span>
                        <span style={{ color: 'var(--text-muted)' }}>{activeQuestions.length}</span>
                    </div>

                    <div style={{
                        fontSize: '0.625rem',
                        fontWeight: 700,
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        color: 'var(--primary)',
                        background: 'rgba(139, 92, 246, 0.1)',
                        padding: '0.5rem 1rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(139, 92, 246, 0.2)'
                    }}>
                        {mode === 'rapid' ? '快速' : '完整'}模式
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: '8rem',
                paddingBottom: '8rem',
                position: 'relative',
                zIndex: 1
            }}>
                <AnimatePresence mode="wait">
                    {!isFinished ? (
                        <QuestionCard
                            key={activeQuestions[currentIndex].id}
                            question={activeQuestions[currentIndex]}
                            onAnswer={handleAnswer}
                        />
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{
                                textAlign: 'center',
                                maxWidth: '400px',
                                padding: '0 1.5rem'
                            }}
                        >
                            {/* Loading Animation */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                style={{
                                    width: '72px',
                                    height: '72px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                                    borderRadius: '50%',
                                    margin: '0 auto 2rem',
                                    boxShadow: '0 8px 30px rgba(139, 92, 246, 0.4)'
                                }}
                            >
                                <Loader2 size={32} style={{ color: 'white' }} />
                            </motion.div>

                            <h2 style={{
                                fontFamily: 'var(--font-serif)',
                                fontSize: '1.75rem',
                                fontWeight: 400,
                                marginBottom: '1rem',
                                color: 'var(--text-deep)'
                            }}>
                                正在分析您的<span style={{
                                    fontStyle: 'italic',
                                    background: 'linear-gradient(135deg, #8B5CF6, #6366F1)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>認知剖面</span>...
                            </h2>

                            <p style={{
                                fontSize: '0.875rem',
                                color: 'var(--text-muted)',
                                marginBottom: '2rem'
                            }}>
                                請稍候，我們正在計算您的人格類型和認知功能
                            </p>

                            {/* Progress Indicator */}
                            <div style={{
                                width: '100%',
                                height: '6px',
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: '9999px',
                                overflow: 'hidden'
                            }}>
                                <motion.div
                                    initial={{ x: '-100%' }}
                                    animate={{ x: '100%' }}
                                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                                    style={{
                                        width: '50%',
                                        height: '100%',
                                        background: 'linear-gradient(90deg, #8B5CF6, #10B981)',
                                        borderRadius: '9999px'
                                    }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Navigation Footer - 回到上一題 / 下一題 */}
            {!isFinished && (
                <footer style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.5rem',
                    background: 'rgba(250, 245, 255, 0.85)',
                    backdropFilter: 'blur(20px)',
                    borderTop: '1px solid rgba(139, 92, 246, 0.1)',
                    zIndex: 50
                }}>
                    <div style={{
                        maxWidth: '600px',
                        margin: '0 auto',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: '1rem'
                    }}>
                        {/* 上一題按鈕 */}
                        <motion.button
                            whileHover={{ scale: currentIndex > 0 ? 1.05 : 1 }}
                            whileTap={{ scale: currentIndex > 0 ? 0.95 : 1 }}
                            onClick={goToPrevious}
                            disabled={currentIndex === 0}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.875rem 1.5rem',
                                background: currentIndex > 0
                                    ? 'rgba(255, 255, 255, 0.8)'
                                    : 'rgba(255, 255, 255, 0.4)',
                                backdropFilter: 'blur(10px)',
                                border: '2px solid rgba(139, 92, 246, 0.15)',
                                borderRadius: '9999px',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: currentIndex > 0 ? 'var(--text-deep)' : 'var(--text-light)',
                                cursor: currentIndex > 0 ? 'pointer' : 'not-allowed',
                                transition: 'all 0.3s',
                                opacity: currentIndex > 0 ? 1 : 0.5
                            }}
                        >
                            <ChevronLeft size={18} />
                            上一題
                        </motion.button>

                        {/* 進度指示器 */}
                        <div style={{
                            display: 'flex',
                            gap: '6px'
                        }}>
                            {activeQuestions.slice(
                                Math.max(0, currentIndex - 2),
                                Math.min(activeQuestions.length, currentIndex + 3)
                            ).map((q, idx) => {
                                const actualIdx = Math.max(0, currentIndex - 2) + idx
                                const isActive = actualIdx === currentIndex
                                const isAnswered = answers[q.id] !== undefined
                                return (
                                    <motion.div
                                        key={q.id}
                                        animate={{ scale: isActive ? 1.2 : 1 }}
                                        style={{
                                            width: isActive ? '24px' : '8px',
                                            height: '8px',
                                            borderRadius: '9999px',
                                            background: isActive
                                                ? 'linear-gradient(135deg, #8B5CF6, #6366F1)'
                                                : isAnswered
                                                    ? 'rgba(139, 92, 246, 0.5)'
                                                    : 'rgba(139, 92, 246, 0.15)',
                                            transition: 'all 0.3s'
                                        }}
                                    />
                                )
                            })}
                        </div>

                        {/* 下一題按鈕 */}
                        <motion.button
                            whileHover={{ scale: hasAnswered ? 1.05 : 1 }}
                            whileTap={{ scale: hasAnswered ? 0.95 : 1 }}
                            onClick={goToNext}
                            disabled={!hasAnswered}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.875rem 1.5rem',
                                background: hasAnswered
                                    ? 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)'
                                    : 'rgba(139, 92, 246, 0.2)',
                                border: 'none',
                                borderRadius: '9999px',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                color: hasAnswered ? 'white' : 'var(--text-light)',
                                cursor: hasAnswered ? 'pointer' : 'not-allowed',
                                transition: 'all 0.3s',
                                boxShadow: hasAnswered
                                    ? '0 4px 20px rgba(139, 92, 246, 0.3)'
                                    : 'none',
                                opacity: hasAnswered ? 1 : 0.5
                            }}
                        >
                            下一題
                            <ChevronRight size={18} />
                        </motion.button>
                    </div>
                </footer>
            )}
        </div>
    )
}

export default Assessment
