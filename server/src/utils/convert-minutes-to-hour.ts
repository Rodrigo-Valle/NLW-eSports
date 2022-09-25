export function convertMinutesToHour(minutesTotal: number) {
  const hour = Math.floor(minutesTotal / 60);
  const minutes = minutesTotal % 60;

  return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}
