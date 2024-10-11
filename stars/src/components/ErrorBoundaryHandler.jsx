import React from 'react';
import {ErrorBoundary} from 'react-error-boundary';
import './styles.css';

function ErrorFallback({error}) {
    return (
      <div className="error-boundary">
        <p className="error-boundary__title">
            Что-то пошло не так...
            <div className="error-boundary__error">
                {error.message}
            </div>
        </p>
      </div>
    );
}

export const ErrorBoundaryHandler = ({children}) => {
    return <ErrorBoundary FallbackComponent={ErrorFallback}>
        {children}
    </ErrorBoundary>
}