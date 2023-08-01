import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import { publicRoutes } from "./routes/app/routes";
import Layout from './components/layout/Layout';

const App: React.FC = () => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default App;
