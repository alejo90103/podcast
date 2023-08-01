export type Podcast = {
  'id': { attributes: { 'im:id': string } };
  'im:image': { label: string }[];
  'im:name': { label: string };
  'im:artist': { label: string };
  'summary': { label: string; };
};
