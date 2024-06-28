import { ClientInterface } from "@crystallize/js-api-client";
import { getManyShapesQuery } from "@crystallize/import-export-sdk";
import { Shape } from "@crystallize/schema";

export default async function fetchShapeList(
  apiClient: ClientInterface
): Promise<{
  shapes: Shape[];
}> {
  if (!apiClient.config.tenantId) {
    throw new Error("tenantId not set");
  }

  const getManyShapes = getManyShapesQuery(
    {
      tenantId: apiClient.config.tenantId,
    },
    {
      includeComponents: true,
    }
  );
  const shapes: Shape[] = await apiClient
    .pimApi(getManyShapes.query, getManyShapes.variables)
    .then((res) => res?.shape?.getMany);
  return { shapes };
}
