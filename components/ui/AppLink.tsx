import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

export function isInternalHref(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}

type AppLinkProps = ComponentPropsWithoutRef<"a"> & {
  href: string;
};

/** Soft client navigation for in-app routes; plain anchor for external/tel/mail. */
export function AppLink({ href, ...props }: AppLinkProps) {
  if (isInternalHref(href)) {
    return <Link href={href} {...props} />;
  }

  return <a href={href} {...props} />;
}
