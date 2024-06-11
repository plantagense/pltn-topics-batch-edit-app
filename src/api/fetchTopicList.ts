import { ClientInterface } from "@crystallize/js-api-client";

export default async function fetchTopicList(apiClient: ClientInterface) {
  if (!apiClient.config.tenantId) {
    throw new Error("tenantId not set on the ClientInterface.");
  }
  const res = await apiClient.pimApi(
    `#graphql
      query($tenantId: ID!, $language: String!) {
        topic {
          getRootTopics(tenantId: $tenantId, language: $language) {
            id
            name
            path
            descendants {
              id
              name
              path
            }
          }
        }
      }`,
    {
      tenantId: apiClient.config.tenantId,
      language: "en",
    }
  );
  if (!res?.topic?.getRootTopics) {
    throw new Error("No topics found");
  }
  return res?.topic?.getRootTopics ?? [];
}
