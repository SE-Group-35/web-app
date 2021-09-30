export function toTimestamp(strDate) {
  const dt = new Date(strDate);
  return dt;
}

export function fromTimestamp(timestamp) {
  const readable = new Date(timestamp * 1000).toLocaleString();
  const [dateNew, time] = readable.split(",");
  return { dateNew, time };
}
