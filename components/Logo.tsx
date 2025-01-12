"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Logo({ width = 150, height = 150 }) {
  const pathname = usePathname();
  const lang = pathname.split("/")[1];

  return (
    <Link href="/">
      <div className="flex items-center space-x-2">
        <Image
          src="/images/Logo.svg"
          alt="Tools Logo"
          width={width}
          height={height}
          className="text-blue-600"
        />
      </div>
    </Link>
  );
}
