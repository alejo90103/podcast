import {
  HOME,
  PODCAST_DETAIL,
} from './paths';

// PODCASTS
import Podcasts from '../../views/Podcasts';
import PodcastDetail from '../../views/PodcastDetail';

export const publicRoutes = [
  { id: 1, path: HOME, component: <Podcasts /> },
  { id: 2, path: PODCAST_DETAIL, component: <PodcastDetail /> },
]