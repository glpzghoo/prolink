import { Button } from "@mui/material";
import Link from "next/link";

export default function NavigationSettings() {
  return (
    <>
      <Link href={`/account/settings/skills`}>
        <Button sx={{ color: `green` }}>Профайл</Button>
      </Link>

      <Link href={`/account/settings/about`}>
        <Button sx={{ color: `green` }}>Тухай</Button>
      </Link>
      <Link href={`/account/settings`}>
        <Button sx={{ color: `green` }}>Аккаунтны тохиргоо</Button>
      </Link>
    </>
  );
}
