import React, { useState, useEffect } from 'react';

import { Podcast } from '../models/Podcast';
import { PODCAST_API_ALL } from '../routes/api/paths';
import Header from '../components/Header';
import useLocalStorage from "../hooks/useLocalStorage";
import { DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';

const columns: GridColDef[] = [
  {
    field: '#',
    headerName: '',
    width: 70,
  },
  {
    field: 'im:artist',
    headerName: 'Name',
    width: 130,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <p>{params.value.label}</p>
      );
    }
  },
  {
    field: 'summary',
    headerName: 'Description',
    minWidth: 150,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <p>{params.value.label}</p>
      );
    }
  },
  {
    field: '',
    headerName: 'Released',
    width: 230,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <p>An hour ago</p>
      );
    }
  },
];

const Podcasts: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[] | []>([]);
  const [originalPodcasts, setOriginalPodcasts] = useState<Podcast[] | []>([]);
  const data = useLocalStorage('listData');

  // fetch all postcast and storage in localstorage
  const getPodcasts = () => {
    fetch(PODCAST_API_ALL)
      .then((res) => res.json())
      .then((data) => {
        const podcasts = data.feed.entry;
        debugger;
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
      console.log(data.podcasts);
      
      setPodcasts(data.podcasts);
      setOriginalPodcasts(data.podcasts);
      // setLoading(false);
    } else {
      // fetch the list from the external service
      getPodcasts();
    }
  }, []);

  return (
    <>
      <Header originalPodcasts={podcasts} setPodcasts={setPodcasts} />
      <div style={{ width: '100%' }}>
        <DataGrid
          getRowId={(row) => row.id.attributes['im:id']}
          rows={podcasts}
          columns={columns}
          disableRowSelectionOnClick
          sx={{
            border: 0,
            borderColor: 'white',
            color: 'white',
          }}
        />
      </div>
    </>
  )
}

export default Podcasts;