'use client';
import { SessionProvider } from 'next-auth/react';
import GoogleSession from './google';

export default function Goog() {
  return (
    <SessionProvider>
      <GoogleSession />
    </SessionProvider>
  );
}
