import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/components/SocialIcons";
import { NewsletterForm } from "@/components/NewsletterForm";
import { AppLink } from "@/components/ui/AppLink";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { SITE_CONFIG } from "@/lib/site-config";

const baseUrl = SITE_CONFIG.url;

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <BrandLogo variant="white" className="footer-logo" />
          <p>
            S V Healthcare is a group of like-minded people having vision to
            provide the best medicines in a cost-effective way.
          </p>
          <div className="footer-social">
            <a href={SITE_CONFIG.social.facebook} aria-label="Facebook">
              <FacebookIcon />
            </a>
            <a href={SITE_CONFIG.social.instagram} aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href={SITE_CONFIG.social.linkedin} aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
          </div>
        </div>
        <div>
          <h3>Company</h3>
          <AppLink href="/about-us">About us</AppLink>
          <AppLink href="/our-services">Services</AppLink>
          <AppLink href="/export">Export</AppLink>
          <AppLink href="/blog">Blog</AppLink>
          <AppLink href="/contact-us">Contact</AppLink>
        </div>
        <div>
          <h3>Products</h3>
          <AppLink href="/pharmaceutical-products">Pharmaceutical</AppLink>
          <AppLink href="/nutraceutical-products">Nutraceutical</AppLink>
          <AppLink href="/cosmetic-products">Cosmetic</AppLink>
          <a
            href={`${baseUrl}/wp-content/uploads/2026/08/SV-Brochure-2026.pdf`}
          >
            Download brochure
          </a>
        </div>
        <div>
          <h3>Stay informed</h3>
          <p>Get healthcare and export insights from our team.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© 2026 S V Healthcare. All rights reserved.</span>
        <span>Quality care, accessible globally. Developed by Colordesk</span>
      </div>
    </footer>
  );
}
