import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { AppLink, isInternalHref } from "@/components/ui/AppLink";
import { cn } from "@/lib/cn";

type ButtonVariant = "primary" | "outline" | "ghost";

const holographicButtonBaseClassName =
  "holographic-btn inline-flex min-h-13 items-center justify-center gap-2.5 rounded-xl border px-5.5 text-sm font-extrabold transition duration-200";

const variants: Record<ButtonVariant, string> = {
  primary:
    "border-transparent bg-brand !text-white shadow-[0_12px_30px_rgba(36,144,235,0.25)] hover:-translate-y-0.5 hover:bg-brand-dark",
  outline:
    "border-line bg-white !text-ink hover:-translate-y-0.5 hover:border-brand hover:!text-brand",
  ghost:
    "border-white/40 bg-white/10 !text-white backdrop-blur-sm hover:-translate-y-0.5 hover:border-white hover:bg-white/15",
};

export const holographicButtonClassName = cn(
  holographicButtonBaseClassName,
  variants.primary,
);

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> & {
  href: string;
  variant?: ButtonVariant;
  children?: ReactNode;
};

export function ButtonLink({
  className,
  variant = "primary",
  href,
  children,
  ...props
}: ButtonLinkProps) {
  const classes = cn(
    holographicButtonBaseClassName,
    variants[variant],
    className,
  );

  const content = (
    <span className="holographic-btn__label">{children}</span>
  );

  if (isInternalHref(href)) {
    return (
      <AppLink href={href} className={classes} {...props}>
        {content}
      </AppLink>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}
