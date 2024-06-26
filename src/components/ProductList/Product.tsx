/* eslint-disable @typescript-eslint/no-explicit-any */
import toast, { Toaster } from "react-hot-toast";
import { CopyIcon } from "lucide-react";
import { useState } from "react";

export default function Product({ children, item, index, onItemSelect }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const [existingItemTopics, setExistingItemTopics] = useState<string[]>([]);

  const productUrl = `https://app.crystallize.com/@pltn-dev/en/catalogue/product/${item?.id}`;
  const firstFiveTopics = item?.topics?.slice(0, 5);
  const remainingTopics = item?.topics?.slice(5);

  const prodSku = item?.components
    ?.flatMap((component: any) => {
      return component?.content?.components?.flatMap((comp: any) => {
        return comp?.content?.components?.flatMap((c: any) => {
          if (c?.id === "productid") {
            return c?.content?.text;
          }
          return null;
        });
      });
    })
    .filter((sku: any) => sku != null);

  console.log(existingItemTopics);

  return (
    <>
      {children}
      <li className="flex flex-col bg-[#fff] px-3 py-1.5 gap-5">
        <Toaster position="top-center" />
        <div className="grid grid-cols-4 gap-2 items-center">
          <div className="flex gap-2">
            <input
              name="product-checkbox"
              type="checkbox"
              onChange={() => {
                onItemSelect({
                  id: item?.id,
                  topics: item.topics.map((topic: any) => topic.id),
                });
              }}
            />
            <h4 className="text-sm">
              {index}. {item?.name}
            </h4>
          </div>
          <div className="flex gap-3 items-center">
            <a
              target="_blank"
              href={productUrl}
              className="text-xs text-secondary-soil bg-secondary-sand rounded-full py-1 px-3 shadow-sm hover:bg-plantagen-soil hover:text-secondary-shell"
            >
              {prodSku}
            </a>
            <button
              className="text-secondary-sand p-1 rounded hover:shadow"
              onClick={() => {
                navigator.clipboard.writeText(prodSku);
                toast.success("Copied to clipboard");
              }}
            >
              <CopyIcon className="w-4 h-4" />
            </button>
          </div>

          <div className="flex gap-2 justify-self-end col-span-2">
            {firstFiveTopics?.map((topic: any) => (
              <ItemTopic
                key={topic.id}
                topic={topic}
                existingItemTopics={existingItemTopics}
                setExistingItemTopics={setExistingItemTopics}
              />
            ))}
            {remainingTopics.length > 0 && (
              <button
                onClick={() => setIsOpen((open) => !open)}
                className={`p-1 hover:bg-secondary-eucalyptus text-secondary-shell text-xs rounded ${
                  isOpen
                    ? "bg-secondary-eucalyptus shadow-inner"
                    : "bg-secondary-pine shadow"
                }`}
              >
                + {remainingTopics.length}
              </button>
            )}
          </div>
        </div>

        {isOpen && (
          <div className="grid grid-cols-6 gap-2 p-2 bg-[#fcfcfcfc] border border-plantagen-beige rounded">
            {remainingTopics?.map((topic: any) => (
              <ItemTopic
                key={topic.id}
                topic={topic}
                existingItemTopics={existingItemTopics}
                setExistingItemTopics={setExistingItemTopics}
              />
            ))}
          </div>
        )}
      </li>
    </>
  );
}

interface ItemTopicProps {
  topic: any;
  existingItemTopics: string[];
  setExistingItemTopics: React.Dispatch<React.SetStateAction<string[]>>;
}

function ItemTopic({
  topic,
  existingItemTopics,
  setExistingItemTopics,
}: ItemTopicProps) {
  const handleCheckboxChange = (topicId: string) => {
    setExistingItemTopics((prevSelected: string[]) => {
      if (prevSelected.includes(topicId)) {
        return prevSelected.filter((id) => id !== topicId);
      } else {
        return [...prevSelected, topicId];
      }
    });
  };

  return (
    <div>
      <label
        htmlFor={`topic-checkbox-${topic.id}`}
        className={`flex items-center py-1 px-2 border rounded shadow-sm hover:bg-plantagen-soil hover:text-secondary-shell cursor-pointer bg-[#fff] ${
          topic.id && existingItemTopics.includes(topic.id)
            ? "bg-secondary-terracotta text-secondary-shell"
            : ""
        }`}
      >
        <span className="text-xs">{topic?.name}</span>
        <input
          id={`topic-checkbox-${topic.id}`}
          className="hidden"
          type="checkbox"
          checked={existingItemTopics.includes(topic.id || "")}
          onChange={() => {
            handleCheckboxChange(topic?.id);
          }}
        />
      </label>
    </div>
  );
}
