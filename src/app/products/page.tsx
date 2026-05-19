import { ProductsTable } from "@/components/products/ProductsTable";
import { PRODUCTS } from "@/data/products";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Products</h1>
        <p className="text-slate-600 mt-2">Browse and manage your product catalog.</p>
      </div>

      <ProductsTable products={PRODUCTS} />
    </div>
  );
}
