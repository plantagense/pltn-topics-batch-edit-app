import { createClient } from "@crystallize/js-api-client";

export const apiClient = createClient({
  tenantId: import.meta.env.CRYSTALLIZE_TENANT_ID,
  tenantIdentifier: import.meta.env.CRYSTALLIZE_TENANT_IDENTIFIER,
  accessTokenId: import.meta.env.CRYSTALLIZE_ACCESS_TOKEN_ID,
  accessTokenSecret: import.meta.env.CRYSTALLIZE_ACCESS_TOKEN_SECRET,
});
