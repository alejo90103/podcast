import React from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';

import TinyText from './TinyText';

interface AudioSliderProps {
  position: number;
  duration: number;
  onSliderChange: (_: Event, value: number | number[]) => void;
}

const AudioSlider:React.FC<AudioSliderProps> = ({ position, duration, onSliderChange }) => {
  
  // Function to format duration
  const formatDuration = (value: number) => {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  return (
    <Stack spacing={1} direction="row" sx={{ px: 1 }} alignItems="center">
      <TinyText>{formatDuration(position)}</TinyText>
      <Slider
        aria-label="time-indicator"
        size="small"
        value={position}
        min={0}
        step={1}
        max={duration}
        // onChange={(_, value) => setPosition(value as number)}
        onChange={onSliderChange}
        sx={{
          height: 4,
          color: '#fff',
          '& .MuiSlider-track': {
            border: 'none',
          },
          '& .MuiSlider-thumb': {
            width: 4,
            height: 4,
            '&:before': {
              boxShadow: '0 4px 8px rgba(0,0,0,0.4)',
            },
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              boxShadow: 'none',
            },
          },
          '& .MuiSlider-rail': {
            opacity: 0.28,
          },
        }}
      />
      <TinyText>-{formatDuration(duration - position)}</TinyText>
    </Stack>
  )
}

export default AudioSlider;
