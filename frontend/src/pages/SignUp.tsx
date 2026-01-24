import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, ArrowRight } from 'lucide-react';
import Layout from '../components/Layout';

const SignUp: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate signup then login
        try {
            await login(email);
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Layout>
            <div className="auth-page">
                <div className="auth-container glass-panel">
                    <div className="auth-header">
                        <h1 className="auth-title">Create Account</h1>
                        <p className="auth-subtitle">Join thousands of developers using Deploy.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <div className="input-wrapper">
                                <User size={18} className="input-icon" />
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="auth-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <Mail size={18} className="input-icon" />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="name@company.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="auth-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <Lock size={18} className="input-icon" />
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="auth-input"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-premium btn-full" disabled={isLoading}>
                            {isLoading ? 'Creating Account...' : 'Get Started'}
                            {!isLoading && <ArrowRight size={18} />}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/signin" className="auth-link">Sign in</Link></p>
                    </div>
                </div>
            </div>
            <style>{`
                .auth-page {
                    min-height: 80vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 40px 20px;
                }
                .auth-container {
                    width: 100%;
                    max-width: 480px;
                    padding: 40px;
                    border-radius: 24px;
                    background: var(--bg-surface);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--border);
                    box-shadow: var(--shadow-lg);
                }
                .auth-header {
                    text-align: center;
                    margin-bottom: 32px;
                }
                .auth-title {
                    font-size: 32px;
                    font-weight: 800;
                    margin-bottom: 8px;
                    color: var(--text-primary);
                }
                .auth-subtitle {
                    color: var(--text-secondary);
                    font-size: 16px;
                }
                .form-group {
                    margin-bottom: 24px;
                }
                .form-group label {
                    display: block;
                    font-size: 14px;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: var(--text-primary);
                }
                .input-wrapper {
                    position: relative;
                }
                .input-icon {
                    position: absolute;
                    left: 16px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--text-tertiary);
                }
                .auth-input {
                    width: 100%;
                    padding: 12px 16px 12px 48px;
                    border-radius: 12px;
                    border: 1px solid var(--border);
                    background: var(--bg-elevated);
                    color: var(--text-primary);
                    font-size: 16px;
                    transition: all 0.2s;
                    outline: none;
                }
                .auth-input:focus {
                    border-color: var(--accent);
                    background: var(--bg-base);
                    box-shadow: 0 0 0 3px var(--accent-muted);
                }
                .btn-full {
                    width: 100%;
                    justify-content: center;
                    margin-top: 8px;
                }
                .auth-footer {
                    margin-top: 32px;
                    text-align: center;
                    font-size: 14px;
                    color: var(--text-secondary);
                }
                .auth-link {
                    color: var(--accent);
                    font-weight: 600;
                }
                .auth-link:hover {
                    text-decoration: underline;
                }
            `}</style>
        </Layout>
    );
};

export default SignUp;
