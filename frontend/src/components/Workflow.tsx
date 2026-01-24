import React, { useState, useEffect } from 'react';
import { Upload, Search, Activity, Link2, Send } from 'lucide-react';

const steps = [
    {
        icon: <Upload size={24} />,
        label: "Upload your data",
        title: "Ingest Knowledge",
        desc: "Securely upload your datasets in any format. We handle the heavy lifting of structure detection."
    },
    {
        icon: <Search size={24} />,
        label: "We analyze and infer",
        title: "Deep Analysis",
        desc: "Our engine detects task types, inferring classification, sentiment, or reasoning patterns."
    },
    {
        icon: <Activity size={24} />,
        label: "Train on Colab",
        title: "Fast Training",
        desc: "One-click handoff to Google Colab with Unsloth-optimized kernels for 2x faster training."
    },
    {
        icon: <Link2 size={24} />,
        label: "Connect to a base LLM",
        title: "Model Fusion",
        desc: "Seamlessly integrate your fine-tuned weights with Llama, Mistral, or Qwen architectures."
    },
    {
        icon: <Send size={24} />,
        label: "Deploy instantly",
        title: "Edge Deployment",
        desc: "Launch your custom SLM to production with a unified API and zero infrastructure overhead."
    }
];

const Workflow: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % steps.length);
        }, 3000); // Cycle every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="section-container workflow-dynamic-v2">
            <div className="section-header-centered">
                <span className="section-tag-premium">Process</span>
                <h2 className="section-title-large">From data to deployed AI — end to end.</h2>
            </div>

            <div className="workflow-stepper-container">
                <div className="workflow-steps-list">
                    {steps.map((step, index) => (
                        <div
                            key={index}
                            className={`workflow-step-card-v2 ${index === activeIndex ? 'active' : ''}`}
                            onClick={() => setActiveIndex(index)}
                        >
                            <div className="step-number-badge">{index + 1}</div>
                            <div className="step-icon-v2">{step.icon}</div>
                            <div className="step-content-v2">
                                <h4 className="step-label-v2">{step.label}</h4>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="workflow-preview-panel">
                    <div className="preview-card-inner glass">
                        <div className="preview-icon-large">
                            {steps[activeIndex].icon}
                        </div>
                        <h3 className="preview-title">{steps[activeIndex].title}</h3>
                        <p className="preview-desc">{steps[activeIndex].desc}</p>
                        <div className="preview-action-indicator">
                            <span className="pulsing-dot"></span>
                            Active Stage: {steps[activeIndex].label}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Workflow;

