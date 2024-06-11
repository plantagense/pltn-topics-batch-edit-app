import { useState } from "react";

export default function Product({ item, index }: any) {
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
    <li className="flex flex-col bg-[#fff] p-3 rounded border gap-5">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 ">
          <span className="text-sm">{index}.</span>
          <h4 className="text-sm">{item?.name}</h4>
          <a
            target="_blank"
            href={productUrl}
            className="text-sm text-secondary-soil bg-secondary-sand rounded-full px-2 self-end shadow"
          >
            {prodSku}
          </a>
        </div>
        <div className="flex gap-2">
          {firstFiveTopics?.map((topic: any) => (
            <ItemTopic key={topic.name} topic={topic} />
          ))}
          {remainingTopics.length > 0 && (
            <button
              onClick={() => setIsOpen((open) => !open)}
              className={`p-2  hover:bg-secondary-eucalyptus text-secondary-shell text-sm rounded ${
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
        <div className="flex gap-3 p-5 border border-plantagen-beige rounded flex-wrap">
          {remainingTopics?.map((topic: any) => (
            <ItemTopic key={topic.name} topic={topic} />
          ))}
        </div>
      )}
    </li>
  );
}

function ItemTopic({ topic }: any) {
  return (
    <div>
      <button className="flex gap-1 items-center py-2 px-3 border rounded shadow hover:bg-state-success z-50">
        <span className="text-xs">{topic?.name}</span>
      </button>
    </div>
  );
}
