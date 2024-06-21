/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Product from "./Product";
import fetchProducts from "../../api/fetchProducts";
import { apiClient } from "../../api/CrystallizeClient/crystallize.client";
import { useTopic } from "../../context/TopicContext";
import AddTopics from "./AddTopics";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProductTopicPairs, setSelectedProductTopicPairs] = useState(
    []
  );
  const { selectedTopic } = useTopic();

  // console.log(selectedProductTopicPairs);

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

  const handleCheckboxChange = (product) => {
    setSelectedProductTopicPairs((prevSelected) => {
      const isProductSelected = prevSelected.some(
        (item) => item.id === product.id
      );

      if (isProductSelected) {
        return prevSelected.filter((item) => item.id !== product.id);
      } else {
        return [...prevSelected, product];
      }
    });
  };

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
            <h3 className="font-bold">Name</h3>
            <h3 className="font-bold">Product ID</h3>
            <h3 className="text-center font-bold">Topics</h3>
          </div>
          {products?.map((product: any, index: number) => (
            <Product
              key={product?.node?.id}
              item={product?.node}
              index={index + 1}
              onCheckboxChange={handleCheckboxChange}
            >
              {index > 0 ? <hr /> : null}
            </Product>
          ))}
          {selectedProductTopicPairs.length > 0 && <AddTopics />}
        </ul>
      )}
    </main>
  );
}
