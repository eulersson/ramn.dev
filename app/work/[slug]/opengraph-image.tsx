// Next.js
import { ImageResponse } from "next/og";

// Project
import { getOneProjectData } from "@/lib/projects";

// Image metadata
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image({ params }: { params: { slug: string } }) {
  const project = await getOneProjectData(params.slug);
  const metadata = project.metadata;

  const playFairDisplayItalic = await fetch(
    "https://www.ramn.dev/fonts/PlayfairDisplay-Italic.ttf",
  ).then((res) => res.arrayBuffer());

  const firaMono = await fetch(
    "https://www.ramn.dev/fonts/FiraMono-Regular.ttf",
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          border: "10px solid #000",
          position: "relative",
          height: "630px",
          width: "1200px",
        }}
      >
        <img
          src={`https://www.ramn.dev/${metadata.headerImage || metadata.heroImage}`}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            display: "flex",
            height: "100%",
            width: "100%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "42px",
          }}
        >
          <h1
            style={{
              fontFamily: "Playfair Display",
              background: "white",
              border: "2px solid #000000",
              boxShadow: "10px 10px 0 #000000",
              fontSize: "90px",
              lineHeight: "1",
              padding: "30px",
              fontWeight: "400",
              fontStyle: "italic",
            }}
          >
            {metadata.title}
          </h1>
          <h3
            style={{
              fontFamily: "Fira Mono",
              textAlign: "center",
              color: "#ffffff",
              fontSize: "40px",
              padding: "0 30px",
            }}
          >
            <span style={{ background: "#000000" }}>
              {metadata.description}
            </span>
          </h3>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Playfair Display",
          data: playFairDisplayItalic,
          style: "italic",
          weight: 400,
        },
        {
          name: "Fira Mono",
          data: firaMono,
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
