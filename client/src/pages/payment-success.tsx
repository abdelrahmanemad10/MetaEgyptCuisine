import { useEffect } from 'react';
import { Link } from 'wouter';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PaymentSuccess() {
  const { toast } = useToast();
  
  useEffect(() => {
    // Clear the cart and order details from sessionStorage
    sessionStorage.removeItem('orderTotal');
    sessionStorage.removeItem('cartItems');
    
    // Show success toast
    toast({
      title: "Payment Successful",
      description: "Thank you for your order! It will be ready soon.",
    });
  }, [toast]);
  
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-primary rounded-full">
            <Check className="text-primary-foreground w-8 h-8" />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Thank you for your order. We've received your payment and your order is being processed.
              </p>
              
              <p className="text-muted-foreground">
                A confirmation email has been sent to your email address.
              </p>
              
              <div className="pt-4">
                <Link href="/">
                  <Button className="w-full">Return to Homepage</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}