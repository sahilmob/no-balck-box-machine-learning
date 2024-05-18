import { useRef, useState } from "react";

const size = 400;

export default function SketchPad({
  next,
  label,
}: {
  label: string;
  next: (paths: number[][][]) => void;
}) {
  const [isDrawing, setIsDrawing] = useState(false);
  const pathsRef = useRef<number[][][]>([]);
  const [, forceUpdate] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const forceRerender = () => forceUpdate((prev) => prev + 1);

  const getMousePos = (event: React.MouseEvent | Touch): number[] => {
    const canvas = canvasRef.current;
    const rect = canvas!.getBoundingClientRect();
    return [
      Math.round(event.clientX - rect.left),
      Math.round(event.clientY - rect.top),
    ];
  };

  const pushToPath = (event: React.MouseEvent | Touch) => {
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

  const mouseDownHandler = (event: React.MouseEvent | Touch) => {
    pathsRef.current.push([]);
    pushToPath(event);
    setIsDrawing(true);
    redrawPaths();
  };

  const mouseMoveHandler = (event: React.MouseEvent | Touch) => {
    if (!isDrawing) return;
    pushToPath(event);
    redrawPaths();
  };

  const mouseUpHandler = () => {
    setIsDrawing(false);
  };

  const undoHandler = () => {
    pathsRef.current.pop();
    redrawPaths();
    forceRerender();
  };

  return (
    <>
      <div>Draw a {label}</div>
      <div
        style={{
          marginBlock: "10px",
        }}
      >
        <button
          disabled={!pathsRef.current.length}
          onClick={() => next(pathsRef.current)}
        >
          Next
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onMouseUp={mouseUpHandler}
        onMouseDown={mouseDownHandler}
        onMouseMove={mouseMoveHandler}
        onTouchStart={(event) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          mouseDownHandler(event.touches[0]);
        }}
        onTouchMove={(event) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          mouseMoveHandler(event.touches[0]);
        }}
        onTouchEnd={() => {
          mouseUpHandler();
        }}
        style={{
          backgroundColor: "white",
          boxShadow: "0 0 10px 2px black",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <button disabled={pathsRef.current.length < 1} onClick={undoHandler}>
          Undo
        </button>
      </div>
    </>
  );
}
