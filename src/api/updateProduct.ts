import { ClientInterface } from "@crystallize/js-api-client";
import { Id } from "@crystallize/schema";

export default async function updateProduct(
  prodId: Id,
  topicIds: Id[],
  apiClient: ClientInterface
) {
  if (!apiClient.config.tenantId) {
    throw new Error("tenantId not set on the ClientInterface.");
  }

  const res = await apiClient.pimApi(
    `#graphql
   mutation UPDATE_ITEM_TOPIC($prodId: ID!, $language: String!, $topicIds: [ID!]) {
  product {
    update(id: $prodId, language: $language, input: { topicIds: $topicIds }) {
      id
      name
    }
  }
}
`,
    { prodId: prodId, language: "en", topicIds: topicIds }
  );
  return res;
}
