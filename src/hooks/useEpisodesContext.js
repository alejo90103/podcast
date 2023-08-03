import { useContext } from 'react';
import { EpisodesContext } from '../contexts/episodesContext';

export default function useEpisodesContext() {
  return useContext(EpisodesContext);
}