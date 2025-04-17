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
import { Card, CardContent } from "@/components/ui/card";
import { insertReservationSchema } from "@shared/schema";

const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

const reservationSchema = insertReservationSchema.extend({
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  guests: z.string().min(1, "Please select number of guests"),
});

type ReservationFormValues = z.infer<typeof reservationSchema>;

const Reservation = () => {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const form = useForm<ReservationFormValues>({
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      guests: "",
      date: formatDate(new Date()),
      time: "",
      specialRequests: "",
    },
  });

  const createReservation = useMutation({
    mutationFn: (newReservation: ReservationFormValues) => 
      apiRequest("POST", "/api/reservations", newReservation),
    onSuccess: () => {
      toast({
        title: "Reservation Confirmed",
        description: "Thank you for your reservation. We look forward to serving you!",
      });
      setIsSubmitted(true);
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to make reservation: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReservationFormValues) => {
    createReservation.mutate(data);
  };

  const timeOptions = [
    "18:00", "18:30", "19:00", "19:30", 
    "20:00", "20:30", "21:00", "21:30"
  ];

  const guestOptions = ["1", "2", "3", "4", "5", "6", "7+"];

  return (
    <section id="reservation" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-primary font-playfair text-4xl font-bold mb-6">Make a Reservation</h2>
            <p className="text-foreground mb-8 max-w-md">
              Reserve your table at Meta Restaurant for an unforgettable dining experience. For special occasions, please mention in your reservation notes.
            </p>
            
            {isSubmitted ? (
              <div className="bg-secondary p-8 rounded-lg shadow-lg text-center">
                <i className="fas fa-check-circle text-primary text-5xl mb-4"></i>
                <h3 className="text-2xl font-playfair mb-4">Reservation Confirmed!</h3>
                <p className="mb-6">Thank you for your reservation. We look forward to serving you!</p>
                <Button onClick={() => setIsSubmitted(false)}>Make Another Reservation</Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      name="guests"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Guests</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {guestOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option === "7+" ? "7+ People" : `${option} ${option === "1" ? "Person" : "People"}`}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {timeOptions.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {new Date(`2000-01-01T${time}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="specialRequests"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Special Requests</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Any special requests or occasions" 
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
                    size="lg"
                    disabled={createReservation.isPending}
                  >
                    {createReservation.isPending ? "Processing..." : "Reserve My Table"}
                  </Button>
                </form>
              </Form>
            )}
          </div>
          
          <div className="h-full flex flex-col">
            <Card className="bg-secondary mb-8">
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl text-primary font-semibold mb-4">Opening Hours</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span className="text-foreground">Monday - Thursday</span>
                    <span className="text-primary">5:00 PM - 11:00 PM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-foreground">Friday - Saturday</span>
                    <span className="text-primary">5:00 PM - 12:00 AM</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-foreground">Sunday</span>
                    <span className="text-primary">5:00 PM - 10:00 PM</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="bg-secondary flex-grow" id="contact">
              <CardContent className="p-8">
                <h3 className="font-playfair text-2xl text-primary font-semibold mb-4">Contact Information</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt text-primary mt-1 mr-4"></i>
                    <span className="text-foreground">Sheikh Zayed City, Giza Governorate, Egypt</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-phone text-primary mr-4"></i>
                    <span className="text-foreground">+20 123 456 7890</span>
                  </li>
                  <li className="flex items-center">
                    <i className="fas fa-envelope text-primary mr-4"></i>
                    <span className="text-foreground">reservations@metarestaurant.com</span>
                  </li>
                </ul>
                
                <div className="mt-8">
                  <h4 className="text-foreground font-semibold mb-4">Find Us On</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background hover:bg-opacity-80 transition-colors duration-300">
                      <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background hover:bg-opacity-80 transition-colors duration-300">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-background hover:bg-opacity-80 transition-colors duration-300">
                      <i className="fab fa-twitter"></i>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
