import { cn } from "@/lib/cn";
import { SITE_CONFIG } from "@/lib/site-config";

type LocationMapProps = {
  className?: string;
  title?: string;
};

export function LocationMap({
  className,
  title = `${SITE_CONFIG.name} office location — ${SITE_CONFIG.address.full}`,
}: LocationMapProps) {
  return (
    <div className={cn("map-wrap", className)}>
      <iframe
        title={title}
        src={SITE_CONFIG.address.mapsEmbedUrl}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
