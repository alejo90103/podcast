import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import relativeTime from 'dayjs/plugin/relativeTime';

import { Podcast } from '../models/Podcast';
import { PODCAST } from '../routes/app/paths';
import { PODCAST_API_ALL } from '../routes/api/paths';
import Header from '../components/Header';
import useLocalStorage from "../hooks/useLocalStorage";
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

dayjs.extend(relativeTime);

function columns(onRequestViewDetail = (podcast: Podcast) => {}): GridColDef[] {
  return [
    {
      field: 'im:artist',
      headerName: 'Name',
      width: 350,
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
                src={params.row['im:image'].length > 0 && params.row['im:image'][0].label}
              />
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography color="white" component="div" onClick={() => onRequestViewDetail(params.row)}>
                  {params.row['im:name'].label}
                </Typography>
                <Typography sx={{ fontSize: 14 }} component="div">
                  {params.value.label}
                </Typography>
              </CardContent>
            </Box>
          </>
        );
      }
    },
    {
      field: 'summary',
      headerName: 'Description',
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
            {params.value.label}
          </Typography>
        );
      }
    },
    {
      field: 'im:releaseDate',
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
  '& .MuiPaginationItem-root': {
    borderRadius: 0,
  },
}));

const Podcasts: React.FC = () => {
  const navigate = useNavigate();
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [originalPodcasts, setOriginalPodcasts] = useState<Podcast[]>([]);
  const data = useLocalStorage('listData');

  // fetch all postcast and storage in localstorage
  const getPodcasts = () => {
    fetch(PODCAST_API_ALL)
      .then((res) => res.json())
      .then((data) => {
        const podcasts = data.feed.entry;
        setPodcasts(podcasts);
        setOriginalPodcasts(podcasts);
        const currentDate = new Date().getTime();
        localStorage.setItem('listData', JSON.stringify({ podcasts, lastRequestDate: currentDate }));
        // setLoading(false);
      })
      .catch((error) => {
        // showBoundary(error);
      });
  }

  // check if podcast exist in storage
  useEffect(() => {
    if (data) {
      // use the list stored in the local storage
      setPodcasts(data.podcasts);
      setOriginalPodcasts(data.podcasts);
      // setLoading(false);
    } else {
      // fetch the list from the external service
      getPodcasts();      
    }
  // eslint-disable-next-line
  }, []);

  // go to podcast detail view
  const handleDetail = (podcast: Podcast) => {
    navigate(`${PODCAST}/${podcast.id.attributes["im:id"]}`, {
      state: { podcast: podcast }
    });
  }

  // search specific podcast by name or artist
  const handleSearchPodcasts = (search: string) => {
    const filtered = originalPodcasts.filter(e => {
      if (e["im:name"].label.toLowerCase().includes(search) || e["im:artist"].label.toLowerCase().includes(search)) {
        return e;
      }
    });
    setPodcasts(filtered);
  } 

  return (
    <>
      <Header onRequestSearch={handleSearchPodcasts} placehoder={"podcast"} />
      <div style={{ width: '100%' }}>
        <StyledDataGrid
          getRowId={(row) => row.id.attributes['im:id']}
          rows={podcasts}
          columns={columns(handleDetail)}
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

export default Podcasts;