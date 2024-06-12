/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Product from "./Product";
import fetchProducts from "../../api/fetchProducts";
import { apiClient } from "../../api/CrystallizeClient/crystallize.client";
import { useTopic } from "../../context/TopicContext";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { selectedTopic } = useTopic();

  useEffect(() => {
    const fetchProductsByPath = async () => {
      if (!selectedTopic) return;
      try {
        const products = await fetchProducts(selectedTopic, apiClient);
        setProducts(products);
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    };
    fetchProductsByPath();
  }, [selectedTopic]);

  return (
    <main className="flex flex-col gap-10 bg-secondary-shell rounded shadow p-1">
      {!products || products?.length === 0 ? (
        <div className="flex items-center justify-center h-[10rem]">
          <h3 className="text-xl font-bold">
            No items found with given criteria.
          </h3>
        </div>
      ) : (
        <ul className="flex flex-col">
          <div className="grid grid-cols-3 gap-4 p-3 text-xs">
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                checked={false}
                className="justify-self-start"
                onChange={() => {}}
              />
              <h3 className="text-left font-bold">Name</h3>
            </div>
            <h3 className="text-left font-bold">Product ID</h3>
            <h3 className="text-center font-bold">Topics</h3>
          </div>
          {products?.map((product: any, index: number) => (
            <Product
              key={product?.node?.id}
              item={product?.node}
              index={index + 1}
              checked={false}
              onCheckboxChange={() => {}}
            >
              {index > 0 ? <hr /> : null}
            </Product>
          ))}
        </ul>
      )}
    </main>
  );
}
