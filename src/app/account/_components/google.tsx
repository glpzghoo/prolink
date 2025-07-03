'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '@mui/material';

export default function GoogleSession() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <Button
          onClick={() => {
            signOut();
          }}
          sx={{ color: 'green' }}
          className="w-full border bg-background text-foreground gap-2 hover:bg-secondary flex justify-around"
        >
          {/* <Image
            src={`/img/foogle.svg`}
            alt="google logo"
            width={20}
            height={20}
          /> */}
          <div>{session.user?.name}</div>
        </Button>
      ) : (
        <Button
          sx={{ color: 'green' }}
          onClick={() => {
            signIn('google');
          }}
          className="w-full border bg-background text-foreground gap-2 hover:bg-secondary flex justify-around"
        >
          {/* <Image
            src={`/img/foogle.svg`}
            alt="google logo"
            width={20}
            height={20}
          /> */}
          <div>Google -р нэвтрэх</div>
        </Button>
      )}
    </>
  );
}
