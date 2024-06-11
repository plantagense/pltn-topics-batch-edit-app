import { ClientInterface } from "@crystallize/js-api-client";

export default async function fetchProducts(
  path: string,
  apiClient: ClientInterface
) {
  if (!apiClient.config.tenantId) {
    throw new Error("tenantId not set on the ClientInterface.");
  }

  const res = await apiClient.catalogueApi(
    `#graphql
   query ($path: String!, $language: String!) {
  topic(path: $path, language: $language) {
    items {
      edges {
        node {
          id
          name
          topics {
            id
            name
          }
          components {
            content {
              ... on PieceContent {
                components {
                  content {
                    ... on PieceContent {
                      components {
                        id
                        content {
                          ... on SingleLineContent {
                            text
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`,
    { path: path, language: "en" }
  );
  return res?.topic?.items?.edges ?? [];
}
