export default function useLocalStorage(item) {
  const data = JSON.parse(localStorage.getItem(item));
  if (data && (new Date().getTime() - data.lastRequestDate) < (24 * 60 * 60 * 1000)) {
    return data;
  } else {
    return null;
  }
}