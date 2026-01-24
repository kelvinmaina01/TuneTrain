import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext.tsx';
import Layout from '../components/Layout';
import { Save, Bell, User, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings: React.FC = () => {
    const { user } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState(true);
    const [marketing, setMarketing] = useState(false);

    // Redirect if not logged in
    React.useEffect(() => {
        if (!user && !localStorage.getItem('deploy_user')) {
            navigate('/signin');
        }
    }, [user, navigate]);

    return (
        <Layout>
            <div className="settings-page">
                <div className="section-header">
                    <h1>Settings</h1>
                    <p className="subtitle">Manage your account preferences and environment.</p>
                </div>

                <div className="settings-grid">
                    <div className="settings-section">
                        <h2><User size={20} /> Account details</h2>
                        <div className="settings-card">
                            <div className="form-group">
                                <label>Display Name</label>
                                <input type="text" defaultValue={user?.name} className="input-field" />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" defaultValue={user?.email} className="input-field" disabled />
                                <span className="helper-text">Contact support to change email</span>
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h2><Bell size={20} /> Notifications</h2>
                        <div className="settings-card">
                            <div className="toggle-row">
                                <div className="toggle-info">
                                    <span className="toggle-label">Email Notifications</span>
                                    <span className="toggle-desc">Receive updates about your model training</span>
                                </div>
                                <label className="toggle-switch">
                                    <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                            <div className="divider"></div>
                            <div className="toggle-row">
                                <div className="toggle-info">
                                    <span className="toggle-label">Marketing Emails</span>
                                    <span className="toggle-desc">Receive news about new features</span>
                                </div>
                                <label className="toggle-switch">
                                    <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h2><Sun size={20} /> Appearance</h2>
                        <div className="settings-card">
                            <div className="toggle-row">
                                <div className="toggle-info">
                                    <span className="toggle-label">Light Mode</span>
                                    <span className="toggle-desc">Switch between light and dark theme</span>
                                </div>
                                <label className="toggle-switch">
                                    <input
                                        type="checkbox"
                                        checked={theme === 'light'}
                                        onChange={toggleTheme}
                                    />
                                    <span className="slider"></span>
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="settings-actions">
                        <button className="btn-premium"><Save size={16} /> Save Changes</button>
                    </div>
                </div>
            </div>

            <style>{`
                .settings-page {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 40px 20px 80px;
                }
                .section-header {
                    margin-bottom: 40px;
                }
                .section-header h1 {
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 8px;
                }
                .subtitle {
                    color: var(--text-secondary);
                    font-size: 16px;
                }
                
                .settings-section {
                    margin-bottom: 32px;
                }
                .settings-section h2 {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    font-size: 18px;
                    margin-bottom: 16px;
                    color: var(--text-primary);
                }

                .settings-card {
                    background: var(--bg-surface);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    padding: 24px;
                }

                .form-group {
                    margin-bottom: 20px;
                }
                .form-group:last-child {
                    margin-bottom: 0;
                }
                .form-group label {
                    display: block;
                    font-weight: 500;
                    margin-bottom: 8px;
                    font-size: 14px;
                    color: var(--text-secondary);
                }
                .input-field {
                    width: 100%;
                    padding: 10px 14px;
                    border: 1px solid var(--border);
                    border-radius: 8px;
                    font-size: 15px;
                    outline: none;
                    background: var(--bg-elevated);
                    color: var(--text-primary);
                    transition: border-color 0.2s;
                }
                .input-field:focus {
                    border-color: var(--accent);
                }
                .input-field:disabled {
                    background: var(--bg-hover);
                    color: var(--text-muted);
                }
                .helper-text {
                    display: block;
                    margin-top: 6px;
                    font-size: 12px;
                    color: var(--text-muted);
                }

                .toggle-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 0;
                }
                .toggle-info {
                    display: flex;
                    flex-direction: column;
                }
                .toggle-label {
                    font-weight: 500;
                    font-size: 15px;
                    color: var(--text-primary);
                }
                .toggle-desc {
                    font-size: 13px;
                    color: var(--text-secondary);
                }
                .divider {
                    height: 1px;
                    background: var(--border);
                    margin: 16px 0;
                }

                /* Toggle Switch */
                .toggle-switch {
                    position: relative;
                    display: inline-block;
                    width: 48px;
                    height: 24px;
                }
                .toggle-switch input {
                    opacity: 0;
                    width: 0;
                    height: 0;
                }
                .slider {
                    position: absolute;
                    cursor: pointer;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background-color: var(--bg-active);
                    transition: .4s;
                    border-radius: 24px;
                }
                .slider:before {
                    position: absolute;
                    content: "";
                    height: 18px;
                    width: 18px;
                    left: 3px;
                    bottom: 3px;
                    background-color: var(--text-primary);
                    transition: .4s;
                    border-radius: 50%;
                }
                input:checked + .slider {
                    background-color: var(--accent);
                }
                input:checked + .slider:before {
                    transform: translateX(24px);
                    background-color: #fff;
                }

                .settings-actions {
                    display: flex;
                    justify-content: flex-end;
                    margin-top: 24px;
                }
            `}</style>
        </Layout>
    );
};

export default Settings;
