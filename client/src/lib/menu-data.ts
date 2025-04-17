export type MenuCategory = "appetizers" | "mains" | "seafood" | "desserts" | "beverages";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  tags: string[];
}

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Egyptian Mezze Platter",
    description: "A selection of hummus, babaganoush, tabbouleh, and freshly baked pita bread with olive oil",
    price: 165,
    category: "appetizers",
    image: "https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Chef's Choice", "Vegetarian"]
  },
  {
    id: 2,
    name: "Seafood Bisque",
    description: "Creamy soup with prawns, mussels and scallops, finished with a touch of saffron and cream",
    price: 140,
    category: "appetizers",
    image: "https://images.unsplash.com/photo-1679395822144-ef490c02b262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Signature"]
  },
  {
    id: 3,
    name: "Herb-Crusted Lamb Rack",
    description: "Premium Australian lamb rack crusted with fresh herbs, served with potato gratin and seasonal vegetables",
    price: 360,
    category: "mains",
    image: "https://images.unsplash.com/photo-1615937691194-97dbd3f3dc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Signature"]
  },
  {
    id: 4,
    name: "Seafood Risotto",
    description: "Arborio rice cooked with fresh seafood, saffron, and finished with aged parmesan",
    price: 280,
    category: "seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Chef's Choice"]
  },
  {
    id: 5,
    name: "Filet Mignon",
    description: "200g premium beef tenderloin with truffle mashed potatoes, asparagus, and red wine reduction",
    price: 420,
    category: "mains",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Signature"]
  },
  {
    id: 6,
    name: "Chocolate Pyramid",
    description: "Dark chocolate mousse pyramid with hazelnut center, gold leaf, and raspberry coulis",
    price: 130,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1587314168485-3236d6710814?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Chef's Choice"]
  },
  {
    id: 7,
    name: "Pan-Seared Sea Bass",
    description: "Fresh Mediterranean sea bass with citrus beurre blanc, served with saffron risotto and grilled asparagus",
    price: 340,
    category: "seafood",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Chef's Choice"]
  },
  {
    id: 8,
    name: "Molten Lava Cake",
    description: "Warm chocolate cake with a molten center, served with vanilla bean ice cream and caramelized hazelnuts",
    price: 120,
    category: "desserts",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Vegetarian"]
  },
  {
    id: 9,
    name: "Saffron-infused Mojito",
    description: "Premium rum, fresh mint, lime juice, and a touch of saffron syrup",
    price: 95,
    category: "beverages",
    image: "https://images.unsplash.com/photo-1546171753-62642a3d7d61?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    tags: ["Signature"]
  }
];
