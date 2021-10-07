export function setTrackHistoryInLocalStorage(dataTrack) {
  let existingHistoryQueue = JSON.parse(localStorage.getItem("trackHistory"));

  if (existingHistoryQueue === null) {
    existingHistoryQueue = [];
  }

  existingHistoryQueue.push(dataTrack);

  localStorage.setItem("trackHistory", JSON.stringify(existingHistoryQueue));

  return existingHistoryQueue.length;
}
