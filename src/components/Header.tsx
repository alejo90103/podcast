import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Search = styled('div')(({ theme }) => ({
  borderRadius: 15,
  backgroundColor: '#1A1A1A',
  position: 'relative',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

interface PodcastCardProps {
  onRequestSearch: (search: string) => void;
  placehoder: string;
  back?: boolean
}

const Header: React.FC<PodcastCardProps> = ({ onRequestSearch, placehoder, back=false }) => {
  const navigate = useNavigate();

  // search data
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    onRequestSearch(search);
  } 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ boxShadow: 'none' }} className="container">
        <Toolbar className="container">
          {
            back &&
            <IconButton
              sx={{
                background: '#1A1A1A',
                borderRadius: 5,
                marginRight: 2
              }}
              onClick={() => navigate(-1)}
            >
              <ArrowBackIosIcon sx={{ color: 'white', marginLeft: 1 }} />
            </IconButton>
          }
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder={placehoder}
              sx={{ width: '100%' }}
              inputProps={{ 'aria-label': placehoder }}
              onChange={handleSearch}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
