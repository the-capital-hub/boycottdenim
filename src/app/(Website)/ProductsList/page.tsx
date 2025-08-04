import ProductTableClient from "@/Components/Products/ProductTable";
import Navbar2 from "@/Components/Common/Navbar 2";


export default function AdminProductPage() {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar2/>
        <ProductTableClient />
      </main>
    );
  }