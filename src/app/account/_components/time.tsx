'use client';

import { useEffect, useState } from 'react';

export default function TimeNow() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const update = () => setNow(new Date());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!now) return null;

  const time = now.toLocaleTimeString('mn-MN', { hour12: false });
  const fullDate = now.toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const mongolianWeekdays = [
    'Ням', // Sunday
    'Даваа', // Monday
    'Мягмар', // Tuesday
    'Лхагва', // Wednesday
    'Пүрэв', // Thursday
    'Баасан', // Friday
    'Бямба', // Saturday
  ];

  const weekday = mongolianWeekdays[now.getDay()];

  return (
    <div className="px-4 py-1.5 bg-background text-primary text-lg font-semibold font-mono select-none">
      {fullDate} — {time} {weekday}
    </div>
  );
}
