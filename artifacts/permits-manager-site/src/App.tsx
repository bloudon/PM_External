import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  useLocation,
  Redirect,
  Router as WouterRouter,
} from 'wouter';

const queryClient = new QueryClient();

import Home from '@/pages/home';
import { ContractorsPage, ExpeditersPage } from '@/pages/solutions';
import { RoofingPage, WindowsDoorsPage, HvacPage } from '@/pages/trades';
import Features from '@/pages/features';
import How from '@/pages/how';
import About from '@/pages/about';
import { DemoPage, SignupPage, ContactPage } from '@/pages/forms-pages';
import { PrivacyPage, TermsPage } from '@/pages/legal';
import { contractorPath, tradePaths, legacyLandingPaths, landingRedirectTarget } from '@/lib/landing-routes';

function LegacyLandingRedirect({ path }: { path: string }) {
  const target = landingRedirectTarget(path, window.location.search, window.location.hash);
  return target ? <Redirect to={target} replace /> : <NotFound />;
}

function Router() {
  return (
    // Keep a shared shell (sidebar, navbar) outside the boundary so it
    // survives a page crash.
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route path={tradePaths.roofing} component={RoofingPage} />
        <Route path={tradePaths['windows-and-doors']} component={WindowsDoorsPage} />
        <Route path={tradePaths.hvac} component={HvacPage} />
        <Route path={contractorPath} component={ContractorsPage} />
        {Object.keys(legacyLandingPaths).map((path) => (
          <Route key={path} path={path}><LegacyLandingRedirect path={path} /></Route>
        ))}
        <Route path="/solutions/permit-expediters" component={ExpeditersPage} />
        <Route path="/features" component={Features} />
        <Route path="/how-it-works" component={How} />
        <Route path="/about" component={About} />
        <Route path="/demo" component={DemoPage} />
        <Route path="/signup" component={SignupPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/privacy" component={PrivacyPage} />
        <Route path="/terms" component={TermsPage} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
