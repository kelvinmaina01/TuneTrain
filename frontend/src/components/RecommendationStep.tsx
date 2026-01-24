import React, { useState, useEffect } from 'react';
import { useSession } from '../context/SessionContext.tsx';
import { api } from '../services/api.ts';

const RecommendationStep: React.FC = () => {
    const {
        sessionId, selectedTask, selectedDeployment,
        recommendationData, setRecommendationData,
        selectedModel, setSelectedModel,
        allModels, setStep
    } = useSession();

    const [isLoading, setIsLoading] = useState(!recommendationData);

    useEffect(() => {
        if (!recommendationData && sessionId && selectedTask && selectedDeployment) {
            const fetchRecommendation = async () => {
                setIsLoading(true);
                try {
                    const data = await api.getRecommendation(sessionId, selectedTask, selectedDeployment);
                    setRecommendationData(data);
                } catch (err) {
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };
            fetchRecommendation();
        }
    }, [sessionId, selectedTask, selectedDeployment, recommendationData, setRecommendationData]);

    if (isLoading) {
        return (
            <section className="step-content active">
                <div className="content-header centered">
                    <div className="header-badge">Step 3</div>
                    <h1>Model Recommendation</h1>
                    <p>Based on your dataset and requirements</p>
                </div>
                <div className="loading-state">
                    <div className="loading-spinner"></div>
                    <p>Analyzing your dataset...</p>
                </div>
            </section>
        );
    }

    if (!selectedModel) return null;

    const scorePercent = Math.round((selectedModel.score || 0.85) * 100);
    const isLLM = selectedModel.size.includes('B') && parseInt(selectedModel.size) >= 8;

    return (
        <section className="step-content active">
            <div className="content-header centered">
                <div className="header-badge">Step 3</div>
                <h1>Model Recommendation</h1>
                <p>Based on your dataset and requirements</p>
            </div>

            <div className="rec-content">
                <div className="rec-grid">
                    {/* Primary Recommendation */}
                    <div className="card primary-rec">
                        <div className="rec-badge-group">
                            <div className="rec-badge">Best Match</div>
                            <div className={`tier-badge ${isLLM ? 'llm' : 'slm'}`}>
                                {isLLM ? 'Powerful LLM' : 'Efficient SLM'}
                            </div>
                        </div>
                        <div className="rec-header">
                            <div className="rec-model-info">
                                <h3 className="rec-model-name">{selectedModel.model_name}</h3>
                                <span className="rec-model-size">{selectedModel.size} Parameter Model</span>
                            </div>
                            <div className="rec-score-ring">
                                <svg viewBox="0 0 36 36">
                                    <defs>
                                        <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" style={{ stopColor: '#FF8C00' }} />
                                            <stop offset="100%" style={{ stopColor: '#FFA500' }} />
                                        </linearGradient>
                                    </defs>
                                    <path className="score-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path
                                        className="score-fill"
                                        stroke="url(#scoreGradient)"
                                        strokeDasharray={`${scorePercent}, 100`}
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                    />
                                </svg>
                                <span className="score-text">{scorePercent}%</span>
                            </div>
                        </div>
                        <div className="rec-reasons">
                            {selectedModel.reasons?.map((reason, i) => (
                                <div key={i} className="rec-reason">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                    <span>{reason}</span>
                                </div>
                            ))}
                        </div>
                        <div className="rec-metrics">
                            <div className="rec-metric">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                </svg>
                                <span>Optimization: <strong>Production-Ready</strong></span>
                            </div>
                        </div>
                    </div>

                    {/* Alternatives */}
                    <div className="card alternatives-card">
                        <h4 className="card-title">Discovery</h4>
                        <p className="alternatives-hint">Compare with other architecture tiers</p>
                        <div className="alternatives-list">
                            {allModels.map((model) => {
                                const modelIsLLM = model.size.includes('B') && parseInt(model.size) >= 8;
                                return (
                                    <button
                                        key={model.model_id}
                                        className={`alternative-item ${selectedModel.model_id === model.model_id ? 'active' : ''} ${modelIsLLM ? 'tier-llm' : 'tier-slm'}`}
                                        onClick={() => setSelectedModel(model)}
                                    >
                                        <div className="alt-model-info">
                                            <span className="alt-model-name">{model.model_name}</span>
                                            <span className="alt-model-size">{model.size}</span>
                                        </div>
                                        <div className="alt-score">{Math.round((model.score || 0.8) * 100)}%</div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="action-bar">
                <button className="btn btn-ghost" onClick={() => setStep(2)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back
                </button>
                <button className="btn btn-primary btn-visionary" onClick={() => setStep(4)}>
                    <span>Build & Deploy Model</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                </button>
            </div>
        </section>
    );
};

export default RecommendationStep;
