import { Component } from "react";
import type { ReactNode } from "react";

interface State {
  hasError: boolean;
}

/** Last line of defense — guests never see a blank crash page. */
export class ErrorBoundary extends Component<
  { children: ReactNode },
  State
> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(): void {
    // Silent recovery by user reload; errors are not surfaced in UI.
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100dvh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            fontFamily: "Georgia, serif",
            textAlign: "center",
            background: "#FAF7F2",
            color: "#2E060F",
          }}
        >
          <div>
            <p style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: ".5rem" }}>
              Ashwin ♥ Aarti — शुभ विवाह
            </p>
            <p style={{ opacity: 0.8, marginBottom: "1rem" }}>
              क्षमा करें, कुछ गड़बड़ सी हुई — कृपया पृष्ठ पुनः लोड करें।
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                border: "2px solid #C9A24B",
                background: "#C9A24B",
                color: "#2E060F",
                fontWeight: 700,
                padding: ".6rem 1.4rem",
                borderRadius: "9999px",
                cursor: "pointer",
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
