import { pgTable, text, serial, date, time } from "drizzle-orm/pg-core";
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
  specialRequests: text("special_requests"),
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
