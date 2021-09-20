export const SHOW_TRACK = "SHOW_TRACK";
export const CHANGE_TRACK = "CHANGE_TRACK";

export function showTrack() {
  return {
    type: SHOW_TRACK,
  };
}

export function changeTrack(track) {
  return {
    type: CHANGE_TRACK,
    track,
  };
}
