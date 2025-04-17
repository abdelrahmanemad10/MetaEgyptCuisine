import { pgTable, text, serial, date, time, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Define the reservations table schema
export const reservations = pgTable("reservations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  guests: text("guests").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  specialRequests: text("special_requests").notNull().default(""),
  status: text("status").notNull().default("pending")
});

// Create the insert schema using drizzle-zod
export const insertReservationSchema = createInsertSchema(reservations).omit({
  id: true,
  status: true
});

// Define the types
export type InsertReservation = z.infer<typeof insertReservationSchema>;
export type Reservation = typeof reservations.$inferSelect;

// Define the orders table schema
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  items: jsonb("items").notNull(),
  total: integer("total").notNull(),
  deliveryTime: text("delivery_time").notNull(),
  specialInstructions: text("special_instructions").notNull().default(""),
  status: text("status").notNull().default("pending"),
  orderDate: text("order_date").notNull()
});

// Create the insert schema for orders
export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  status: true
});

// Order item schema for validation
export const orderItemSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
  notes: z.string().optional()
});

// Define the types for orders
export type OrderItem = z.infer<typeof orderItemSchema>;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;

// Keep the existing users schema for the template
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
