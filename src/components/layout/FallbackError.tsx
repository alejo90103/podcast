import React from 'react';

interface FallbackComponentProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const FallbackComponent: React.FC<FallbackComponentProps> = ({
  error,
  resetErrorBoundary
}) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};

export default FallbackComponent;