import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { insertReservationSchema, insertOrderSchema, orderItemSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes - prefix all routes with /api
  
  // ===== RESERVATION ROUTES =====
  
  // Get all reservations
  app.get("/api/reservations", async (_req: Request, res: Response) => {
    try {
      const reservations = await storage.getReservations();
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reservations" });
    }
  });

  // Get a specific reservation
  app.get("/api/reservations/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid reservation ID" });
      }

      const reservation = await storage.getReservation(id);
      if (!reservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      res.json(reservation);
    } catch (error) {
      res.status(500).json({ message: "Error fetching reservation" });
    }
  });

  // Create a new reservation
  app.post("/api/reservations", async (req: Request, res: Response) => {
    try {
      // Validate request body against schema
      const validatedData = insertReservationSchema.parse(req.body);
      
      // Create the reservation
      const newReservation = await storage.createReservation(validatedData);
      
      res.status(201).json(newReservation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error creating reservation" });
    }
  });

  // Update reservation status
  app.patch("/api/reservations/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid reservation ID" });
      }

      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }

      const updatedReservation = await storage.updateReservationStatus(id, status);
      if (!updatedReservation) {
        return res.status(404).json({ message: "Reservation not found" });
      }

      res.json(updatedReservation);
    } catch (error) {
      res.status(500).json({ message: "Error updating reservation status" });
    }
  });
  
  // ===== ORDER ROUTES =====
  
  // Get all orders
  app.get("/api/orders", async (_req: Request, res: Response) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Error fetching orders" });
    }
  });

  // Get a specific order
  app.get("/api/orders/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }

      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Error fetching order" });
    }
  });

  // Create a new order
  app.post("/api/orders", async (req: Request, res: Response) => {
    try {
      // Validate items separately first
      const itemsArray = z.array(orderItemSchema).parse(req.body.items);
      
      // Calculate the total from the items
      const total = itemsArray.reduce((sum, item) => {
        return sum + (item.price * item.quantity);
      }, 0);
      
      // Add the calculated total to the request body
      const orderData = {
        ...req.body,
        total,
        orderDate: new Date().toISOString().split('T')[0] // Current date in YYYY-MM-DD format
      };
      
      // Validate the full order
      const validatedData = insertOrderSchema.parse(orderData);
      
      // Create the order
      const newOrder = await storage.createOrder(validatedData);
      
      res.status(201).json(newOrder);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      }
      res.status(500).json({ message: "Error creating order" });
    }
  });

  // Update order status
  app.patch("/api/orders/:id/status", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid order ID" });
      }

      const { status } = req.body;
      if (!status || typeof status !== "string") {
        return res.status(400).json({ message: "Status is required" });
      }

      const updatedOrder = await storage.updateOrderStatus(id, status);
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res.json(updatedOrder);
    } catch (error) {
      res.status(500).json({ message: "Error updating order status" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
