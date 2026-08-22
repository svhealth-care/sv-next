"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    question: "Why is your company the best pharma exporter in India?",
    answer:
      "We focus on best quality, diverse product range and extensive experience in global exports. Our commitment to innovation, patient welfare and international health sets us apart.",
  },
  {
    question: "What kind of pharma products do you export?",
    answer:
      "We offer a comprehensive portfolio covering pharmaceutical, nutraceutical and cosmetics categories- e.g., Naproxen Tablet, Pantoprazole for Injection, Melatonin Tablet, Fish Oil Softgel Capsule, Joint Support Tablet, VR Vitamin C Serum, VR Hair Growth Serum, etc.",
  },
  {
    question: "Which countries do you currently export to?",
    answer:
      "We have a strong presence in various markets across the world, including USA, Myanmar, Cambodia, Venezuela, South East Asia, Latin America markets etc.",
  },
  {
    question: "How do you handle the complexities of international pharmaceutical export?",
    answer:
      "Our team has extensive experience navigating international regulations, customs clearance, and logistics, ensuring smooth delivery around the world.",
  },
  {
    question: "What kind of support do you provide to your export partners?",
    answer:
      "We provide comprehensive support throughout the export process, including regulatory guidance, logistics coordination, and documentation assistance.",
  },
];

export function FaqAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="faq-list">
      {faqs.map((faq, index) => {
        const isOpen = open === index;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            className={`faq-item ${isOpen ? "open" : ""}`}
            key={faq.question}
          >
            <h3>
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? -1 : index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon" aria-hidden="true">
                  {isOpen ? <Minus /> : <Plus />}
                </span>
              </button>
            </h3>

            <div
              id={panelId}
              className="faq-answer"
              role="region"
              hidden={!isOpen}
            >
              <div className="faq-answer-inner">
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
