import { ClientInterface } from "@crystallize/js-api-client";

export default async function createTopic(
  topicName: string,
  apiClient: ClientInterface
) {
  if (!apiClient.config.tenantId) {
    throw new Error("tenantId not set on the ClientInterface.");
  }

  const response = await apiClient.pimApi(
    `#graphql
mutation CREATE_TOPIC($language: String!, $tenantId: ID!, $topicName: String!) {
  topic {
    create(language: $language, input: { tenantId: $tenantId, name: $topicName }) {
      name
      id
    }
  }
}`,
    {
      language: "en",
      tenantId: apiClient.config.tenantId,
      topicName: topicName,
    }
  );
  return response;
}
