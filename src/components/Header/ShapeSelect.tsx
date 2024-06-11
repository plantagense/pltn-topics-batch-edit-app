import type { Shape } from "@crystallize/schema";

interface ShapeChooserProps {
  shapes: Shape[];
}

export default function ShapeSelect({ shapes }: ShapeChooserProps) {
  return (
    <div>
      <select
        className="p-2 rounded text-sm"
        defaultValue=""
        onChange={(e) =>
          shapes.find((shape) => shape.identifier === e.target.value) as Shape
        }
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
