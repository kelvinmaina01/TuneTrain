import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { Shield, Zap, Clock, Settings as SettingsIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');

    if (!user) {
        return (
            <Layout>
                <div style={{ padding: '80px', textAlign: 'center' }}>
                    <h2>Please sign in to view your profile.</h2>
                    <br />
                    <Link to="/signin" className="btn-premium">Sign In</Link>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="profile-page">
                <div className="profile-header">
                    <div className="profile-cover"></div>
                    <div className="profile-info-bar">
                        <div className="profile-avatar-wrapper">
                            <img src={user.avatar || "https://github.com/shadcn.png"} alt={user.name} className="profile-avatar" />
                        </div>
                        <div className="profile-details">
                            <h1 className="profile-name">{user.name}</h1>
                            <p className="profile-email">{user.email}</p>
                            <span className="profile-badge">{user.plan?.toUpperCase() || 'FREE'} PLAN</span>
                        </div>
                        <div className="profile-actions">
                            <Link to="/settings" className="btn-outline btn-sm">
                                <SettingsIcon size={16} /> Settings
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="profile-content">
                    <div className="profile-tabs">
                        <button
                            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                            onClick={() => setActiveTab('overview')}
                        >
                            Overview
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
                            onClick={() => setActiveTab('activity')}
                        >
                            <Clock size={16} /> Activity
                        </button>
                    </div>

                    {activeTab === 'overview' && (
                        <div className="profile-grid">
                            <div className="profile-card">
                                <h3 className="card-title"><Shield size={20} /> Security</h3>
                                <div className="card-content">
                                    <div className="info-row">
                                        <span className="label">2FA</span>
                                        <span className="value success">Enabled</span>
                                    </div>
                                    <div className="info-row">
                                        <span className="label">Password</span>
                                        <span className="value">Last changed 30 days ago</span>
                                    </div>
                                </div>
                            </div>
                            <div className="profile-card">
                                <h3 className="card-title"><Zap size={20} /> Usage</h3>
                                <div className="card-content">
                                    <div className="usage-bar-wrapper">
                                        <div className="usage-label">
                                            <span>M tokens used</span>
                                            <span>2.4 / 10M</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: '24%' }}></div>
                                        </div>
                                    </div>
                                    <div className="usage-bar-wrapper">
                                        <div className="usage-label">
                                            <span>Storage</span>
                                            <span>45.2 GB / 100 GB</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div className="progress-fill" style={{ width: '45%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="activity-list">
                            {[1, 2, 3].map((_, i) => (
                                <div className="activity-item" key={i}>
                                    <div className="activity-icon">
                                        <Clock size={16} />
                                    </div>
                                    <div className="activity-content">
                                        <p className="activity-text">Trained model <strong>Finance-BERT-v{i + 1}</strong></p>
                                        <span className="activity-time">{i * 2 + 1} hours ago</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .profile-page {
                    max-width: 1000px;
                    margin: 0 auto;
                    padding-bottom: 80px;
                }
                .profile-header {
                    background: white;
                    border-radius: 20px;
                    overflow: hidden;
                    border: 1px solid var(--border);
                    margin-bottom: 32px;
                }
                .profile-cover {
                    height: 160px;
                    background: linear-gradient(to right, var(--purple), var(--pink));
                }
                .profile-info-bar {
                    padding: 0 32px 32px;
                    position: relative;
                    display: flex;
                    align-items: flex-end;
                    gap: 24px;
                }
                .profile-avatar-wrapper {
                    margin-top: -60px;
                    padding: 4px;
                    background: white;
                    border-radius: 50%;
                }
                .profile-avatar {
                    width: 120px;
                    height: 120px;
                    border-radius: 50%;
                    object-fit: cover;
                }
                .profile-details {
                    flex: 1;
                    padding-bottom: 8px;
                }
                .profile-name {
                    font-size: 28px;
                    font-weight: 800;
                    margin-bottom: 4px;
                }
                .profile-email {
                    color: var(--text-secondary);
                    margin-bottom: 8px;
                }
                .profile-badge {
                    background: var(--bg-elevated);
                    border: 1px solid var(--border);
                    font-size: 11px;
                    font-weight: 700;
                    padding: 4px 10px;
                    border-radius: 100px;
                    letter-spacing: 0.05em;
                }
                .profile-actions {
                    padding-bottom: 12px;
                }
                .btn-sm {
                    padding: 8px 16px;
                    font-size: 14px;
                }

                .profile-tabs {
                    display: flex;
                    gap: 24px;
                    border-bottom: 1px solid var(--border);
                    margin-bottom: 32px;
                }
                .tab-btn {
                    padding: 12px 0;
                    background: none;
                    border: none;
                    font-size: 15px;
                    font-weight: 600;
                    color: var(--text-secondary);
                    cursor: pointer;
                    position: relative;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }
                .tab-btn.active {
                    color: var(--text);
                }
                .tab-btn.active::after {
                    content: '';
                    position: absolute;
                    bottom: -1px;
                    left: 0;
                    width: 100%;
                    height: 2px;
                    background: var(--text);
                }

                .profile-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 24px;
                }

                .profile-card {
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 24px;
                }
                .card-title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 16px;
                    font-weight: 700;
                    margin-bottom: 20px;
                    color: var(--text);
                }
                .info-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 12px 0;
                    border-bottom: 1px solid var(--border);
                }
                .info-row:last-child {
                    border-bottom: none;
                }
                .label {
                    color: var(--text-secondary);
                }
                .value {
                    font-weight: 500;
                }
                .value.success {
                    color: var(--success, #10B981);
                }
                
                .usage-bar-wrapper {
                    margin-top: 16px;
                }
                .usage-label {
                    display: flex;
                    justify-content: space-between;
                    font-size: 13px;
                    margin-bottom: 8px;
                    color: var(--text-secondary);
                }
                .progress-bar {
                    height: 8px;
                    background: var(--bg-hover, #f4f4f5);
                    border-radius: 100px;
                    overflow: hidden;
                }
                .progress-fill {
                    height: 100%;
                    background: var(--accent);
                    border-radius: 100px;
                }

                .activity-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }
                .activity-item {
                    display: flex;
                    gap: 16px;
                    padding: 16px;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    align-items: center;
                }
                .activity-icon {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: var(--bg-hover, #f4f4f5);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-secondary);
                }
                .activity-content {
                    flex: 1;
                }
                .activity-text {
                    font-size: 14px;
                    margin-bottom: 2px;
                }
                .activity-time {
                    font-size: 12px;
                    color: var(--text-muted);
                }
            `}</style>
        </Layout>
    );
};

export default Profile;
