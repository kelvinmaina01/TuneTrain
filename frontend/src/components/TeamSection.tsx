import React from 'react';
import { Shield, Key, FileText, Cpu, Layout, Headphones, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TeamSection: React.FC = () => {
    const enterpriseCapabilities = [
        { icon: <Shield size={24} />, title: "RBAC Controls" },
        { icon: <Key size={24} />, title: "SSO Integration" },
        { icon: <FileText size={24} />, title: "Audit Logs" },
        { icon: <Cpu size={24} />, title: "Custom GPU Hub" },
        { icon: <Layout size={24} />, title: "Dedicated Models" },
        { icon: <Headphones size={24} />, title: "Priority Support" },
        { icon: <Globe size={24} />, title: "Multi-Region Deployment" }
    ];

    return (
        <section className="section-container">
            <div className="team-enterprise-section">
                <div className="team-content">
                    <span className="section-tag-premium">Scale</span>
                    <h2 className="team-title">Team & Enterprise</h2>
                    <p className="team-description">
                        Give your team the most advanced platform to build AI with
                        enterprise-grade security, access controls and dedicated support.
                    </p>

                    <div className="team-cta-group">
                        <Link to="/signup" className="btn-primary btn-large">
                            Getting started <ArrowRight size={20} />
                        </Link>
                        <button className="btn-secondary outline-variant btn-large">
                            Book a demo
                        </button>
                    </div>
                </div>

                <div className="team-visuals">
                    <div className="capability-grid">
                        {enterpriseCapabilities.map((cap, idx) => (
                            <div key={idx} className="capability-card">
                                <div className="cap-icon-wrapper">
                                    {cap.icon}
                                </div>
                                <h4 className="cap-title">{cap.title}</h4>
                                <span className="cap-status">Enterprise</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
