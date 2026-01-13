import React, { Component, ErrorInfo, ReactNode } from 'react';

/**
 * Props for ErrorBoundary component
 */
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State for ErrorBoundary component
 */
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary Component
 *
 * Catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the
 * crashed component tree.
 *
 * @example
 * <ErrorBoundary fallback={<ErrorFallback />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to console
    console.error('[ErrorBoundary] Caught an error:', error);
    console.error('[ErrorBoundary] Error Info:', errorInfo);

    // Log component stack
    console.error('[ErrorBoundary] Component Stack:', errorInfo.componentStack);

    // Store error info in state for potential display
    this.setState({
      errorInfo
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      try {
        this.props.onError(error, errorInfo);
      } catch (handlerError) {
        console.error('[ErrorBoundary] Error in error handler:', handlerError);
      }
    }

    // Optional: Send error to error reporting service
    // logErrorToService(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Use custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
          <div className="max-w-2xl w-full bg-gray-800 rounded-xl border border-red-500/30 p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white mb-1">
                  Something went wrong
                </h1>
                <p className="text-gray-400">
                  An unexpected error occurred. Please try refreshing the page.
                </p>
              </div>
            </div>

            {/* Error Details (Development Only) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mt-6 bg-gray-900 rounded-lg p-4 border border-gray-700">
                <summary className="cursor-pointer text-sm font-semibold text-red-400 hover:text-red-300 select-none mb-3">
                  Error Details (Development Only)
                </summary>
                <div className="space-y-3 text-xs">
                  <div>
                    <strong className="text-gray-400">Error Message:</strong>
                    <p className="mt-1 text-red-300 font-mono bg-gray-950 p-2 rounded">
                      {this.state.error.toString()}
                    </p>
                  </div>

                  {this.state.error.stack && (
                    <div>
                      <strong className="text-gray-400">Stack Trace:</strong>
                      <pre className="mt-1 text-gray-300 font-mono bg-gray-950 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                        {this.state.error.stack}
                      </pre>
                    </div>
                  )}

                  {this.state.errorInfo?.componentStack && (
                    <div>
                      <strong className="text-gray-400">Component Stack:</strong>
                      <pre className="mt-1 text-gray-300 font-mono bg-gray-950 p-2 rounded overflow-x-auto whitespace-pre-wrap">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </details>
            )}

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={this.handleReset}
                className="px-6 py-2.5 bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-teal-500"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
              >
                Refresh Page
              </button>
              <button
                onClick={() => {
                  window.location.href = '/';
                }}
                className="px-6 py-2.5 bg-gray-800 hover:bg-gray-750 text-gray-300 font-medium rounded-lg border border-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500"
              >
                Go to Home
              </button>
            </div>

            {/* Support Link */}
            <p className="mt-6 text-sm text-gray-500 text-center">
              If this problem persists, please{' '}
              <a
                href="https://github.com/your-repo/issues"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-400 hover:text-teal-300 underline"
              >
                report an issue
              </a>
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Default error fallback component
 */
export const DefaultErrorFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-900">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-red-400 mb-4">Oops!</h1>
      <p className="text-gray-400">Something went wrong. Please try again.</p>
    </div>
  </div>
);

/**
 * HOC to wrap components with ErrorBoundary
 *
 * @example
 * const SafeComponent = withErrorBoundary(MyComponent);
 */
export function withErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode
): React.ComponentType<P> {
  const WithErrorBoundaryWrapper = (props: P) => (
    <ErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryWrapper.displayName = `withErrorBoundary(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return WithErrorBoundaryWrapper;
}

/**
 * Hook for handling errors in functional components
 *
 * @example
 * function MyComponent() {
 *   const { handleError, error } = useErrorHandler();
 *
 *   const handleClick = () => {
 *     try {
 *       // risky operation
 *     } catch (err) {
 *       handleError(err);
 *     }
 *   };
 *
 *   if (error) throw error;
 *
 *   return <button onClick={handleClick}>Click me</button>;
 * }
 */
export function useErrorHandler(): {
  handleError: (error: unknown) => void;
  error: Error | null;
  resetError: () => void;
} {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: unknown) => {
    if (error instanceof Error) {
      setError(error);
    } else {
      setError(new Error(String(error)));
    }
  }, []);

  const resetError = React.useCallback(() => {
    setError(null);
  }, []);

  // Rethrow error to be caught by ErrorBoundary
  if (error) {
    throw error;
  }

  return { handleError, error: null, resetError };
}

export default ErrorBoundary;
