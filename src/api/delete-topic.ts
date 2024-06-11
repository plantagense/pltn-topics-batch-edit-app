import { ClientInterface } from "@crystallize/js-api-client";

export default async function deleteTopic(
  topicId: string,
  apiClient: ClientInterface
) {
  if (!apiClient.config.tenantId) {
    throw new Error("tenantId not set on the ClientInterface.");
  }

  const response = await apiClient.pimApi(
    `#graphql
mutation DELETE_TOPIC($topicId: ID!) {
  topic {
    delete(id: $topicId)
  }
}`,
    {
      topicId: topicId,
    }
  );
  return response;
}
