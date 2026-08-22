"use client";

import {
  ChevronDown,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/SocialIcons";
import { AppLink } from "@/components/ui/AppLink";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { BLOG_SLUGS } from "@/lib/blog-slugs";
import { cn } from "@/lib/cn";
import { SITE_CONFIG } from "@/lib/site-config";

const navItems = SITE_CONFIG.navigation;
const products = SITE_CONFIG.productNavigation;
const blogSlugs = new Set<string>(BLOG_SLUGS);

function normalizePath(path: string) {
  if (!path) return "/";
  const trimmed = path.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

function isNavActive(pathname: string, href: string) {
  const current = normalizePath(pathname);
  const target = normalizePath(href);

  if (target === "/") return current === "/";
  if (target === "/blog") {
    return current === "/blog" || blogSlugs.has(current.replace(/^\//, ""));
  }
  return current === target || current.startsWith(`${target}/`);
}

function isProductsActive(pathname: string) {
  const current = normalizePath(pathname);
  if (current.startsWith("/product/")) return true;
  return products.some((item) => isNavActive(current, item.href));
}

export function Header() {
  const pathname = usePathname() ?? "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsActive = isProductsActive(pathname);

  const closeMenus = () => {
    setMenuOpen(false);
    setProductsOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenus();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="social-links" aria-label="Social media">
            <a
              href={SITE_CONFIG.social.facebook}
              aria-label="Facebook"
              target="_blank"
              rel="noreferrer"
            >
              <FacebookIcon width={15} height={15} />
            </a>
            <a
              href={SITE_CONFIG.social.instagram}
              aria-label="Instagram"
              target="_blank"
              rel="noreferrer"
            >
              <InstagramIcon width={15} height={15} />
            </a>
            <a
              href={SITE_CONFIG.social.linkedin}
              aria-label="LinkedIn"
              target="_blank"
              rel="noreferrer"
            >
              <LinkedinIcon width={15} height={15} />
            </a>
          </div>
          <div className="topbar-contact">
            <a href={SITE_CONFIG.contact.phoneHref}>
              <Phone size={14} /> {SITE_CONFIG.contact.phoneDisplay}
            </a>
            <a href={SITE_CONFIG.contact.emailHref}>
              <Mail size={14} /> {SITE_CONFIG.contact.email}
            </a>
          </div>
        </div>
      </div>

      <header className={cn("site-header", menuOpen && "is-menu-open")}>
        <div className="container nav-shell">
          <BrandLogo priority />

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.slice(0, 3).map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <AppLink
                  key={item.label}
                  href={item.href}
                  className={cn(active && "is-active")}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenus}
                >
                  {item.label}
                </AppLink>
              );
            })}
            <div className={cn("nav-dropdown", productsActive && "is-active")}>
              <button
                type="button"
                aria-expanded={productsOpen}
                aria-current={productsActive ? "page" : undefined}
                className={cn(productsActive && "is-active")}
                onClick={() => setProductsOpen((open) => !open)}
              >
                Products <ChevronDown size={15} />
              </button>
              {productsOpen && (
                <div className="dropdown-menu">
                  {products.map((item) => {
                    const active = isNavActive(pathname, item.href);
                    return (
                      <AppLink
                        key={item.label}
                        href={item.href}
                        className={cn(active && "is-active")}
                        aria-current={active ? "page" : undefined}
                        onClick={closeMenus}
                      >
                        {item.label}
                      </AppLink>
                    );
                  })}
                </div>
              )}
            </div>
            {navItems.slice(3, 5).map((item) => {
              const active = isNavActive(pathname, item.href);
              return (
                <AppLink
                  key={item.label}
                  href={item.href}
                  className={cn(active && "is-active")}
                  aria-current={active ? "page" : undefined}
                  onClick={closeMenus}
                >
                  {item.label}
                </AppLink>
              );
            })}
          </nav>

          <ButtonLink
            className={cn(
              "desktop-cta ml-2",
              isNavActive(pathname, "/contact-us") && "is-active",
            )}
            href="/contact-us"
            aria-current={
              isNavActive(pathname, "/contact-us") ? "page" : undefined
            }
          >
            Let&apos;s talk
          </ButtonLink>

          <button
            className={cn("menu-toggle", menuOpen && "is-open")}
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <button
        type="button"
        className={cn("mobile-nav-backdrop", menuOpen && "is-open")}
        aria-label="Close menu"
        tabIndex={menuOpen ? 0 : -1}
        onClick={closeMenus}
      />

      <nav
        id="mobile-navigation"
        className={cn("mobile-nav", menuOpen && "is-open")}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <div className="mobile-nav-body">
          {navItems.slice(0, 3).map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <AppLink
                key={item.label}
                href={item.href}
                className={cn(active && "is-active")}
                aria-current={active ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenus}
              >
                {item.label}
              </AppLink>
            );
          })}
          <p className={cn(productsActive && "is-active")}>Products</p>
          {products.map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <AppLink
                className={cn("mobile-subitem", active && "is-active")}
                key={item.label}
                href={item.href}
                aria-current={active ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenus}
              >
                {item.label}
              </AppLink>
            );
          })}
          {navItems.slice(3).map((item) => {
            const active = isNavActive(pathname, item.href);
            return (
              <AppLink
                key={item.label}
                href={item.href}
                className={cn(active && "is-active")}
                aria-current={active ? "page" : undefined}
                tabIndex={menuOpen ? 0 : -1}
                onClick={closeMenus}
              >
                {item.label}
              </AppLink>
            );
          })}
        </div>
      </nav>
    </>
  );
}
