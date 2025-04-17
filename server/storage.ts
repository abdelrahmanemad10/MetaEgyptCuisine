import { users, type User, type InsertUser, reservations, type Reservation, type InsertReservation } from "@shared/schema";

// Define storage interface with all needed CRUD operations
export interface IStorage {
  // User operations (keeping from template)
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Reservation operations
  getReservations(): Promise<Reservation[]>;
  getReservation(id: number): Promise<Reservation | undefined>;
  createReservation(reservation: InsertReservation): Promise<Reservation>;
  updateReservationStatus(id: number, status: string): Promise<Reservation | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private reservationStore: Map<number, Reservation>;
  private userCurrentId: number;
  private reservationCurrentId: number;

  constructor() {
    this.users = new Map();
    this.reservationStore = new Map();
    this.userCurrentId = 1;
    this.reservationCurrentId = 1;
  }

  // User operations (keeping from template)
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Reservation operations
  async getReservations(): Promise<Reservation[]> {
    return Array.from(this.reservationStore.values());
  }

  async getReservation(id: number): Promise<Reservation | undefined> {
    return this.reservationStore.get(id);
  }

  async createReservation(insertReservation: InsertReservation): Promise<Reservation> {
    const id = this.reservationCurrentId++;
    const reservation: Reservation = { 
      ...insertReservation, 
      id, 
      status: "confirmed" 
    };
    this.reservationStore.set(id, reservation);
    return reservation;
  }

  async updateReservationStatus(id: number, status: string): Promise<Reservation | undefined> {
    const reservation = this.reservationStore.get(id);
    if (reservation) {
      const updatedReservation = { ...reservation, status };
      this.reservationStore.set(id, updatedReservation);
      return updatedReservation;
    }
    return undefined;
  }
}

export const storage = new MemStorage();
