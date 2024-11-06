import { React, useEffect, useState } from "react";

export default function Calendar() {
  const [state, setState] = useState({
    firstDay: 1,
    timezone: "UTC",
  });
  if (Intl) {
    useEffect(() => {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale;
      const firstDay = (new Intl.Locale(locale)?.weekInfo?.firstDay ?? 0) + 1;
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setState({ firstDay: firstDay, timezone: timezone });
    });
  }
  return (
    <iframe
      src={`https://calendar.google.com/calendar/embed?height=500&wkst=${state.firstDay}&ctz=${state.timezone}&showTitle=0&showTz=1&showPrint=0&src=ODgwNTU3MGE0ZTFjYTIzMTk4NDI5NzFkYjQzODBlZDUxOGM0OTA1NzdjMDY0NTRhZGYyMzAzNzM0NTA2ZjM5N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%2333b679`}
      width="100%"
      height="500"
      frameborder="0"
      style={{ "margin-bottom": "2em", "margin-top": "1em" }}
    ></iframe>
  );
}
