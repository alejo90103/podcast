import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyleTinyText = styled(Typography)({
  fontSize: '0.75rem',
  fontWeight: 500,
  letterSpacing: 0.2,
  color: '#fff',
});

interface TinyTextProps {
  children?: ReactNode;
}

const TinyText:React.FC<TinyTextProps> = ({ children }) => {
  return (
    <StyleTinyText>{children}</StyleTinyText>
  )
}

export default TinyText;
