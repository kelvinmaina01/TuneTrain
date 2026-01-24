import React from 'react';
import { Bot, BrainCircuit, LineChart, FileText, Eye, Hammer } from 'lucide-react';

const cases = [
    {
        icon: <Bot />,
        label: "AI agents",
        desc: "Autonomous entities capable of complex reasoning and task execution.",
        className: "bento-wide"
    },
    {
        icon: <BrainCircuit />,
        label: "Decision engines",
        desc: "Precision-driven logic for automated business processes.",
        className: "bento-standard"
    },
    {
        icon: <LineChart />,
        label: "Predictive analytics",
        desc: "Forecasting trends with production-grade reliability.",
        className: "bento-standard"
    },
    {
        icon: <FileText />,
        label: "NLP pipelines",
        desc: "Sophisticated text processing for unstructured data at scale.",
        className: "bento-standard"
    },
    {
        icon: <Eye />,
        label: "Vision systems",
        desc: "Real-time object detection and visual analysis.",
        className: "bento-tall"
    },
    {
        icon: <Hammer />,
        label: "Internal AI tools",
        desc: "Custom solutions to empower your team's workflow.",
        className: "bento-wide"
    }
];

const UseCases: React.FC = () => {
    return (
        <section className="section-container relative-context">
            <div className="section-background-glow"></div>
            <div className="section-header-centered">
                <span className="section-tag-premium">Applications</span>
                <h2 className="section-title-large">Built for real-world systems.</h2>
                <p className="section-subtitle-muted">Deploy production-ready models for any use case.</p>
            </div>
            <div className="use-cases-bento">
                {cases.map((c, index) => (
                    <div key={index} className={`use-case-bento-card ${c.className}`}>
                        <div className="use-case-card-content">
                            <div className="use-case-icon-wrapper">{c.icon}</div>
                            <div className="use-case-text">
                                <span className="use-case-label-premium">{c.label}</span>
                                <p className="use-case-desc-premium">{c.desc}</p>
                            </div>
                        </div>
                        <div className="card-glass-shine"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default UseCases;

