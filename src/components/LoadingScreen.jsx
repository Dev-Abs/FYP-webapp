const CutoutLoader = ({ height = "450px", imgUrl = "/imgs/neuro-bg.jpg" }) => (
    <div className="relative" style={{ height }}>
      <div className="absolute inset-0 z-0 bg-gray-100 animate-pulse" />
      <span
        className="font-bold absolute inset-0 z-20 text-center bg-clip-text text-transparent"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          fontSize: "clamp(2rem, 10vw, 8rem)",
          lineHeight: height,
        }}
      >
        Analyzing...
      </span>
    </div>
  );