/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Product from "./Product";
import fetchProducts from "../../api/fetchProducts";
import { apiClient } from "../../api/CrystallizeClient/crystallize.client";
import { useTopic } from "../../context/TopicContext";
import AddTopics from "./AddTopics";
import Loading from "../Loading";
import updateProduct from "../../api/updateProduct";
import publishItem from "../../api/publishItem";
import toast, { Toaster } from "react-hot-toast";
import Button from "../Button";

interface ProductTopicPair {
  id: string;
  topics: string[];
}

export default function ProductList() {
  const { selectedTopic } = useTopic();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState([]);
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [existingItemTopics, setExistingItemTopics] = useState<string[]>([]);
  const [selectedProductTopicPairs, setSelectedProductTopicPairs] = useState<
    ProductTopicPair[]
  >([]);

  useEffect(() => {
    const fetchProductsByPath = async () => {
      if (!selectedTopic) return;
      setIsLoading(true);
      try {
        const products = await fetchProducts(selectedTopic, apiClient);
        setProducts(products);
      } catch (error) {
        console.log("Something went wrong:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProductsByPath();
  }, [selectedTopic]);

  const handleSelectedItem = (product: ProductTopicPair): void => {
    setSelectedProductTopicPairs((prevSelected): any => {
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

  const handleAddTopics = async () => {
    setIsLoading(true);
    const updatedPairs = selectedProductTopicPairs.map(
      (pair: { id: string; topics: string[] }) => ({
        ...pair,
        topics: [...new Set([...pair.topics, ...selectedTopicIds])],
      })
    );

    setSelectedProductTopicPairs(updatedPairs);

    try {
      await Promise.all(
        updatedPairs.map((pair) =>
          updateProduct(pair.id, pair.topics, apiClient)
        )
      );
      await Promise.all(
        updatedPairs.map((pair) => publishItem(pair.id, apiClient))
      );
      if (selectedTopic) {
        const updatedProducts = await fetchProducts(selectedTopic, apiClient);
        setProducts(updatedProducts);
      }
      toast.success("Saved and published successfully");
    } catch (error) {
      console.log("Failed to update product topics:", error);
      toast.error("Failed to update product topics");
    } finally {
      setSelectedTopicIds([]);
      setIsOpen(false);
      setIsLoading(false);
      setSelectedProductTopicPairs([]);
    }
  };

  const handleRemoveTopics = async () => {
    setIsLoading(true);

    // Filter out existingItemTopics from each pair's topics array
    const updatedPairs = selectedProductTopicPairs.map(
      (pair: { id: string; topics: string[] }) => ({
        ...pair,
        topics: pair.topics.filter(
          (topic) => !existingItemTopics.includes(topic)
        ),
      })
    );

    setSelectedProductTopicPairs(updatedPairs);

    try {
      await Promise.all(
        updatedPairs.map((pair) =>
          updateProduct(pair.id, pair.topics, apiClient)
        )
      );
      await Promise.all(
        updatedPairs.map((pair) => publishItem(pair.id, apiClient))
      );
      if (selectedTopic) {
        const updatedProducts = await fetchProducts(selectedTopic, apiClient);
        setProducts(updatedProducts);
      }
      toast.success("Removed and published successfully");
    } catch (error) {
      console.log("Failed to update product topics:", error);
      toast.error("Failed to update product topics");
    } finally {
      setSelectedTopicIds([]);
      setIsOpen(false);
      setIsLoading(false);
      setSelectedProductTopicPairs([]);
    }
  };

  return (
    <main className="flex flex-col gap-10 bg-secondary-shell rounded shadow p-1">
      <Toaster position="top-center" />
      {!products || products?.length === 0 ? (
        <div className="flex items-center justify-center h-[10rem]">
          <h3 className="text-xl font-bold">
            No items found with given criteria.
          </h3>
        </div>
      ) : (
        <ul className="flex flex-col">
          <div className="grid grid-cols-4 gap-4 p-3 text-xs">
            <h3 className="font-bold">Name</h3>
            <h3 className="font-bold">Product ID</h3>
            <h3 className="text-center font-bold col-span-2">Topics</h3>
          </div>
          {isLoading && (
            <div className="flex justify-center p-5">
              <Loading />
            </div>
          )}
          {!isLoading &&
            products?.map((product: any, index: number) => (
              <Product
                key={product?.node?.id}
                item={product?.node}
                index={index + 1}
                onItemSelect={handleSelectedItem}
                existingItemTopics={existingItemTopics}
                setExistingItemTopics={setExistingItemTopics}
              >
                {index > 0 ? <hr /> : null}
              </Product>
            ))}

          {selectedProductTopicPairs.length > 0 && (
            <>
              <div className="p-2">
                <AddTopics
                  selectedTopicIds={selectedTopicIds}
                  setSelectedTopicIds={setSelectedTopicIds}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
                {selectedTopicIds.length > 0 && (
                  <Button
                    onClick={handleAddTopics}
                    className="flex p-2 mt-2 rounded bg-plantagen-soil text-secondary-shell hover:bg-plantagen-red gap-4"
                  >
                    {isLoading ? <Loading /> : <span>Save and Publish</span>}
                  </Button>
                )}
              </div>
              <Button
                onClick={handleRemoveTopics}
                className="p-1 bg-plantagen-soil text-secondary-shell rounded hover:bg-plantagen-red"
              >
                <span>Test Delete</span>
              </Button>
            </>
          )}
        </ul>
      )}
    </main>
  );
}
