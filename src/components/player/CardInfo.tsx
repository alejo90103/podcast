import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { Episode } from '../../models/Episode';

interface CardInfoProps {
  currentEpisode?: Episode | null;
}

const CardInfo:React.FC<CardInfoProps> = ({ currentEpisode }) => {
  return (
    <>
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
    </>
  )
}

export default CardInfo;
