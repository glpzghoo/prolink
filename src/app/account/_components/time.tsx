'use client';

import { useEffect, useState } from 'react';

const TimeNow = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const time = date.toLocaleTimeString('mn-MN', { hour12: false });
  const fullDate = date.toLocaleDateString('mn-MN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const mongolianWeekdays = ['Ням', 'Даваа', 'Мягмар', 'Лхагва', 'Пүрэв', 'Баасан', 'Бямба'];
  const weekday = mongolianWeekdays[date.getDay()];

  return (
    <div className="px-4 py-1.5 bg-background text-primary text-lg font-semibold shadow-sm font-mono select-none">
      {fullDate} — {time} {weekday}
    </div>
  );
};

export default TimeNow;
