import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Redirect to the success or failure page based on the payment result
        return_url: `${window.location.origin}/payment/success`,
      },
    });

    setIsProcessing(false);

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase!",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="space-y-6">
        <PaymentElement />
        
        <div className="flex gap-4">
          <Button 
            type="submit" 
            className="flex-1" 
            size="lg"
            disabled={!stripe || isProcessing}
          >
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
          
          <Button 
            type="button" 
            variant="outline" 
            className="flex-none" 
            size="lg"
            onClick={() => window.location.href = '/payment/cancel'}
            disabled={isProcessing}
          >
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Get order total from session storage or URL params
        const orderTotal = sessionStorage.getItem('orderTotal') || "0";
        const amount = parseFloat(orderTotal);
        
        if (!amount || amount <= 0) {
          setError("Invalid order amount");
          setIsLoading(false);
          return;
        }
        
        const response = await apiRequest("POST", "/api/create-payment-intent", { amount });
        const data = await response.json();
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("Failed to initialize payment");
        }
      } catch (err: any) {
        setError(err.message || "An error occurred");
        toast({
          title: "Payment Initialization Failed",
          description: err.message || "Could not connect to payment service",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    createPaymentIntent();
  }, [toast]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" aria-label="Loading"/>
          <p className="text-foreground">Preparing payment...</p>
        </div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-destructive">Payment Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{error}</p>
            <Button 
              onClick={() => window.history.back()}
              variant="secondary"
            >
              Return to Order
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  if (!clientSecret) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Payment Not Ready</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Unable to initialize payment process. Please try again.</p>
            <Button 
              onClick={() => window.location.reload()}
              variant="secondary"
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Make SURE to wrap the form in <Elements> which provides the stripe context.
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-8 text-center">Complete Your Payment</h1>
          
          <Card>
            <CardHeader>
              <CardTitle>Secure Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <CheckoutForm />
              </Elements>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};