import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error, errorInfo: null };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
        this.setState({ error, errorInfo });
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '40px',
                    color: '#FFFFFF',
                    backgroundColor: '#000000',
                    fontFamily: 'Poppins, sans-serif',
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                    <h1 style={{ color: '#FF8C00', fontSize: '3rem', marginBottom: '20px' }}>Something went wrong.</h1>
                    <p style={{ color: '#A1A1AA', marginBottom: '40px', maxWidth: '600px' }}>
                        An unexpected error occurred. Don't worry, our team has been notified and we're looking into it.
                    </p>

                    <div style={{
                        maxWidth: '800px',
                        width: '100%',
                        padding: '24px',
                        backgroundColor: '#0A0A0A',
                        borderRadius: '16px',
                        border: '1px solid #27272A',
                        textAlign: 'left',
                        marginBottom: '40px'
                    }}>
                        <h3 style={{ marginTop: 0, color: '#FF8C00', marginBottom: '12px', fontSize: '1.2rem' }}>Error Details:</h3>
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            color: '#F43F5E',
                            fontFamily: 'monospace',
                            fontSize: '14px',
                            background: 'rgba(244, 63, 94, 0.05)',
                            padding: '16px',
                            borderRadius: '8px'
                        }}>
                            {this.state.error && this.state.error.toString()}
                        </pre>

                        <h4 style={{ color: '#A1A1AA', marginTop: '24px', marginBottom: '12px' }}>Trace:</h4>
                        <pre style={{
                            whiteSpace: 'pre-wrap',
                            fontSize: '12px',
                            color: '#71717A',
                            fontFamily: 'monospace',
                            maxHeight: '200px',
                            overflowY: 'auto'
                        }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </pre>
                    </div>

                    <div style={{ display: 'flex', gap: '16px' }}>
                        <button
                            onClick={() => window.location.reload()}
                            style={{
                                padding: '14px 28px',
                                borderRadius: '12px',
                                border: 'none',
                                background: '#FF8C00',
                                color: '#000000',
                                cursor: 'pointer',
                                fontWeight: 700,
                                fontSize: '1rem',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            Refresh Application
                        </button>
                        <button
                            onClick={() => window.location.href = '/'}
                            style={{
                                padding: '14px 28px',
                                borderRadius: '12px',
                                border: '1px solid #27272A',
                                background: 'transparent',
                                color: '#FFFFFF',
                                cursor: 'pointer',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
