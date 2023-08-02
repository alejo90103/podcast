export const formatTimeMillis = (trackTimeMillis) => {
  const hours = Math.floor(trackTimeMillis / 3600000); // 1 hour = 3600000 milliseconds
  const minutes = Math.floor((trackTimeMillis % 3600000) / 60000); // 1 minute = 60000 milliseconds
  // format hours and minutes
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}