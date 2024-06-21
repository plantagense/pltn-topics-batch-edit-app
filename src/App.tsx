import { Suspense } from "react";
import Header from "./components/Header/Header";
import ProductList from "./components/ProductList/ProductList";
import { TopicProvider } from "./context/TopicContext";
import { ProductProvider } from "./context/ProductContext";

export default function App() {
  return (
    <div className="container mx-auto">
      <TopicProvider>
        <ProductProvider>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList />
          </Suspense>
        </ProductProvider>
      </TopicProvider>
    </div>
  );
}
