import React, { useState, useEffect, useRef } from 'react';
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
import CircularProgress from '@mui/material/CircularProgress';

import useEpisodesContext from '../../hooks/useEpisodesContext';
import CardInfo from './CardInfo';
import ControlButtons from './ControlButtons';
import AudioSlider from './AudioSlider';
import Volume from './Volume';

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
  const [isMetadataLoaded, setIsMetadataLoaded] = useState(true);

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
    setIsMetadataLoaded(true);
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
        setIsMetadataLoaded(false);
        setCurrentEpisode(currentEpisode);
        setAudioSrc(currentEpisode.audio);
        setAudioType(currentEpisode.audioType);
        audioRef.current.load(); // Load the new source
      }
    }
    // eslint-disable-next-line
  }, [currentEpisodeIndex]);

  

  return (
    <Card sx={{ display: 'flex', position: 'fixed', bottom: 0, width: '100%', background: '#1A1A1A' }}>
      <audio ref={audioRef}>
        <source src={audioSrc} type={audioType}/>
        Your browser does not support the audio element.
      </audio>
      <Grid container spacing={0}>
        <CardInfo currentEpisode={currentEpisode} />
        <Grid item xs={6} sm={5} md={8} lg={8} xl={9} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3} sx={{ mx: 2 }}>
              <ControlButtons
                paused={paused}
                isMetadataLoaded={isMetadataLoaded}
                onShuffleEpisodes={handleShuffleEpisodes}
                onSkipBack={handleSkipBack}
                onPlayPause={handlePlayPause}
                onSkipForward={handleSkipForward}
                onRestart={handleRestart}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={6} xl={6}>
              <AudioSlider
                position={position}
                duration={duration}
                onSliderChange={handleSliderChange}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={2} xl={3}>
              <Volume
                volume={volume}
                onVolumeChange={handleVolumeChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid> 
    </Card>
  )
}

export default AudioPlayer;
