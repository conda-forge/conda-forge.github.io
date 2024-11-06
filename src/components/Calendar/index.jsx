import { React, useEffect, useState } from "react";
import { useColorMode } from '@docusaurus/theme-common';

export default function Calendar() {
  const [firstDay, setFirstDay] = useState(1);
  const [timezone, setTimezone] = useState("UTC");
  if (Intl) {
    useEffect(() => {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale;
      setFirstDay((new Intl.Locale(locale)?.weekInfo?.firstDay ?? 0) + 1);
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    });
  }
  const { colorMode } = useColorMode();
  return (
    <iframe
      src={`https://calendar.google.com/calendar/embed?height=500&wkst=${firstDay}&ctz=${timezone}&showTitle=0&showTz=1&showPrint=0&src=ODgwNTU3MGE0ZTFjYTIzMTk4NDI5NzFkYjQzODBlZDUxOGM0OTA1NzdjMDY0NTRhZGYyMzAzNzM0NTA2ZjM5N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%2333b679`}
      width="100%"
      height="500"
      style={ colorMode === "dark" ? {filter: "invert(100%) hue-rotate(180deg)"} : {}}
    ></iframe>
  );
}
