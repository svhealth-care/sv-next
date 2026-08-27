"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { IphexBookingDialog } from "@/components/IphexBookingDialog";
import { Modal } from "@/components/ui/Modal";
import { holographicButtonClassName } from "@/components/ui/ButtonLink";
import { cn } from "@/lib/cn";
import { IPHEX_EVENT } from "@/lib/iphex-event";
import { prefetchIphexSlots } from "@/lib/iphex-slots-client";

type IphexEventContextValue = {
  openBooking: () => void;
};

const IphexEventContext = createContext<IphexEventContextValue | null>(null);

export function useIphexEvent() {
  const value = useContext(IphexEventContext);
  if (!value) {
    throw new Error("useIphexEvent must be used inside IphexEventProvider.");
  }
  return value;
}

export function IphexEventProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [popupOpen, setPopupOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const hideEventUi = pathname?.startsWith("/iphex-bookings") ?? false;

  useEffect(() => {
    if (hideEventUi) return;
    setPopupOpen(true);
    void prefetchIphexSlots().catch(() => {
      // Availability is loaded again when the booking dialog opens.
    });
  }, [hideEventUi]);

  const dismissPopup = useCallback(() => {
    setPopupOpen(false);
  }, []);

  const openBooking = useCallback(() => {
    dismissPopup();
    setBookingOpen(true);
  }, [dismissPopup]);

  const contextValue = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <IphexEventContext.Provider value={contextValue}>
      {children}
      <Modal
        open={popupOpen && !hideEventUi}
        onClose={dismissPopup}
        title={`${IPHEX_EVENT.name} announcement`}
        className="max-w-xl"
        closeOnBackdrop={false}
        closeOnEscape={false}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-surface">
          <Image
            src={IPHEX_EVENT.image}
            alt="S V Healthcare is attending iPHEX 2026 at Bharat Mandapam, New Delhi"
            fill
            sizes="(max-width: 640px) 92vw, 576px"
            priority
            fetchPriority="high"
            draggable={false}
            className="pointer-events-none object-contain select-none"
          />
        </div>
        <div className="flex flex-col gap-3 border-t border-line bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="text-center text-sm font-semibold text-ink sm:text-left">
          Let’s connect with purpose, collaborate with passion, and create impact together.
          </p>
          <button
            type="button"
            onClick={openBooking}
            className={cn("shrink-0", holographicButtonClassName)}
          >
            <span className="holographic-btn__label">Book a slot</span>
          </button>
        </div>
      </Modal>
      <IphexBookingDialog
        open={bookingOpen && !hideEventUi}
        onClose={() => setBookingOpen(false)}
      />
    </IphexEventContext.Provider>
  );
}
