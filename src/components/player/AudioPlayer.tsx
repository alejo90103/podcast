import React from 'react';
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
import StepFoward from '../icons/StepFoward';
import StepBack from '../icons/StepBack';
import Shuffle from '../icons/Shuffle';
import Reload from '../icons/Reload';

const AudioPlayer = () => {
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(32);
  const [paused, setPaused] = React.useState(false);

  function formatDuration(value: number) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  const TinyText = styled(Typography)({
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: 0.2,
    color: '#fff',
  })

  return (
    <Card sx={{ display: 'flex', position: 'fixed', bottom: 0, width: '100%', background: '#1A1A1A' }}>
      <Grid container spacing={0}>
        <Grid item xs={3} sm={3} md={1} lg={1} xl={1} sx={{ minWidth: 110 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <img 
              style={{ width: 110, height: '100%', objectFit: 'cover' }}
              src="https://s3-alpha-sig.figma.com/img/a37e/2416/f4eeac5ad44b44d03da4b6aa60f8d3c5?Expires=1691971200&Signature=XLvGpBZPyVexZ6nS6Rdb~UVZsuOSh-3NrDDbMJY6BCqFS8q81RtjNxNKjT3JvIhYS1yQbYKRiKFV0Ov12iuQ978AcTEUUT7k9PmoksFCdgEu1Kvye1P4e-g7ZVa4iQA9c2yX2eDcu0pnU-tMjDmxLY2rOfLeS4jDUlPdWCWpMpCXAQJHxQ--H5PlVqHu0KLC6tJmXjb8gAO8cVZNSQr4Z0pjXH5kHI~PZJRg20ismZcUiEgbv80BjlgmZEbo3S01ttRIY7jO14N8K5JoPuj94czVKtWYY7v4NYU0acAuxLOOXzNdSB0USLmgTdtgRhTbiZ9xrNn2uWnFF9EeXaBNgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
              alt="Live from space album cover"
            />
          </Box>
        </Grid>
        <Grid item xs={3} sm={3} md={2} lg={2} xl={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Typography component="div" sx={{ fontSize: 14, color: '#fff' }}>
                How to make your patner talk more
              </Typography>
              <Typography sx={{ fontSize: 14, color: 'rgba(255, 255, 255, 0.30)', }} color="text.secondary" component="div">
                Mac Miller
              </Typography>
            </CardContent>
          </Box>
        </Grid>
        <Grid item xs={6} sm={5} md={8} lg={8} xl={9} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid container spacing={0} alignItems="center">
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3} sx={{ mx: 2 }}>
              <Stack spacing={1} direction="row" alignItems="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton aria-label="previous">
                  <Shuffle color={"#fff"} />
                </IconButton>
                <IconButton aria-label="previous">
                  <StepBack color={"#fff"} />
                </IconButton>
                <IconButton aria-label="play/pause">
                  <Play color={"#fff"} width="28" height="28" />
                </IconButton>
                <IconButton aria-label="next">
                  <StepFoward color={"#fff"} />
                </IconButton>
                <IconButton aria-label="previous">
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
                  onChange={(_, value) => setPosition(value as number)}
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
                  defaultValue={30}
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
