import type { Metadata } from "next";
import { holographicButtonClassName } from "@/components/ui/ButtonLink";
import { isValidIphexAdminKey } from "@/lib/iphex-admin";
import { getIphexBookings } from "@/lib/iphex-bookings";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "iPHEX bookings",
  robots: {
    index: false,
    follow: false,
  },
};

function formatCreatedAt(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(date);
}

export default async function IphexBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ key?: string }>;
}) {
  const { key = "" } = await searchParams;
  const authorized = isValidIphexAdminKey(key);
  const bookings = authorized ? getIphexBookings() : [];

  return (
    <main className="min-h-screen bg-surface px-4 py-10 sm:px-8">
      <div className="mx-auto w-full max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand">
          Private booking list
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-ink">
          iPHEX 2026 submissions
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/65">
          Use your secret key to view names, emails, and booked slots. Bookmark
          the URL after you open it so you do not need the inbox.
        </p>

        {!authorized ? (
          <form className="mt-8 max-w-md rounded-3xl border border-line bg-white p-6 shadow-card">
            <label className="text-sm font-semibold text-ink">
              Secret key
              <input
                name="key"
                type="password"
                required
                autoComplete="off"
                className="mt-1.5 h-[50px] w-full rounded-[10px] border border-line bg-[#fafcfe] px-[15px] text-sm text-ink outline-none transition placeholder:text-ink/45 focus:border-brand focus-visible:outline-none focus-visible:outline-offset-0"
                placeholder="Enter IPHEX_ADMIN_KEY"
              />
            </label>
            <button
              type="submit"
              className={cn("mt-5 w-full", holographicButtonClassName)}
            >
              <span className="holographic-btn__label">View bookings</span>
            </button>
          </form>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href={`/api/iphex/bookings/?key=${encodeURIComponent(key)}`}
                className={holographicButtonClassName}
              >
                <span className="holographic-btn__label">Download JSON</span>
              </a>
              <p className="text-sm font-semibold text-ink/60">
                {bookings.length} booked slot{bookings.length === 1 ? "" : "s"}
              </p>
            </div>

            {bookings.length === 0 ? (
              <p className="mt-8 rounded-3xl border border-line bg-white p-6 text-sm text-ink/60 shadow-card">
                No bookings yet. When someone submits the form, it will appear
                here and in the JSON file.
              </p>
            ) : (
              <div className="mt-8 overflow-x-auto rounded-3xl border border-line bg-white shadow-card">
                <table className="min-w-full text-left text-sm">
                  <thead className="bg-surface text-xs font-bold uppercase tracking-wide text-ink/55">
                    <tr>
                      <th className="px-4 py-3">Slot</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Company</th>
                      <th className="px-4 py-3">Email</th>
                      <th className="px-4 py-3">Phone</th>
                      <th className="px-4 py-3">Submitted</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((booking) => (
                      <tr key={booking.slotId} className="border-t border-line">
                        <td className="px-4 py-3 font-semibold text-ink">
                          {booking.date}
                          <span className="mt-0.5 block font-normal text-ink/60">
                            {booking.time}
                          </span>
                        </td>
                        <td className="px-4 py-3">{booking.name}</td>
                        <td className="px-4 py-3">{booking.company}</td>
                        <td className="px-4 py-3">
                          <a
                            href={`mailto:${booking.email}`}
                            className="text-brand"
                          >
                            {booking.email}
                          </a>
                        </td>
                        <td className="px-4 py-3">{booking.phone}</td>
                        <td className="px-4 py-3 text-ink/60">
                          {formatCreatedAt(booking.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
