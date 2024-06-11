/* eslint-disable @typescript-eslint/no-explicit-any */
import fetchProducts from "../../api/fetchProducts";
import { apiClient } from "../../api/CrystallizeClient/crystallize.client";
import Product from "./Product";

export default async function ProductList() {
  const products = await fetchProducts("/category-teams/mlarm", apiClient);

  console.log(products);

  return (
    <main className="flex flex-col gap-10 bg-secondary-shell shadow p-6">
      {!products ? (
        <div className="flex items-center justify-center h-[10rem]">
          <h3 className="text-xl font-bold">
            No items found with given criteria.
          </h3>
        </div>
      ) : (
        <div>
          <ul className="flex flex-col gap-2">
            {products?.map((product: any, index: number) => (
              <Product
                key={product?.node?.id}
                item={product?.node}
                index={index + 1}
              />
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}

// "use client";
// import { apiClient } from "@/app/data/crystallize.client";
// import fetchProducts from "@/app/data/fetchProducts";
// import Product from "./product";
// import { useEffect, useState } from "react";
// import { useTopic } from "@/context/topicContext";

// export default function ProductList() {
//   const [products, setProducts] = useState([]);
//   const { selectedTopic } = useTopic();

//   useEffect(() => {
//     const fetchProductsByPath = async () => {
//       const products = await fetchProducts(selectedTopic, apiClient);
//       setProducts(products);
//     };
//     fetchProductsByPath();
//   }, [selectedTopic]);

//   // "/category-teams/mlarm"

//   // const products = await fetchProducts("/category-teams/mlarm", apiClient);

//   return (
//     <main className="flex flex-col gap-10 bg-secondary-shell shadow p-6">
//       {!products || products?.length === 0 ? (
//         <div className="flex items-center justify-center h-[10rem]">
//           <h3 className="text-xl font-bold">
//             No items found with given criteria.
//           </h3>
//         </div>
//       ) : (
//         <div>
//           <ul className="flex flex-col gap-2">
//             {products?.map((product: any, index: number) => (
//               <Product
//                 key={product?.node?.id}
//                 item={product?.node}
//                 index={index + 1}
//               />
//             ))}
//           </ul>
//         </div>
//       )}
//     </main>
//   );
// }
