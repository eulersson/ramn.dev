export const VideoEmbed = ({ src }: { src: string }) => (
  <div
    style={{
      position: "relative",
      paddingTop: "56.25%",
      height: 0,
      overflow: "hidden",
    }}
  >
    <iframe
      src={src}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: 0,
      }}
      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
      allowFullScreen
      referrerPolicy="strict-origin-when-cross-origin"
      title="vimeo-player"
    ></iframe>
  </div>
);
