import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Checkout from "@/pages/checkout";
import PaymentSuccess from "@/pages/payment-success";
import PaymentCancel from "@/pages/payment-cancel";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/payment/success" component={PaymentSuccess} />
      <Route path="/payment/cancel" component={PaymentCancel} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Load fonts
  useEffect(() => {
    const linkPlafair = document.createElement('link');
    linkPlafair.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap';
    linkPlafair.rel = 'stylesheet';
    document.head.appendChild(linkPlafair);

    const linkMontserrat = document.createElement('link');
    linkMontserrat.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap';
    linkMontserrat.rel = 'stylesheet';
    document.head.appendChild(linkMontserrat);

    const linkCormorant = document.createElement('link');
    linkCormorant.href = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap';
    linkCormorant.rel = 'stylesheet';
    document.head.appendChild(linkCormorant);

    const fontAwesome = document.createElement('link');
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    fontAwesome.rel = 'stylesheet';
    document.head.appendChild(fontAwesome);

    return () => {
      document.head.removeChild(linkPlafair);
      document.head.removeChild(linkMontserrat);
      document.head.removeChild(linkCormorant);
      document.head.removeChild(fontAwesome);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
