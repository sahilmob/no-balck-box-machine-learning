import { useRef, useState } from "react";

const size = 400;

export default function SketchPad() {
  const [isDrawing, setIsDrawing] = useState(false);
  const pathRef = useRef<number[][]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getMousePos = (event: React.MouseEvent): number[] => {
    const canvas = canvasRef.current;
    const rect = canvas!.getBoundingClientRect();
    return [
      Math.round(event.clientX - rect.left),
      Math.round(event.clientY - rect.top),
    ];
  };

  const pushToPath = (event: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const mouse = getMousePos(event);
    pathRef.current.push(mouse);
  };

  const redraw = (color = "black") => {
    const canvas = canvasRef.current;
    const path = pathRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i][0], path[i][1]);
    }
    ctx.stroke();
  };

  const mouseDownHandler = (event: React.MouseEvent) => {
    pushToPath(event);
    setIsDrawing(true);
    redraw();
  };

  const mouseMoveHandler = (event: React.MouseEvent) => {
    if (!isDrawing) return;
    pushToPath(event);
    redraw();
  };

  const mouseUpHandler = () => {
    setIsDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      onMouseUp={mouseUpHandler}
      onMouseDown={mouseDownHandler}
      onMouseMove={mouseMoveHandler}
      style={{
        backgroundColor: "white",
        boxShadow: "0 0 10px 2px black",
      }}
    />
  );
}
