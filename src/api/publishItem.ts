import { ClientInterface } from "@crystallize/js-api-client";
import { Id } from "@crystallize/schema";

export default async function publishItem(
  prodId: Id,
  apiClient: ClientInterface
) {
  if (!apiClient.config.tenantId) {
    throw new Error("tenantId not set on the ClientInterface.");
  }

  const res = await apiClient.pimApi(
    `#graphql
   mutation PUBLISH_ITEMS($prodId: ID!, $language: String!) {
  item {
    publish(id: $prodId, language: $language) {
      id
    }
  }
}
`,
    { prodId: prodId, language: "en" }
  );
  return res;
}
