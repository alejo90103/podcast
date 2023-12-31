import React, { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import PropTypes, { InferProps } from 'prop-types';

import AudioPlayer from '../player/AudioPlayer';

type LayoutProps = {
  children?: ReactNode;
};

const Layout: React.FC<LayoutProps> = (props: InferProps<LayoutProps>) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ mb: 4 }} className="bgColor">
        <Box className="bgColor">
          {props.children}
        </Box>
      </Container>
      <AudioPlayer />
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