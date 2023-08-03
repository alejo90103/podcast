import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Podcast } from '../models/Podcast';
import { Episode } from '../models/Episode';
import { PODCAST_API_DETAIL, CORS } from '../routes/api/paths';
import useLocalStorage from '../hooks/useLocalStorage';
import { formatTimeMillis } from '../utils/utils';
import Header from '../components/Header';

import Play from '../components/icons/Play';
import Pause from '../components/icons/Pause';
import Clock from '../components/icons/Clock';

import useEpisodesContext from '../hooks/useEpisodesContext';

dayjs.extend(relativeTime);

function columns(currentEpisode: Episode, podcast: Podcast, handlePlay: (params: GridRenderCellParams) => void): GridColDef[] {
  return [
    {
      field: '#',
      headerName: '# ',
      width: 50,
      renderCell: (params: GridRenderCellParams) => {
        return (
            (currentEpisode.guid === params.row.guid)
              ? <IconButton 
                  sx={{
                    background: '#5C67DE',
                    borderRadius: 5,
                  }}
                >
                  <Pause color={"#fff"} width="20" height="20" />
                </IconButton>
              : <IconButton onClick={(() => handlePlay(params))}>
                  <Play color={"#fff"} width="20" height="20" />
                </IconButton>
        );
      }
    },
    {
      field: 'title',
      headerName: 'Title',
      width: 300,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Avatar 
                variant="rounded"
                sx={{
                  width: 45,
                  height: 45,
                  flexShrink: 0,
                }}
                alt="Podcast Avatar"
                src={params.row.image}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography color="white" component="div">
                  {params.value}
                </Typography>
                <Typography sx={{ fontSize: 14 }} component="div">
                  {podcast['im:artist'].label}
                </Typography>
              </CardContent>
            </Box>
          </>
        );
      }
    },
    {
      field: 'description',
      headerName: 'Topic',
      minWidth: 300,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: 'normal',
              maxHeight: '2.5em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'break-spaces'
            }}
          >
            {params.value}
          </Typography>
        );
      }
    },
    {
      field: 'date',
      headerName: 'Released',
      width: 130,
      renderCell: (params: GridRenderCellParams) => {
        const date = dayjs(params.value.label);
        const diff = date.diff(dayjs(), 'day');
        var formattedDate = '';
        if (diff > -7) {
          formattedDate = date.fromNow();
        } else {
          formattedDate = date.format('D/MM/YYYY');
        }
        return (
          <p>{formattedDate}</p>
        );
      }
    },
    {
      field: 'duration',
      headerName: 'Duration',
      width: 130,
      renderHeader: () => <Clock color='white' />,
      // renderCell: (params: GridRenderCellParams) => {
        
      // }
    },
  ];
};

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  border: 0,
  color: 'rgba(255, 255, 255, 0.30)',
  fontSize: 14,
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  WebkitFontSmoothing: 'auto',
  // letterSpacing: 'normal',
  '& .MuiDataGrid-iconSeparator': {
    display: 'none',
  },
  '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
    borderColor: `1px solid #ffffff08`,
  },
  '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
    borderBottom: `1px solid #ffffff08`,
  },
  '& .MuiDataGrid-cell': {
    color: 'rgba(255, 255, 255, 0.30)',
  },
  '& .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}));

const PodcastDetail: React.FC = () => {
  const location = useLocation();
  const context = useEpisodesContext();
  const setEpisodesContext = context?.setEpisodesContext ?? (() => {});
  const setCurrentEpisodeIndex = context?.setCurrentEpisodeIndex ?? (() => {});
  const setCurrentEpisode = context?.setCurrentEpisode ?? (() => {});
  const currentEpisode = context?.currentEpisode ?? {
    title: '',
    date: '',
    duration: '',
    description: '',
    guid: '',
    audio: '',
    audioType: '',
    image: '',
    author: ''
  };
  const [podcast, setPodcast] = useState<Podcast>({
    'id': { attributes: { 'im:id': '' } },
    'im:image': [],
    'im:name': { label: '' },
    'im:artist': { label: '' },
    'summary': { label: '' },
  });
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [originalEpisodes, setOriginalEpisodes] = useState<Episode[]>([]);
  const data = useLocalStorage(`data${location.state.podcast.id.attributes["im:id"]}`);

  // fetch postcast detail and storage in localstorage
  const getPodcastDetail = (podcastId: string, author: string) => {
    const url = `${PODCAST_API_DETAIL}${podcastId}&media=podcast&entity=podcastEpisode&limit=20`;
    fetch(`${CORS}${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((data) => {
        const episodes: Episode[] = data.results
          .filter((p : any) => p.wrapperType === "podcastEpisode")
          .map((e: any) => {
            return {
              title: e.trackName,
              date: e.releaseDate,
              duration: formatTimeMillis(e.trackTimeMillis),
              description: e.description,
              guid: e.episodeGuid,
              audio: e.episodeUrl,
              audioType: `${e.episodeContentType}/${e.episodeFileExtension}`,
              image: e.artworkUrl60,
              author
            }
          });
        setEpisodesContext(episodes);
        setEpisodes(episodes);
        setOriginalEpisodes(episodes);
        localStorage.setItem(`data${podcastId}`, JSON.stringify({ episodes, lastRequestDate: new Date().getTime() }));
        // setLoading(false);
      })
      .catch((error) => { 
        // showBoundary(error); 
      });
  }

   useEffect(() => {
    if (location.state.podcast) {
      const podcast = location.state.podcast as Podcast;
      setPodcast(podcast);
  
      // if has storage data
      if (data) {
        // Use the list stored in the local storage
        setEpisodesContext(data.episodes);
        setEpisodes(data.episodes);
        setOriginalEpisodes(data.episodes);        
        // setLoading(false);
      } else {
        // Fetch the list from the external service again
        setTimeout(() => {
          getPodcastDetail(podcast.id.attributes["im:id"], podcast['im:name'].label);
        }, 1000);
      }
    }
  // eslint-disable-next-line
  }, []);

  // search specific episode
  const handleSearchEpisodes = (search: string) => {
    const filtered = originalEpisodes.filter(e => {
      if (e.title.toLowerCase().includes(search)) {
        return e;
      }
    });
    setEpisodes(filtered);
  } 

  const handlePlay = (record: GridRenderCellParams) => {
    const index = episodes.findIndex((e) => e.guid === record.row.guid);
    if (index !== -1) {
      setCurrentEpisodeIndex(index);
      setCurrentEpisode(episodes[index]);
    }
  }

  return (
    <>
      <Header onRequestSearch={handleSearchEpisodes} placehoder={"episode"} back={true} />
      <div style={{ width: '100%' }}>
        <Box
          sx={{
            width: '100%',
            borderRadius: 15,
            height: 300,
            background: 'url(https://s3-alpha-sig.figma.com/img/a37e/2416/f4eeac5ad44b44d03da4b6aa60f8d3c5?Expires=1691971200&Signature=XLvGpBZPyVexZ6nS6Rdb~UVZsuOSh-3NrDDbMJY6BCqFS8q81RtjNxNKjT3JvIhYS1yQbYKRiKFV0Ov12iuQ978AcTEUUT7k9PmoksFCdgEu1Kvye1P4e-g7ZVa4iQA9c2yX2eDcu0pnU-tMjDmxLY2rOfLeS4jDUlPdWCWpMpCXAQJHxQ--H5PlVqHu0KLC6tJmXjb8gAO8cVZNSQr4Z0pjXH5kHI~PZJRg20ismZcUiEgbv80BjlgmZEbo3S01ttRIY7jO14N8K5JoPuj94czVKtWYY7v4NYU0acAuxLOOXzNdSB0USLmgTdtgRhTbiZ9xrNn2uWnFF9EeXaBNgQ__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4)',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '50% 50%',
            backgroundColor: 'lightgray',
            transform: 'rotateY(180deg)',
          }}
        />
        <Typography color="white" component="div" variant="h4" align="center" sx={{ fontWeight: 'bold' }}>
          {podcast['im:name'].label}
        </Typography>
        <StyledDataGrid
          getRowId={(row) => row.guid}
          rows={episodes}
          columns={columns(currentEpisode, podcast, handlePlay)}
          disableRowSelectionOnClick
          getRowHeight={() => 80}
          sx={{
            '& .MuiDataGrid-columnHeaders': {
              borderColor: '#ffffff08',
            }
          }}
          {...data}
        />
      </div>
    </>
  )
}

export default PodcastDetail;