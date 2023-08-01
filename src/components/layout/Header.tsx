import React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

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

const Header: React.FC = () => {
  // search specific podcast by name or artist
  const handleSearchPodcasts = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("searching podcasts");
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
