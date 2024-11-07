import { React, useEffect, useState } from "react";
import { useColorMode } from "@docusaurus/theme-common";

export default function Calendar() {
  const [firstDay, setFirstDay] = useState(1);
  const [timezone, setTimezone] = useState("UTC");
  const [themeMode, setThemeMode] = useState("light");
  const { colorMode } = useColorMode();
  useEffect(() => {
    if (Intl) {
      const locale = Intl.DateTimeFormat().resolvedOptions().locale;
      // firstDay API returns 1 for Monday and 7 for Sunday
      // Google Calendar expects 1 for Sunday and 6 for Saturday
      let day = (new Intl.Locale(locale)?.weekInfo?.firstDay ?? 0) + 1;
      if (day === 7) day = 6; // Saturday
      if (day === 8) day = 1; // Sunday
      setFirstDay(day);
      setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
    }
    setThemeMode(colorMode);
  });
  return (
    <iframe
      src={`https://calendar.google.com/calendar/embed?height=500&wkst=${firstDay}&ctz=${timezone}&showTitle=0&showTz=1&showPrint=0&src=ODgwNTU3MGE0ZTFjYTIzMTk4NDI5NzFkYjQzODBlZDUxOGM0OTA1NzdjMDY0NTRhZGYyMzAzNzM0NTA2ZjM5N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%2333b679`}
      width="100%"
      height="500"
      style={
        themeMode === "dark"
          ? { filter: "invert(95%) brightness(95%) hue-rotate(180deg)" }
          : {}
      }
    ></iframe>
  );
}
