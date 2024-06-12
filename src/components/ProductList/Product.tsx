/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

export default function Product({ children, item, index }: any) {
  const [isOpen, setIsOpen] = useState(false);
  const productUrl = `https://app.crystallize.com/@pltn-dev/en/catalogue/product/${item?.id}`;
  const firstFiveTopics = item?.topics?.slice(0, 4);
  const remainingTopics = item?.topics?.slice(4);

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

  return (
    <>
      {children}
      <li className="flex flex-col bg-[#fff] px-3 py-1.5 gap-5">
        <div className="grid grid-cols-3 gap-2 items-center">
          <div className="flex gap-2">
            <input
              type="checkbox"
              checked={false}
              onChange={() => {}}
              id="itemIndex"
            />
            <h4 className="text-sm">
              {index}. {item?.name}
            </h4>
          </div>
          <div>
            <a
              target="_blank"
              href={productUrl}
              className="text-xs text-secondary-soil bg-secondary-sand rounded-full px-2 shadow"
            >
              {prodSku}
            </a>
          </div>
          <div className="flex gap-2 justify-self-end">
            {firstFiveTopics?.map((topic: any) => (
              <ItemTopic key={topic.name} topic={topic} />
            ))}
            {remainingTopics.length > 0 && (
              <button
                onClick={() => setIsOpen((open) => !open)}
                className={`p-2  hover:bg-secondary-eucalyptus text-secondary-shell text-xs rounded ${
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
          <div className="flex gap-3 p-3 border border-plantagen-beige rounded flex-wrap">
            {remainingTopics?.map((topic: any) => (
              <ItemTopic key={topic.name} topic={topic} />
            ))}
          </div>
        )}
      </li>
    </>
  );
}

function ItemTopic({ topic }: any) {
  return (
    <div>
      <button className="flex gap-1 items-center py-2 px-3 border rounded shadow-sm hover:bg-state-success">
        <span className="text-xs">{topic?.name}</span>
      </button>
    </div>
  );
}
