import { Component } from 'react'
import { RotateCcw } from 'lucide-react'
import Button from './ui/Button'
import EmptyState from './ui/EmptyState'

// Catches a lazily loaded screen that fails to arrive (offline, or a deploy
// renamed its chunk). Browsers cache a failed import(), so retrying in place
// can't work; reloading the page fetches the current chunks.
export default class ScreenErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="page">
        <div className="card">
          <EmptyState icon={RotateCcw} title="Couldn't open this page" action={<Button variant="secondary" icon={RotateCcw} onClick={() => window.location.reload()}>Reload</Button>}>
            Check your connection, then reload the page. ScoreForge may have just been updated.
          </EmptyState>
        </div>
      </div>
    );
  }
}
