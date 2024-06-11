import type { Shape } from "@crystallize/schema";
import { useEffect, useState } from "react";
import fetchShapeList from "../../api/fetchShapeList";
import { apiClient } from "../../api/CrystallizeClient/crystallize.client";

export default function ShapeSelect() {
  const [shapes, setShapes] = useState<Shape[]>([]);

  useEffect(() => {
    const fetchShapes = async () => {
      try {
        const res = await fetchShapeList(apiClient);
        setShapes(res.shapes);
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    };
    fetchShapes();
  }, []);

  return (
    <div>
      <select
        className="p-2 rounded text-sm"
        defaultValue=""
        onChange={(e) => {
          shapes.find((shape) => shape.identifier === e.target.value);
        }}
      >
        <option value="" disabled>
          Select shape
        </option>
        <optgroup label="Folders">
          {shapes
            .filter((shape) => shape.type === "folder")
            .map((shape) => (
              <option key={shape.identifier} value={shape.identifier}>
                {shape.name}
              </option>
            ))}
        </optgroup>
        <optgroup label="Products">
          {shapes
            .filter((shape) => shape.type === "product")
            .map((shape) => (
              <option key={shape.identifier} value={shape.identifier}>
                {shape.name}
              </option>
            ))}
        </optgroup>
        <optgroup label="Document">
          {shapes
            .filter((shape) => shape.type === "document")
            .map((shape) => (
              <option key={shape.identifier} value={shape.identifier}>
                {shape.name}
              </option>
            ))}
        </optgroup>
      </select>
    </div>
  );
}
