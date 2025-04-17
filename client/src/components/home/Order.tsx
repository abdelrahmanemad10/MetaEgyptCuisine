import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { menuItems, type MenuItem } from "@/lib/menu-data";
import { OrderItem } from "@shared/schema";

// Form validation schema
const orderSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(8, "Valid phone number is required"),
  address: z.string().min(10, "Complete address is required"),
  deliveryTime: z.string().min(1, "Please select a delivery time"),
  specialInstructions: z.string().optional(),
});

type OrderFormValues = z.infer<typeof orderSchema>;

const Order = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cartItems, setCartItems] = useState<(OrderItem & { menuItem: MenuItem })[]>([]);
  
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      deliveryTime: "",
      specialInstructions: "",
    },
  });
  
  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
  
  // Add an item to the cart
  const addToCart = (menuItem: MenuItem) => {
    const existingItem = cartItems.find(item => item.id === menuItem.id);
    if (existingItem) {
      // Increase quantity of existing item
      setCartItems(cartItems.map(item => 
        item.id === menuItem.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      // Add new item
      setCartItems([
        ...cartItems, 
        { 
          id: menuItem.id, 
          name: menuItem.name, 
          price: menuItem.price, 
          quantity: 1, 
          notes: "",
          menuItem
        }
      ]);
    }
    
    toast({
      title: "Added to cart",
      description: `${menuItem.name} has been added to your order.`,
    });
  };
  
  // Remove item from cart
  const removeFromCart = (itemId: number) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };
  
  // Update item quantity
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Update item notes
  const updateNotes = (itemId: number, notes: string) => {
    setCartItems(cartItems.map(item => 
      item.id === itemId ? { ...item, notes } : item
    ));
  };
  
  // Create order mutation
  const createOrder = useMutation({
    mutationFn: (orderData: OrderFormValues & { items: OrderItem[] }) => 
      apiRequest("POST", "/api/orders", orderData),
    onSuccess: () => {
      toast({
        title: "Order Placed Successfully",
        description: "Thank you for your order. We'll start preparing it right away!",
      });
      setIsSubmitted(true);
      form.reset();
      setCartItems([]);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to place order: ${error.message}`,
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: OrderFormValues) => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive",
      });
      return;
    }
    
    // Extract only the necessary data from cart items for the API
    const items = cartItems.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      notes: item.notes
    }));
    
    createOrder.mutate({ ...data, items });
  };
  
  const deliveryTimeOptions = [
    "ASAP (30-45 min)",
    "1 hour",
    "1.5 hours",
    "2 hours",
    "Tonight (6-8pm)",
    "Tomorrow lunch (12-2pm)",
    "Tomorrow dinner (6-8pm)"
  ];
  
  // Filter menu items to only show main dishes, appetizers, and desserts
  const filteredMenuItems = menuItems.filter(
    item => ["mains", "appetizers", "seafood", "desserts"].includes(item.category)
  );
  
  const categoryDisplayNames = {
    appetizers: "Appetizers",
    mains: "Main Courses",
    seafood: "Seafood",
    desserts: "Desserts"
  };
  
  return (
    <section id="order" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-primary font-playfair text-4xl font-bold mb-4">Online Ordering</h2>
          <p className="text-foreground max-w-2xl mx-auto">
            Enjoy Meta Restaurant's exquisite cuisine from the comfort of your home
          </p>
          <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
        </div>
        
        {isSubmitted ? (
          <div className="bg-secondary p-12 rounded-lg shadow-lg text-center max-w-3xl mx-auto">
            <div className="text-primary text-5xl mb-6">
              <i className="fas fa-check-circle"></i>
            </div>
            <h3 className="text-2xl font-playfair mb-4">Your Order Has Been Placed!</h3>
            <p className="mb-8">
              Thank you for your order. We'll start preparing your delicious meal right away and deliver it fresh to your doorstep.
            </p>
            <p className="mb-8 text-primary font-medium">
              You'll receive a confirmation email shortly with your order details.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>Place Another Order</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <h3 className="text-2xl font-playfair font-semibold mb-6">Menu Selection</h3>
              
              {Object.entries(
                filteredMenuItems.reduce((acc, item) => {
                  if (!acc[item.category]) {
                    acc[item.category] = [];
                  }
                  acc[item.category].push(item);
                  return acc;
                }, {} as Record<string, MenuItem[]>)
              ).map(([category, items]) => (
                <div key={category} className="mb-12">
                  <h4 className="text-xl text-primary font-semibold mb-4">
                    {categoryDisplayNames[category as keyof typeof categoryDisplayNames]}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {items.map(item => (
                      <Card key={item.id} className="flex overflow-hidden h-32 transition-shadow hover:shadow-md">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="h-full w-1/3 object-cover"
                        />
                        <div className="p-4 flex flex-col justify-between w-2/3">
                          <div>
                            <h5 className="font-semibold text-lg line-clamp-1">{item.name}</h5>
                            <p className="text-sm text-foreground opacity-80 line-clamp-2 mb-2">
                              {item.description}
                            </p>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-primary">LE {item.price}</span>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => addToCart(item)}
                            >
                              Add +
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-primary font-playfair text-xl">Your Order</CardTitle>
                </CardHeader>
                <CardContent>
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-foreground opacity-70 mb-4">Your cart is empty</p>
                      <p className="text-sm">Add items from the menu to get started</p>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex items-start justify-between border-b pb-4">
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h5 className="font-medium">{item.name}</h5>
                                <span className="text-primary font-semibold">LE {item.price * item.quantity}</span>
                              </div>
                              <div className="flex items-center mt-2">
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-6 w-6"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <i className="fas fa-minus text-xs"></i>
                                </Button>
                                <span className="mx-2">{item.quantity}</span>
                                <Button 
                                  size="icon" 
                                  variant="outline" 
                                  className="h-6 w-6"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <i className="fas fa-plus text-xs"></i>
                                </Button>
                                <Button 
                                  size="icon" 
                                  variant="ghost" 
                                  className="h-6 w-6 ml-2 text-destructive"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <i className="fas fa-trash-alt text-xs"></i>
                                </Button>
                              </div>
                              <input 
                                type="text" 
                                placeholder="Special instructions..."
                                className="w-full mt-2 text-xs px-2 py-1 border rounded bg-secondary"
                                value={item.notes || ""}
                                onChange={(e) => updateNotes(item.id, e.target.value)}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-bold text-lg mb-4">
                          <span>Total:</span>
                          <span className="text-primary">LE {cartTotal}</span>
                        </div>
                        
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Full Name</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your name" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="email"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Email Address</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your email" type="email" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="phone"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Phone Number</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Your phone" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="address"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Delivery Address</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Street, building, apartment, area, landmarks..." 
                                      className="resize-none" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="deliveryTime"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Delivery Time</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Select time" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      {deliveryTimeOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                          {option}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name="specialInstructions"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Special Instructions (Optional)</FormLabel>
                                  <FormControl>
                                    <Textarea 
                                      placeholder="Any special instructions for delivery or food preparation" 
                                      className="resize-none" 
                                      {...field} 
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            
                            <Button 
                              type="submit" 
                              className="w-full"
                              size="lg"
                              disabled={createOrder.isPending}
                            >
                              {createOrder.isPending ? 
                                "Processing Order..." : 
                                `Place Order • LE ${cartTotal}`}
                            </Button>
                          </form>
                        </Form>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Order;