import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@mui/material";

export default function GoogleSession() {
  return (
    <Button
      sx={{ color: "green" }}
      onClick={() => {
        signIn();
      }}
      className="w-full border bg-background text-foreground hover:bg-secondary flex justify-around"
    >
      <Image src={`/img/foogle.svg`} alt="google logo" width={20} height={20} />
      <div>Google -р нэвтрэх</div>
      <div></div>
    </Button>
  );
}
