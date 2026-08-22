import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

type BrandLogoProps = {
  variant?: "default" | "white";
  priority?: boolean;
  className?: string;
};

export function BrandLogo({
  variant = "default",
  priority = false,
  className,
}: BrandLogoProps) {
  const isWhite = variant === "white";

  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      aria-label="S V Healthcare home"
    >
      <Image
        src={
          isWhite
            ? "/images/brand/sv-healthcare-logo-white.webp"
            : "/images/brand/sv-healthcare-logo.webp"
        }
        alt="S V Healthcare"
        width={isWhite ? 165 : 159}
        height={isWhite ? 65 : 60}
        priority={priority}
        style={{
          width: isWhite ? 165 : 159,
          height: "auto",
        }}
      />
    </Link>
  );
}
