import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles, Clock, Zap, Brain, ChevronRight, Shield, BookOpen } from 'lucide-react'

const Home = () => {
    const navigate = useNavigate()

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12, delayChildren: 0.2 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
        }
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #FAF5FF 0%, #EDE9FE 50%, #F5F3FF 100%)',
            backgroundAttachment: 'fixed',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Background Orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                style={{
                    maxWidth: '680px',
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative',
                    zIndex: 1
                }}
            >
                {/* Badge */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: 'rgba(139, 92, 246, 0.1)',
                        backdropFilter: 'blur(12px)',
                        padding: '0.625rem 1.25rem',
                        borderRadius: '9999px',
                        border: '1px solid rgba(139, 92, 246, 0.2)',
                        marginBottom: '2rem'
                    }}
                >
                    <Brain size={16} style={{ color: '#8B5CF6' }} />
                    <span style={{
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: '#4C1D95'
                    }}>
                        認知功能分析系統
                    </span>
                </motion.div>

                {/* Main Title */}
                <motion.h1
                    variants={itemVariants}
                    style={{
                        fontFamily: "'Noto Serif TC', Georgia, serif",
                        fontSize: 'clamp(2.5rem, 7vw, 4rem)',
                        fontWeight: 500,
                        lineHeight: 1.2,
                        marginBottom: '1.5rem',
                        color: '#1E1B4B'
                    }}
                >
                    探索
                    <span className="animated-gradient-text" style={{
                        display: 'block',
                        fontSize: 'clamp(3rem, 9vw, 5rem)',
                        fontWeight: 600
                    }}>
                        人格深處
                    </span>
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    variants={itemVariants}
                    style={{
                        fontSize: '1.125rem',
                        lineHeight: 1.8,
                        color: '#6B7280',
                        marginBottom: '2.5rem',
                        maxWidth: '480px',
                        margin: '0 auto 2.5rem'
                    }}
                >
                    基於榮格心理類型理論的專業評估，
                    <br />
                    深入了解您的認知功能與人格傾向
                </motion.p>

                {/* Mode Selection Cards */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        marginBottom: '2.5rem'
                    }}
                >
                    {/* Quick Mode */}
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/assessment/rapid')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1.5rem 2rem',
                            background: 'rgba(255, 255, 255, 0.85)',
                            backdropFilter: 'blur(24px)',
                            border: '1px solid rgba(139, 92, 246, 0.12)',
                            borderRadius: '24px',
                            cursor: 'pointer',
                            boxShadow: '0 4px 20px rgba(139, 92, 246, 0.08)',
                            transition: 'all 0.3s'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: 'linear-gradient(135deg, #10B981, #059669)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Zap size={24} color="white" />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    color: '#1E1B4B',
                                    marginBottom: '0.25rem'
                                }}>
                                    快速模式
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.875rem',
                                    color: '#6B7280'
                                }}>
                                    <Clock size={14} />
                                    約 3 分鐘 · 10 題精選
                                </div>
                            </div>
                        </div>
                        <ChevronRight size={20} style={{ color: '#9CA3AF' }} />
                    </motion.button>

                    {/* Full Mode */}
                    <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => navigate('/assessment/full')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '1.5rem 2rem',
                            background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                            border: 'none',
                            borderRadius: '24px',
                            cursor: 'pointer',
                            boxShadow: '0 8px 32px rgba(139, 92, 246, 0.25), 0 0 0 0 rgba(139, 92, 246, 0)',
                            transition: 'all 0.3s'
                        }}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '14px',
                                background: 'rgba(255, 255, 255, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Sparkles size={24} color="white" />
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{
                                    fontSize: '1.125rem',
                                    fontWeight: 600,
                                    color: 'white',
                                    marginBottom: '0.25rem'
                                }}>
                                    完整評估
                                </div>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.875rem',
                                    color: 'rgba(255, 255, 255, 0.8)'
                                }}>
                                    <Clock size={14} />
                                    約 10 分鐘 · 50 題深度分析
                                </div>
                            </div>
                        </div>
                        <ChevronRight size={20} style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
                    </motion.button>
                </motion.div>

                {/* Trust Badges */}
                <motion.div
                    variants={itemVariants}
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '2rem',
                        flexWrap: 'wrap'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8125rem',
                        color: '#6B7280'
                    }}>
                        <Shield size={16} style={{ color: '#10B981' }} />
                        <span>隱私保護</span>
                    </div>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.8125rem',
                        color: '#6B7280'
                    }}>
                        <BookOpen size={16} style={{ color: '#8B5CF6' }} />
                        <span>基於 MBTI Step II</span>
                    </div>
                </motion.div>

                {/* Footer Note */}
                <motion.p
                    variants={itemVariants}
                    style={{
                        marginTop: '3rem',
                        fontSize: '0.75rem',
                        color: '#9CA3AF',
                        lineHeight: 1.6
                    }}
                >
                    本測驗參考 Myers-Briggs Type Indicator® 理論框架
                    <br />
                    僅作自我探索用途，不構成專業心理診斷
                </motion.p>
            </motion.div>
        </div>
    )
}

export default Home
