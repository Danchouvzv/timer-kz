import { TimeState } from '../types';

export const getKazakhstanTime = (): TimeState => {
  // Kazakhstan uses UTC+5 (Unified Time Zone)
  // 'Asia/Almaty' reflects the correct offsets including the recent changes in 2024 if the browser IANA db is up to date,
  // but we can also force the calculation to ensure accuracy.
  
  const now = new Date();
  
  // Create a formatter for Kazakhstan time (UTC+5)
  // We use Asia/Almaty or Asia/Qyzylorda as the canonical zone for the unified time.
  const timeFormatter = new Intl.DateTimeFormat('ru-KZ', {
    timeZone: 'Asia/Almaty',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const dateFormatter = new Intl.DateTimeFormat('ru-KZ', {
    timeZone: 'Asia/Almaty',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const parts = timeFormatter.formatToParts(now);
  const getPart = (type: Intl.DateTimeFormatPartTypes) => parts.find(p => p.type === type)?.value || '00';

  return {
    hours: getPart('hour'),
    minutes: getPart('minute'),
    seconds: getPart('second'),
    date: dateFormatter.format(now),
  };
};