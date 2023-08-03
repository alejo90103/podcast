import React from 'react'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

import Play from '../icons/Play';
import Pause from '../icons/Pause';
import StepFoward from '../icons/StepFoward';
import StepBack from '../icons/StepBack';
import Shuffle from '../icons/Shuffle';
import Reload from '../icons/Reload';

interface ControlButtonsProps {
  paused: boolean;
  isMetadataLoaded: boolean;
  onShuffleEpisodes: () => void;
  onSkipBack: () => void;
  onPlayPause: () => void;
  onSkipForward: () => void;
  onRestart: () => void;
}

const ControlButtons:React.FC<ControlButtonsProps> = ({
  paused,
  isMetadataLoaded,
  onShuffleEpisodes,
  onSkipBack,
  onPlayPause,
  onSkipForward,
  onRestart,
}) => {
  return (
    <Stack spacing={1} direction="row" alignItems="center" sx={{ display: 'flex', justifyContent: 'center' }}>
      <IconButton aria-label="shuffle" onClick={onShuffleEpisodes}>
        <Shuffle color={"#fff"} />
      </IconButton>
      <IconButton aria-label="previous" onClick={onSkipBack}>
        <StepBack color={"#fff"} />
      </IconButton>
      {
        !isMetadataLoaded
        ? <CircularProgress />
        :
          <IconButton aria-label="play/pause" onClick={onPlayPause}>
            { paused 
              ? <Play color={"#fff"} width="28" height="28" />
              : <IconButton 
                  sx={{
                    background: '#5C67DE',
                    borderRadius: 5,
                  }}
                >
                  <Pause color={"#fff"} width="20" height="20" />
                </IconButton> }
          </IconButton>
      }
      <IconButton aria-label="next" onClick={onSkipForward}>
        <StepFoward color={"#fff"} />
      </IconButton>
      <IconButton aria-label="reload" onClick={onRestart}>
        <Reload color={"#fff"} />
      </IconButton>
    </Stack>
  )
}

export default ControlButtons;