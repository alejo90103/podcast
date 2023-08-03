import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';

import './App.css';
import { publicRoutes } from "./routes/app/routes";
import Layout from './components/layout/Layout';
import FallbackError from './components/layout/FallbackError';
import EpisodesContextProvider from './contexts/episodesContext';

const App: React.FC = () => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackError}
    >
      <React.Fragment>
        <EpisodesContextProvider>
          <Suspense fallback={true}>
            <Router>
              <Routes>
                {publicRoutes.map((route) => (
                  <Route 
                    key={route.id} 
                    path={route.path} 
                    element={
                      <Layout>
                        {route.component}
                      </Layout>
                    } 
                  />
                ))}
              </Routes>
            </Router>
          </Suspense>
        </EpisodesContextProvider>
      </React.Fragment>
    </ErrorBoundary>
  );
};

export default App;
