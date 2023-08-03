import React, { useState, useEffect, useRef } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import Stack from '@mui/material/Stack';

import Play from '../icons/Play';
import Pause from '../icons/Pause';
import StepFoward from '../icons/StepFoward';
import StepBack from '../icons/StepBack';
import Shuffle from '../icons/Shuffle';
import Reload from '../icons/Reload';

import { Episode } from '../../models/Episode';
import useEpisodesContext from '../../hooks/useEpisodesContext';

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const context = useEpisodesContext();
  const episodesContext = context?.episodesContext ?? [];
  const currentEpisodeIndex = context?.currentEpisodeIndex ?? 0;
  const setCurrentEpisodeIndex = context?.setCurrentEpisodeIndex ?? (() => {});
  const currentEpisode = context?.currentEpisode ?? null;
  const setCurrentEpisode = context?.setCurrentEpisode ?? (() => {});
  
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [paused, setPaused] = useState(true);
  const [audioSrc, setAudioSrc] = useState('');
  const [audioType, setAudioType] = useState('');

  // Function to format duration
  const formatDuration = (value: number) => {
    const minute = Math.floor(value / 60);
    const secondLeft = Math.floor(value - minute * 60);
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  // Function to shuffle episode
  const handleShuffleEpisodes = () => {
    const randomIndex = Math.floor(Math.random() * episodesContext.length);
    setCurrentEpisodeIndex(randomIndex);
  };

  // Function to handle restart button click
  const handleRestart = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      setPosition(0);
      if (!audioRef.current.paused) {
        audioRef.current.play();
      }
    }
  };

  // Function to handle play/pause button click
  const handlePlayPause = () => {
    if (audioRef.current?.paused) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Playback has started
            setPaused(false);
          })
          .catch(error => {
            // Failed to play audio
            console.error('Error playing audio:', error);
          });
      }
    } else {
      audioRef.current?.pause();
      setPaused(true);
    }
  };

  // Function to handle skip foward button click
  const handleSkipForward = () => {
    if (currentEpisodeIndex < (episodesContext.length - 1) ) {
       setCurrentEpisodeIndex((prevIndex) => (prevIndex + 1));
    }
  };

  // Function to handle skip back button click
  const handleSkipBack = () => {
    if (currentEpisodeIndex - 1 >= 0) {
       setCurrentEpisodeIndex((prevIndex) => (prevIndex - 1));
    }
  };

  // Function to update position when audio is playing
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setPosition(audioRef.current.currentTime);
    }
  };

  // Function to handle slider position change
  const handleSliderChange = (_: Event, value: number | number[]) => {
    const newPosition = Array.isArray(value) ? value[0] : value;
    if (audioRef.current) {
      audioRef.current.currentTime = newPosition;
      setPosition(newPosition);
    }
  };

  // Function to handle volume change
  const handleVolumeChange = (_: Event, value: number | number[]) => {
    const newVolume = Array.isArray(value) ? value[0] : value;
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  // Function to handle duration update when metadata is loaded
  const handleMetadataLoaded = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      handlePlayPause();
    }
  };

  useEffect(() => {
    const currentAudio = audioRef.current;
    if (currentAudio) {
      currentAudio.addEventListener('timeupdate', handleTimeUpdate);
      currentAudio.addEventListener('loadedmetadata', handleMetadataLoaded);
    }
    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener('timeupdate', handleTimeUpdate);
        currentAudio.removeEventListener('loadedmetadata', handleMetadataLoaded);
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (episodesContext.length > 0) {
        const currentEpisode = episodesContext[currentEpisodeIndex];
        setCurrentEpisode(currentEpisode);
        setAudioSrc(currentEpisode.audio);
        setAudioType(currentEpisode.audioType);
        audioRef.current.load(); // Load the new source
      }
    }
    // eslint-disable-next-line
  }, [currentEpisodeIndex]);

  const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: 0.2,
    color: '#fff',
  })

  return (
    <Card sx={{ display: 'flex', position: 'fixed', bottom: 0, width: '100%', background: '#1A1A1A' }}>
      <audio ref={audioRef}>
        <source src={audioSrc} type={audioType}/>
        Your browser does not support the audio element.
      </audio>
      <Grid container spacing={0}>
        <Grid item xs={3} sm={3} md={1} lg={1} xl={1} sx={{ minWidth: 110 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <img 
              style={{ width: 110, height: '100%', objectFit: 'cover' }}
              src={currentEpisode?.image ? currentEpisode.image : "https://s3-alpha-sig.figma.com/img/a37e/2416/f4eeac5ad44b44d03da4b6aa60f8d3c5?Expires=1691971200&Signature=XLvGpBZPyVexZ6nS6Rdb~UVZsuOSh-3NrDDbMJY6BCqFS8q81RtjNxNKjT3JvIhYS1yQbYKRiKFV0Ov12iuQ978AcTEUUT7k9PmoksFCdgEu1Kvye1P4e-g7ZVa4iQA9c2yX2eDcu0pnU-tMjDmxLY2rOfLeS4jDUlPdWCWpMpCXAQJHxQ--H5PlVqHu0KLC6tJmXjb8gAO8cVZNSQr4Z0pjXH5kHI~PZJRg20ismZcUiEgbv80BjlgmZEbo3S01ttRIY7jO14N8K5JoPuj94czVKtWYY7v4NYU0acAuxLOOXzNdSB0USLmgTdtgRhTbiZ9xrNn2uWnFF9EeXaBNgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"}
              alt="Album Cover"
            />
          </Box>
        </Grid>
        <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <CardContent sx={{ justifyContent: 'center', display: 'flex', flexDirection: 'column' }}>
              <Typography component="div" sx={{ fontSize: 14, color: '#fff' }}>
                {currentEpisode?.title ? currentEpisode.title : 'Título'}
              </Typography>
              <Typography sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.30)', }} color="text.secondary" component="div">
                {currentEpisode?.author ? currentEpisode.author : 'Author'}
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid item xs={6} sm={5} md={8} lg={8} xl={9} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3} sx={{ mx: 2 }}>
              <Stack spacing={1} direction="row" alignItems="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton aria-label="shuffle" onClick={handleShuffleEpisodes}>
                  <Shuffle color={"#fff"} />
                </IconButton>
                <IconButton aria-label="previous" onClick={handleSkipBack}>
                  <StepBack color={"#fff"} />
                </IconButton>
                <IconButton aria-label="play/pause" onClick={handlePlayPause}>
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
                <IconButton aria-label="next" onClick={handleSkipForward}>
                  <StepFoward color={"#fff"} />
                </IconButton>
                <IconButton aria-label="reload" onClick={handleRestart}>
                  <Reload color={"#fff"} />
                </IconButton>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={6} xl={6}>
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
                  onChange={handleSliderChange}
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
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={2} xl={3}>
              <Stack spacing={1} direction="row" sx={{ px: .5 }} justifyContent="flex-end" alignItems="center">
                <VolumeDownRounded htmlColor={"#fff"} />
                <Slider
                  aria-label="Volume"
                  value={volume}
                  min={0}
                  step={0.01}
                  max={1}
                  onChange={handleVolumeChange}
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
            </Grid>
          </Grid>
        </Grid>
      </Grid> 
    </Card>
  )
}

export default AudioPlayer;
