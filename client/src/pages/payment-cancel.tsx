import { Link } from 'wouter';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="mb-6 mx-auto w-16 h-16 flex items-center justify-center bg-destructive/20 rounded-full">
            <XCircle className="text-destructive w-8 h-8" />
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Payment Cancelled</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Your payment was cancelled. No charges were made to your card.
              </p>
              
              <p className="text-muted-foreground">
                If you experienced any issues during checkout, please contact us for assistance.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link href="/checkout">
                  <Button className="w-full">Try Again</Button>
                </Link>
                
                <Link href="/">
                  <Button variant="outline" className="w-full">Return to Homepage</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}