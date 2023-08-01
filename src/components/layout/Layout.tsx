import React, { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PropTypes, { InferProps } from 'prop-types';

import Header from '../Header';

type LayoutProps = {
  children?: ReactNode;
};

const Layout: React.FC<LayoutProps> = (props: InferProps<LayoutProps>) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} className="container">
          {props.children}
        </Box>
      </Container>
    </React.Fragment>
  );
};

Layout.defaultProps = {
  children: null,
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;