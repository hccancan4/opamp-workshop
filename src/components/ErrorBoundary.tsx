import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
  /** Optional custom fallback UI. Defaults to a styled error card. */
  fallback?: ReactNode;
}
interface State { error: Error | null; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[ErrorBoundary]', error.message, info.componentStack);
  }

  handleReset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return this.props.fallback ?? (
        <div style={{
          padding: '1.5rem',
          border: '1px solid var(--crimson)',
          background: 'rgba(184,34,60,0.05)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
        }}>
          <p style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.78rem',
            color: 'var(--crimson)',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          }}>
            ⚠ Render hatası
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--ink-muted)', lineHeight: 1.5 }}>
            {this.state.error.message}
          </p>
          <button
            onClick={this.handleReset}
            style={{
              alignSelf: 'flex-start',
              fontSize: '0.82rem',
              cursor: 'pointer',
              background: 'var(--paper)',
              border: '1px solid var(--rule)',
              padding: '0.35rem 0.8rem',
              borderRadius: 2,
              fontFamily: 'inherit',
              color: 'var(--ink)',
            }}
          >
            Tekrar dene
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
