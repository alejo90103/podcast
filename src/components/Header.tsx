import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import { Podcast } from '../models/Podcast';

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
  originalPodcasts: Podcast[];
  setPodcasts: React.Dispatch<React.SetStateAction<Podcast[]>>;
  back?: boolean
}

const Header: React.FC<PodcastCardProps> = ({ originalPodcasts, setPodcasts, back=false }) => {
  // search specific podcast by name or artist
  const handleSearchPodcasts = (e: React.ChangeEvent<HTMLInputElement>) => {
    const search = e.target.value.toLowerCase();
    const filtered = originalPodcasts.filter(e => {
      if (e["im:name"].label.toLowerCase().includes(search) || e["im:artist"].label.toLowerCase().includes(search)) {
        return e;
      }
    });
    setPodcasts(filtered);
  } 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar className="container">
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="podcast"
              sx={{ width: '100%' }}
              inputProps={{ 'aria-label': 'podcast' }}
              onChange={handleSearchPodcasts}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
