/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Product from "./Product";
import fetchProducts from "../../api/fetchProducts";
import { apiClient } from "../../api/CrystallizeClient/crystallize.client";
import { useTopic } from "../../context/TopicContext";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [checkedItems, setCheckedItems] = useState({});
  const { selectedTopic } = useTopic();

  console.log(checkedItems);

  useEffect(() => {
    const fetchProductsByPath = async () => {
      if (!selectedTopic) return;
      try {
        const products = await fetchProducts(selectedTopic, apiClient);
        setProducts(products);
        // Initialize checkedItems with product IDs set to false
        const initialCheckedItems = {};
        products.forEach((product) => {
          initialCheckedItems[product.node.id] = false;
        });
        setCheckedItems(initialCheckedItems);
      } catch (error) {
        console.log("Something went wrong:", error);
      }
    };
    fetchProductsByPath();
  }, [selectedTopic]);

  function handleCheckboxChange(id) {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [id]: !prevCheckedItems[id],
    }));
  }

  function handleSelectAllChange() {
    const allChecked = Object.values(checkedItems).every((item) => item);
    const newCheckedItems = {};
    Object.keys(checkedItems).forEach((key) => {
      newCheckedItems[key] = !allChecked;
    });
    setCheckedItems(newCheckedItems);
  }

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
                checked={
                  Object.values(checkedItems).length > 0 &&
                  Object.values(checkedItems).every((item) => item)
                }
                className="justify-self-start"
                onChange={handleSelectAllChange}
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
              checked={checkedItems[product?.node?.id]}
              onCheckboxChange={handleCheckboxChange}
            >
              {index > 0 ? <hr /> : null}
            </Product>
          ))}
        </ul>
      )}
    </main>
  );
}
