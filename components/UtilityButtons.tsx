"use client";

import { ArrowUp } from "lucide-react";
import { WhatsAppIcon } from "@/components/SocialIcons";

export function UtilityButtons() {
  return (
    <div className="utility-buttons">
      <a
        className="whatsapp-button"
        href="https://wa.me/919998106442"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with S V Healthcare on WhatsApp"
      >
        <WhatsAppIcon />
      </a>
      <button
        className="back-to-top"
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Back to top"
      >
        <ArrowUp />
      </button>
    </div>
  );
}
