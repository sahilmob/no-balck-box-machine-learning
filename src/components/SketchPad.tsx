const size = 400;

export default function SketchPad() {
  return (
    <canvas
      width={size}
      height={size}
      style={{
        backgroundColor: "white",
        boxShadow: "0 0 10px 2px black",
      }}
    />
  );
}
