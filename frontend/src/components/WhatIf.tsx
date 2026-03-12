import React from 'react';

const WhatIf: React.FC = () => {
    return (
        <section className="section-container text-center">
            <div className="what-if-wrapper">
                <span className="section-tag-premium">Vision</span>
                <h2 className="what-if-title">
                    What if you could just <span className="highlight-text-accent">upload data and ship real AI?</span>
                </h2>

                <div className="what-if-grid">
                    {/* Card 1: No Pipelines */}
                    <div className="visual-card">
                        <div className="visual-icon-wrapper">
                            <svg className="visual-svg" viewBox="0 0 100 100">
                                <circle cx="20" cy="50" r="4" fill="var(--accent)" />
                                <circle cx="80" cy="50" r="4" fill="var(--accent)" />
                                <path className="animate-draw" d="M24 50 L76 50" stroke="var(--accent)" strokeWidth="2" strokeDasharray="5,5" fill="none" opacity="0.6" />
                                <rect className="animate-float" x="40" y="40" width="20" height="20" rx="4" fill="var(--bg-elevated)" stroke="var(--accent)" strokeWidth="1.5" />
                                <path className="animate-flow" d="M24 50 L76 50" stroke="var(--accent)" strokeWidth="3" fill="none" strokeLinecap="round" strokeDasharray="0, 52" />
                            </svg>
                        </div>
                        <h4 className="visual-card-title">Zero Pipelines</h4>
                        <p className="visual-card-text">No messy workflows. Just one direct path from data to production.</p>
                    </div>

                    {/* Card 2: No Infra */}
                    <div className="visual-card">
                        <div className="visual-icon-wrapper">
                            <svg className="visual-svg" viewBox="0 0 100 100">
                                <rect x="30" y="30" width="40" height="40" rx="8" fill="none" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.3" />
                                <circle className="animate-pulse-glow" cx="50" cy="50" r="15" fill="var(--accent-muted)" stroke="var(--accent)" strokeWidth="1.5" />
                                <path className="animate-rotate-slow" d="M50 25 L50 35 M50 65 L50 75 M25 50 L35 50 M65 50 L75 50" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" style={{ transformOrigin: '50px 50px' }} />
                            </svg>
                        </div>
                        <h4 className="visual-card-title">Infra-Less</h4>
                        <p className="visual-card-text">No servers to manage. Everything scales automagically behind the scenes.</p>
                    </div>

                    {/* Card 3: Data In - AI Out */}
                    <div className="visual-card">
                        <div className="visual-icon-wrapper">
                            <svg className="visual-svg" viewBox="0 0 100 100">
                                <g className="animate-slide-in">
                                    <rect x="10" y="45" width="15" height="10" rx="2" fill="var(--text-secondary)" opacity="0.5" />
                                </g>
                                <path d="M30 50 Q50 20 70 50" stroke="var(--accent)" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="4,4" />
                                <g className="animate-float">
                                    <path d="M75 40 L85 50 L75 60 Z" fill="var(--accent)" />
                                    <circle cx="80" cy="50" r="12" fill="none" stroke="var(--accent)" strokeWidth="1" />
                                </g>
                            </svg>
                        </div>
                        <h4 className="visual-card-title">Instant Output</h4>
                        <p className="visual-card-text">Raw data transforms into high-performance models in minutes, not weeks.</p>
                    </div>

                    {/* Card 4: Colab Training */}
                    <div className="visual-card">
                        <div className="visual-icon-wrapper">
                            <svg className="visual-svg" viewBox="0 0 100 100">
                                <circle className="animate-dash" cx="50" cy="50" r="30" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
                                <text x="50" y="55" fontSize="12" fontWeight="800" textAnchor="middle" fill="var(--accent)" fontFamily="monospace">colab</text>
                                <path className="animate-pulse" d="M40 85 L60 85" stroke="var(--text-tertiary)" strokeWidth="4" strokeLinecap="round" opacity="0.3" />
                            </svg>
                        </div>
                        <h4 className="visual-card-title">Localized Hub</h4>
                        <p className="visual-card-text">Train where it makes sense—optimized for Google Colab and free-tier runtimes.</p>
                    </div>
                </div>

                <div className="divider-glow"></div>
            </div>
        </section>
    );
};

export default WhatIf;
