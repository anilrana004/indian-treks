import MobileBottomNav from "@/components/MobileBottomNav";
import AboutPage from "@/pages/AboutPage";
import AllTreksPage from "@/pages/AllTreksPage";
import AllYatrasPage from "@/pages/AllYatrasPage";
import BlogPage from "@/pages/BlogPage";
import BookingWizardPage from "@/pages/BookingWizardPage";
import ContactPage from "@/pages/ContactPage";
import CustomItineraryPage from "@/pages/CustomItineraryPage";
import DestinationsPage from "@/pages/DestinationsPage";
import DistrictDetailPage from "@/pages/DistrictDetailPage";
import GalleryPage from "@/pages/GalleryPage";
import HomePage from "@/pages/HomePage";
import StateDestinationsPage from "@/pages/StateDestinationsPage";
import TrekDetailPage from "@/pages/TrekDetailPage";
import TreksListPage from "@/pages/TreksListPage";
import YatraListPage from "@/pages/YatraListPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const queryClient = new QueryClient();

const rootRoute = createRootRoute({
  component: () => (
    <div className="pb-16 md:pb-0">
      <Outlet />
      <MobileBottomNav />
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const destinationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/destinations",
  component: DestinationsPage,
});

const stateDestinationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/destinations/$state",
  component: StateDestinationsPage,
});

const districtDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/destinations/$state/$district",
  component: DistrictDetailPage,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/book",
  component: BookingWizardPage,
});

const treksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/treks/$slug",
  component: TrekDetailPage,
});

const treksListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/treks",
  component: TreksListPage,
});

const yatraListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/yatras",
  component: YatraListPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: GalleryPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: AboutPage,
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: BlogPage,
});

const allTreksRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/all-treks",
  component: AllTreksPage,
});

const allYatrasRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/all-yatras",
  component: AllYatrasPage,
});

const planRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/plan",
  component: CustomItineraryPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  destinationsRoute,
  stateDestinationsRoute,
  districtDetailRoute,
  bookingRoute,
  treksRoute,
  treksListRoute,
  yatraListRoute,
  galleryRoute,
  contactRoute,
  aboutRoute,
  blogRoute,
  allTreksRoute,
  allYatrasRoute,
  planRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
