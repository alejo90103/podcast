import React from 'react';
import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: 'rgba(255, 255, 255, 0.30)',
  fontSize: 14,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  // letterSpacing: 'normal',
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderColor: `1px solid #ffffff08`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid #ffffff08`,
  },
  '& .MuiDataGrid-cell': {
    color: 'rgba(255, 255, 255, 0.30)',
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}));