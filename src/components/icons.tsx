"use client";
import Image from "next/image";
import { useTheme } from "next-themes";
import { SVGProps, useEffect, useState } from "react";

export function DataAlphaLogo(props: SVGProps<SVGSVGElement>) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect to ensure the component is mounted before rendering
  // to avoid hydration mismatches with next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Render nothing on the server

  const logoSrc =
    resolvedTheme === "dark" ? "/da_logo_dark.png" : "/da_logo.png";

  return (
    <Image
      src={logoSrc}
      alt="DataAlpha Logo"
      height="200"
      width="200"
      {...props}
    />
  );
}
