import React from 'react'
import Slider from '@mui/material/Slider';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import Stack from '@mui/material/Stack';

interface VolumeProps {
  volume: number;
  onVolumeChange: (_: Event, value: number | number[]) => void;
}

const Volume:React.FC<VolumeProps> = ({ volume, onVolumeChange }) => {
  return (
    <Stack spacing={1} direction="row" sx={{ px: .5 }} justifyContent="flex-end" alignItems="center">
      <VolumeDownRounded htmlColor={"#fff"} />
      <Slider
        aria-label="Volume"
        value={volume}
        min={0}
        step={0.01}
        max={1}
        onChange={onVolumeChange}
        sx={{
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
      <VolumeUpRounded htmlColor={"#fff"} />
    </Stack>
  )
}

export default Volume;
