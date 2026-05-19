"use client";
import { useState, useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product, ProductCategory } from "@/types";

interface ProductsTableProps {
  products: Product[];
}

const CATEGORIES: ProductCategory[] = ["Electronics", "Clothing", "Home", "Books", "Food"];

const STATUS_CLASSES: Record<string, string> = {
  "In Stock":     "bg-green-100 text-green-700",
  "Low Stock":    "bg-yellow-100 text-yellow-700",
  "Out of Stock": "bg-red-100 text-red-700",
};

export function ProductsTable({ products }: ProductsTableProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | "all">("all");

  const filtered = useMemo(() => {
    if (selectedCategory === "all") return products;
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="space-y-4">
      <Select value={selectedCategory} onValueChange={(val) => setSelectedCategory(val as ProductCategory | "all")}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Filter by category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {CATEGORIES.map(cat => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <div className="border border-slate-200 rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              <TableHead>SKU</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(product => (
              <TableRow key={product.id}>
                <TableCell className="font-medium text-slate-900">{product.sku}</TableCell>
                <TableCell className="text-slate-900">{product.name}</TableCell>
                <TableCell className="text-slate-600">{product.category}</TableCell>
                <TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-slate-600">{product.stock} units</TableCell>
                <TableCell>
                  <Badge variant="outline" className={STATUS_CLASSES[product.status]}>
                    {product.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
