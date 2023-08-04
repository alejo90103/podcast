import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import 'typeface-quicksand';

import './App.css';
import { publicRoutes } from "./routes/app/routes";
import Layout from './components/layout/Layout';
import FallbackError from './components/layout/FallbackError';
import EpisodesContextProvider from './contexts/episodesContext';

const theme = createTheme({
  typography: {
    fontFamily: [
      "Quicksand",
    ].join(",")
  }
});

const App: React.FC = () => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackError}
    >
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
