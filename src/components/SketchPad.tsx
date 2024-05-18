import { useRef, useState } from "react";

const size = 400;

export default function SketchPad() {
  const [isDrawing, setIsDrawing] = useState(false);
  const pathsRef = useRef<number[][][]>([]);
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
    if (pathsRef.current.length === 0) pathsRef.current.push([mouse]);
    else {
      const lastPath = pathsRef.current[pathsRef.current.length - 1];
      lastPath.push(mouse);
    }
  };

  const redraw = (path: number[][], color = "black") => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = color;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(path[0][0], path[0][1]);
    for (let i = 1; i < path.length; i++) {
      ctx.lineTo(path[i][0], path[i][1]);
    }
    ctx.stroke();
  };

  const redrawPaths = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (const path of pathsRef.current) {
      if (path.length === 0) continue;
      redraw(path);
    }
  };

  const mouseDownHandler = (event: React.MouseEvent) => {
    pushToPath(event);
    setIsDrawing(true);
    redrawPaths();
  };

  const mouseMoveHandler = (event: React.MouseEvent) => {
    if (!isDrawing) return;
    pushToPath(event);
    redrawPaths();
  };

  const mouseUpHandler = () => {
    setIsDrawing(false);
    pathsRef.current.push([]);
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
