// Project
import { Caption } from "@/components/prose/caption";

export function ImageFlexRow({
  images = [],
  flexes,
  height = "200px",
  caption,
}: {
  images: string[];
  flexes?: number[];
  height?: string;
  caption?: string;
}) {
  return (
    <div>
      <div style={{ display: "flex", height }}>
        {images.map((src, index) => (
          <div
            key={index}
            style={{
              flex: (flexes && flexes[index]) ?? 1,
              backgroundImage: `url('${src}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>
      {caption && <Caption>{caption}</Caption>}{" "}
    </div>
  );
}
