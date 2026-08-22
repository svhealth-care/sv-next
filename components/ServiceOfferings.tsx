"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { cn } from "@/lib/cn";

export type ServiceOffering = {
  id: string;
  label: string;
  title: string;
  icon: string;
  iconAlt: string;
  summary: string;
  sections: Array<{
    heading?: string;
    paragraphs?: string[];
    bullets?: Array<{ title: string; text: string }>;
  }>;
};

type ServiceOfferingsProps = {
  services: ServiceOffering[];
};

export function ServiceOfferings({ services }: ServiceOfferingsProps) {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    services.slice(0, 2).map((service) => service.id),
  );

  const toggle = (id: string) => {
    setOpenIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <Stagger className="services-grid" stagger={0.12}>
      {services.map((service) => {
        const isOpen = openIds.includes(service.id);

        return (
          <StaggerItem key={service.id}>
            <article className={cn("services-card", isOpen && "is-open")}>
              <button
                type="button"
                className="services-card-trigger"
                aria-expanded={isOpen}
                aria-controls={`service-panel-${service.id}`}
                onClick={() => toggle(service.id)}
              >
                <span className="services-card-icon">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.icon}
                    alt={service.iconAlt}
                    width={64}
                    height={64}
                  />
                </span>
                <span className="services-card-copy">
                  <h3>{service.label}</h3>
                  <p>{service.summary}</p>
                </span>
                <ChevronDown className="services-card-chevron" aria-hidden />
              </button>
              <div
                id={`service-panel-${service.id}`}
                className="services-card-panel"
                hidden={!isOpen}
              >
                <h4>{service.title}</h4>
                {service.sections.map((section, index) => (
                  <div className="services-card-section" key={index}>
                    {section.heading ? <h5>{section.heading}</h5> : null}
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.bullets ? (
                      <ul>
                        {section.bullets.map((bullet) => (
                          <li key={bullet.title}>
                            <strong>{bullet.title}</strong>
                            <span>{bullet.text}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            </article>
          </StaggerItem>
        );
      })}
    </Stagger>
  );
}
