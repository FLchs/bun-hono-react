export function LocalizedDate({ date }: { date: string }) {
  return (
    <>
      {new Date(date).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "UTC",
      })}
    </>
  );
}
