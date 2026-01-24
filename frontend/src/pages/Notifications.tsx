import React from 'react';
import Layout from '../components/Layout';
import { Bell, Info, CheckCircle, AlertTriangle } from 'lucide-react';

const Notifications: React.FC = () => {
    const notifications = [
        {
            id: 1,
            type: 'success',
            title: 'Model Training Complete',
            message: 'Your model "Finance-BERT-v1" has successfully finished training with 94% accuracy.',
            time: '2 hours ago',
            read: false
        },
        {
            id: 2,
            type: 'info',
            title: 'New Feature Available',
            message: 'We have added support for Phi-4 models. Check it out in the dashboard.',
            time: '1 day ago',
            read: true
        },
        {
            id: 3,
            type: 'warning',
            title: 'Usage Limit Warning',
            message: 'You have used 80% of your monthly token quota.',
            time: '3 days ago',
            read: true
        }
    ];

    return (
        <Layout>
            <div className="notifications-page">
                <div className="page-header">
                    <h1>Notifications</h1>
                </div>

                <div className="notifications-list">
                    {notifications.map(notif => (
                        <div key={notif.id} className={`notification-item ${notif.read ? 'read' : 'unread'}`}>
                            <div className={`notification-icon icon-${notif.type}`}>
                                {notif.type === 'success' && <CheckCircle size={20} />}
                                {notif.type === 'info' && <Info size={20} />}
                                {notif.type === 'warning' && <AlertTriangle size={20} />}
                            </div>
                            <div className="notification-content">
                                <div className="notification-top">
                                    <h3 className="notification-title">{notif.title}</h3>
                                    <span className="notification-time">{notif.time}</span>
                                </div>
                                <p className="notification-message">{notif.message}</p>
                            </div>
                            {!notif.read && <div className="unread-dot"></div>}
                        </div>
                    ))}
                    {notifications.length === 0 && (
                        <div className="empty-state">
                            <Bell size={40} className="empty-icon" />
                            <p>No new notifications</p>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .notifications-page {
                    max-width: 700px;
                    margin: 0 auto;
                    padding: 40px 20px 80px;
                }
                .page-header {
                    margin-bottom: 32px;
                    border-bottom: 1px solid var(--border);
                    padding-bottom: 16px;
                }
                .page-header h1 {
                    font-size: 28px;
                    font-weight: 800;
                }

                .notifications-list {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .notification-item {
                    display: flex;
                    gap: 16px;
                    padding: 20px;
                    background: white;
                    border: 1px solid var(--border);
                    border-radius: 12px;
                    transition: all 0.2s;
                    position: relative;
                }
                .notification-item:hover {
                    border-color: var(--accent);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
                }
                .notification-item.unread {
                    background: #fdfdfd; 
                    border-left: 3px solid var(--accent);
                }

                .notification-icon {
                    flex-shrink: 0;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .icon-success { background: #DCFCE7; color: #10B981; }
                .icon-info { background: #DBEAFE; color: #3B82F6; }
                .icon-warning { background: #FEF9C3; color: #F59E0B; }

                .notification-content {
                    flex: 1;
                }
                .notification-top {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 4px;
                }
                .notification-title {
                    font-weight: 600;
                    font-size: 15px;
                    color: var(--text);
                }
                .notification-time {
                    font-size: 12px;
                    color: var(--text-muted);
                }
                .notification-message {
                    font-size: 14px;
                    color: var(--text-secondary);
                    line-height: 1.5;
                }

                .unread-dot {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    width: 8px;
                    height: 8px;
                    background: var(--accent);
                    border-radius: 50%;
                }

                .empty-state {
                    text-align: center;
                    padding: 60px;
                    color: var(--text-muted);
                }
                .empty-icon {
                    margin-bottom: 16px;
                    opacity: 0.2;
                }
            `}</style>
        </Layout>
    );
};

export default Notifications;
