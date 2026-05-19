import type { Product } from "@/types";

export const PRODUCTS: Product[] = [
  { id: "p1",  name: "Wireless Headphones",  category: "Electronics", price: 79.99,  stock: 142, status: "In Stock",     sku: "ELEC-001" },
  { id: "p2",  name: "USB-C Hub",            category: "Electronics", price: 34.99,  stock: 8,   status: "Low Stock",    sku: "ELEC-002" },
  { id: "p3",  name: "Mechanical Keyboard",  category: "Electronics", price: 129.00, stock: 55,  status: "In Stock",     sku: "ELEC-003" },
  { id: "p4",  name: "Running Shoes",        category: "Clothing",    price: 89.95,  stock: 0,   status: "Out of Stock", sku: "CLTH-001" },
  { id: "p5",  name: "Yoga Mat",             category: "Home",        price: 25.00,  stock: 200, status: "In Stock",     sku: "HOME-001" },
  { id: "p6",  name: "Coffee Maker",         category: "Home",        price: 59.99,  stock: 3,   status: "Low Stock",    sku: "HOME-002" },
  { id: "p7",  name: "JavaScript: The Good Parts", category: "Books", price: 19.99, stock: 88,  status: "In Stock",     sku: "BOOK-001" },
  { id: "p8",  name: "Leather Wallet",       category: "Clothing",    price: 44.00,  stock: 0,   status: "Out of Stock", sku: "CLTH-002" },
  { id: "p9",  name: "Desk Lamp",            category: "Home",        price: 38.50,  stock: 67,  status: "In Stock",     sku: "HOME-003" },
  { id: "p10", name: "Protein Powder",       category: "Food",        price: 54.99,  stock: 12,  status: "Low Stock",    sku: "FOOD-001" },
];
