import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.tsx';
import { User, Bell, Settings as SettingsIcon, LogOut, ChevronDown, ArrowRight } from 'lucide-react';
import Logo from './Logo.tsx';

const Navbar: React.FC = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';

    return (
        <header className="top-nav">
            <div className="nav-container">
                <Logo />

                <div className="nav-main-links">
                    {!isDashboard && (
                        <>
                            <div className="nav-dropdown-trigger">
                                <span className="nav-text-link">Solutions</span>
                            </div>
                            <Link to="/pricing" className="nav-text-link">Pricing</Link>
                            <Link to="/dashboard" className="nav-text-link">Dashboard</Link>
                        </>
                    )}
                </div>

                <div className="nav-actions">
                    {isAuthenticated ? (
                        <div className="user-menu-container">
                            <button
                                className="user-profile-btn"
                                onClick={() => setShowUserMenu(!showUserMenu)}
                                onBlur={() => setTimeout(() => setShowUserMenu(false), 200)}
                            >
                                <div className="user-avatar">
                                    <img src={user?.avatar || '/avatar-placeholder.png'} alt={user?.name} />
                                </div>
                                <span className="user-name">{user?.name ? user.name.split(' ')[0] : ''}</span>
                                <ChevronDown size={14} className={`chevron ${showUserMenu ? 'open' : ''}`} />
                            </button>

                            {showUserMenu && (
                                <div className="user-dropdown glass animate-in">
                                    <div className="dropdown-header">
                                        <span className="dropdown-title">My Account</span>
                                        <span className="user-email">{user?.email}</span>
                                        <span className="user-plan-badge">{user?.plan || 'FREE'}</span>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <Link to="/profile" className="dropdown-item">
                                        <User size={16} />
                                        <span>Profile</span>
                                    </Link>
                                    <Link to="/notifications" className="dropdown-item">
                                        <Bell size={16} />
                                        <span>Notifications</span>
                                        <span className="badge-new">3</span>
                                    </Link>
                                    <Link to="/settings" className="dropdown-item">
                                        <SettingsIcon size={16} />
                                        <span>Settings</span>
                                    </Link>
                                    <div className="dropdown-divider"></div>
                                    <button onClick={logout} className="dropdown-item logout">
                                        <LogOut size={16} />
                                        <span>Sign Out</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link to="/signin" className="btn-black">
                            <span>Sign In</span>
                            <ArrowRight size={16} />
                        </Link>
                    )}
                </div>
            </div>

            <style>{`
                .user-profile-btn {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    background: var(--bg-elevated);
                    border: 1px solid var(--border);
                    padding: 6px 12px;
                    border-radius: 100px;
                    cursor: pointer;
                    transition: all 0.2s;
                    color: var(--text-primary);
                }
                .user-profile-btn:hover {
                    background: var(--bg-hover);
                    border-color: var(--accent);
                    box-shadow: 0 4px 12px var(--accent-glow);
                }
                .user-avatar {
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    overflow: hidden;
                    background: var(--bg-hover);
                    border: 1px solid var(--accent);
                }
                .user-avatar img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .user-name {
                    font-weight: 600;
                    font-size: 14px;
                }
                .chevron {
                    color: var(--text-muted);
                    transition: transform 0.2s;
                }
                .chevron.open {
                    transform: rotate(180deg);
                }

                .user-menu-container {
                    position: relative;
                }

                .user-dropdown {
                    position: absolute;
                    top: calc(100% + 12px);
                    right: 0;
                    width: 260px;
                    background: var(--bg-card);
                    backdrop-filter: blur(20px);
                    border: 1px solid var(--border);
                    border-radius: 16px;
                    box-shadow: 0 20px 40px -4px rgba(0, 0, 0, 0.5);
                    padding: 8px;
                    z-index: 50;
                    animation: slideDown 0.2s ease-out;
                }

                @keyframes slideDown {
                    from { opacity: 0; transform: translateY(-8px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .dropdown-header {
                    padding: 12px 16px;
                }
                .dropdown-title {
                    display: block;
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--text-muted);
                    margin-bottom: 4px;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                .user-email {
                    display: block;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--text-primary);
                    margin-bottom: 6px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .user-plan-badge {
                    display: inline-block;
                    font-size: 10px;
                    background: var(--accent);
                    padding: 2px 8px;
                    border-radius: 100px;
                    font-weight: 700;
                    color: #000000;
                }

                .dropdown-divider {
                    height: 1px;
                    background: var(--border);
                    margin: 8px 0;
                }

                .dropdown-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 16px;
                    border-radius: 8px;
                    color: var(--text-secondary);
                    font-size: 14px;
                    font-weight: 500;
                    transition: all 0.15s;
                    background: transparent;
                    border: none;
                    width: 100%;
                    cursor: pointer;
                    text-align: left;
                }
                .dropdown-item:hover {
                    background: var(--bg-hover);
                    color: var(--text-primary);
                }
                .dropdown-item.logout {
                    color: #ef4444;
                }
                .dropdown-item.logout:hover {
                    background: rgba(239, 68, 68, 0.1);
                }
                
                .badge-new {
                    margin-left: auto;
                    background: var(--accent);
                    color: #000000;
                    font-size: 10px;
                    font-weight: 700;
                    padding: 2px 6px;
                    border-radius: 100px;
                }
            `}</style>
        </header>
    );
};

export default Navbar;
