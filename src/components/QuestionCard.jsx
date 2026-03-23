import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

const QuestionCard = ({ question, onAnswer }) => {
    const [selected, setSelected] = React.useState(null)

    const handleSelect = (value) => {
        setSelected(value)
        setTimeout(() => onAnswer(value), 300)
    }

    // Numeric scale for Likert
    const likertValues = [1, 2, 3, 4, 5]
    const likertLabels = ['非常不同意', '不同意', '中立', '同意', '非常同意']

    const cardVariants = {
        initial: { opacity: 0, y: 30, scale: 0.96 },
        animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
        },
        exit: {
            opacity: 0,
            y: -20,
            scale: 0.98,
            transition: { duration: 0.3 }
        }
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(24px)',
                borderRadius: '32px',
                border: '1px solid rgba(139, 92, 246, 0.12)',
                boxShadow: '0 8px 32px rgba(139, 92, 246, 0.12)',
                padding: '2.5rem',
                maxWidth: '600px',
                width: '100%',
                margin: '0 1rem'
            }}
        >
            {/* Question Source Badge */}
            {question.source && (
                <div style={{
                    display: 'inline-block',
                    fontSize: '0.625rem',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#8B5CF6',
                    background: 'rgba(139, 92, 246, 0.08)',
                    padding: '0.375rem 0.75rem',
                    borderRadius: '9999px',
                    marginBottom: '1.5rem'
                }}>
                    {question.source.split(' - ')[0]}
                </div>
            )}

            {/* Question Text */}
            <h2 style={{
                fontFamily: "'Noto Serif TC', Georgia, serif",
                fontSize: '1.375rem',
                fontWeight: 400,
                lineHeight: 1.7,
                color: '#1E1B4B',
                textAlign: 'center',
                marginBottom: '2.5rem'
            }}>
                {question.text}
            </h2>

            {/* Likert Scale */}
            {question.type === 'likert' && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '1.5rem'
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        gap: '0.75rem',
                        width: '100%'
                    }}>
                        {likertValues.map((value, index) => (
                            <motion.button
                                key={index}
                                whileHover={{ scale: 1.1, y: -4 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleSelect(value)}
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: selected === value
                                        ? 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)'
                                        : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                                    backdropFilter: 'blur(12px)',
                                    border: selected === value
                                        ? '2px solid #8B5CF6'
                                        : '2px solid rgba(139, 92, 246, 0.12)',
                                    borderRadius: '16px',
                                    cursor: 'pointer',
                                    boxShadow: selected === value
                                        ? '0 0 30px rgba(139, 92, 246, 0.3)'
                                        : '0 4px 15px rgba(139, 92, 246, 0.08)',
                                    transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                                }}
                            >
                                <span style={{
                                    fontSize: '1.25rem',
                                    fontWeight: 700,
                                    color: selected === value ? 'white' : 'var(--text-deep)'
                                }}>
                                    {value}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    <div style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        height: '2rem'
                    }}>
                        <AnimatePresence mode="wait">
                            {selected && (
                                <motion.span
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    style={{
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        color: '#8B5CF6',
                                        background: 'rgba(139, 92, 246, 0.08)',
                                        padding: '0.25rem 1rem',
                                        borderRadius: 'var(--radius-full)'
                                    }}
                                >
                                    {likertLabels[selected - 1]}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            )}

            {/* Binary / Choice Options */}
            {(question.type === 'binary' || question.type === 'choice') && question.options && (
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                }}>
                    {question.options.map((option, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ x: 8 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect(option.value)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1.25rem 1.5rem',
                                background: selected === option.value
                                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(99, 102, 241, 0.05))'
                                    : 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
                                backdropFilter: 'blur(12px)',
                                border: selected === option.value
                                    ? '2px solid #8B5CF6'
                                    : '2px solid rgba(139, 92, 246, 0.12)',
                                borderRadius: '18px',
                                cursor: 'pointer',
                                textAlign: 'left',
                                position: 'relative',
                                overflow: 'hidden',
                                boxShadow: selected === option.value
                                    ? '0 8px 32px rgba(139, 92, 246, 0.15)'
                                    : '0 4px 20px rgba(139, 92, 246, 0.08)',
                                transition: 'all 0.3s'
                            }}
                        >
                            {/* Left Accent Bar */}
                            <div style={{
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: '4px',
                                background: 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                                transform: selected === option.value ? 'scaleY(1)' : 'scaleY(0)',
                                transition: 'transform 0.3s'
                            }} />

                            {/* Indicator */}
                            <div style={{
                                width: '24px',
                                height: '24px',
                                borderRadius: '50%',
                                border: selected === option.value
                                    ? '2px solid #8B5CF6'
                                    : '2px solid rgba(139, 92, 246, 0.2)',
                                background: selected === option.value
                                    ? 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)'
                                    : 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0,
                                transition: 'all 0.3s'
                            }}>
                                {selected === option.value && (
                                    <Check size={14} color="white" strokeWidth={3} />
                                )}
                            </div>

                            {/* Option Text */}
                            <span style={{
                                fontSize: '1rem',
                                fontWeight: 500,
                                color: '#1E1B4B',
                                lineHeight: 1.5
                            }}>
                                {option.text}
                            </span>
                        </motion.button>
                    ))}
                </div>
            )}

            {/* Likert Labels */}
            {question.type === 'likert' && (
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '0.5rem',
                    padding: '0 1rem',
                    color: 'var(--text-light)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.05em'
                }}>
                    <span>完全不符</span>
                    <span>完全符合</span>
                </div>
            )}
        </motion.div>
    )
}

export default QuestionCard
