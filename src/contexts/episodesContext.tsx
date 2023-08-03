import React, { createContext, useState, useMemo, ReactNode } from 'react';

import { Episode } from '../models/Episode';

type EpisodesContextType = {
  episodesContext: Episode[];
  setEpisodesContext: React.Dispatch<React.SetStateAction<Episode[]>>;
  currentEpisodeIndex: number;
  setCurrentEpisodeIndex: React.Dispatch<React.SetStateAction<number>>;
  currentEpisode: Episode;
  setCurrentEpisode: React.Dispatch<React.SetStateAction<Episode>>;
};

export const EpisodesContext = createContext<EpisodesContextType | undefined>(undefined);

type EpisodesContextProviderProps = {
  children: ReactNode;
  
};

const EpisodesContextProvider: React.FC<EpisodesContextProviderProps> = ({ children }) => {
  const [episodesContext, setEpisodesContext] = useState<Episode[]>([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState<number>(-1);
  const [currentEpisode, setCurrentEpisode] = useState<Episode>({
    title: '',
    date: '',
    duration: '',
    description: '',
    guid: '',
    audio: '',
    audioType: '',
    image: '',
    author: ''
  });

  const value = useMemo(() => ({
    episodesContext,
    setEpisodesContext,
    currentEpisodeIndex,
    setCurrentEpisodeIndex,
    currentEpisode,
    setCurrentEpisode
  }), [episodesContext, setEpisodesContext, currentEpisodeIndex, setCurrentEpisodeIndex, currentEpisode, setCurrentEpisode]);

  return (
    <EpisodesContext.Provider value={value}>
      {children}
    </EpisodesContext.Provider>
  );
};

export default EpisodesContextProvider;