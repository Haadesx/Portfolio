import { NotFoundContent } from "../not-found";

/**
 * 404 boundary for routes inside the (site) layout.
 *
 * Next renders a not-found boundary inside the layouts of the segment that
 * throws `notFound()`, so the root file would duplicate the Navbar/Footer that
 * the site layout already provides. This boundary renders the shared 404
 * content only; the root `src/app/not-found.tsx` keeps the full site chrome for
 * URLs that match no route at all.
 */
export default function SiteNotFound() {
  return <NotFoundContent />;
}
