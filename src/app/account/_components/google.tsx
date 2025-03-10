import { Button } from "@/components/ui/button";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";

export default function GoogleSession() {
  return (
    <Button
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
