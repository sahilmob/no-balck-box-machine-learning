import fs from "fs";
import { createCanvas } from "canvas";

import { printProgress } from "../../../src/utils.js";
import {
  RAW_DATA_DIR,
  IMG_DIR,
  JSON_DIR,
  SAMPLES,
  SAMPLES_JS,
} from "../../constants.js";

const canvas = createCanvas(400, 400);

const redraw = (path, color = "black") => {
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

function generateImageFile(outputPath, paths) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  paths.forEach((path) => {
    redraw(path);
  });

  const buffer = canvas.toBuffer("image/png");
  fs.writeFileSync(outputPath, buffer);
}

const fileNames = fs.readdirSync(RAW_DATA_DIR);
const samples = [];
let id = 1;

fileNames.forEach((fileName) => {
  const content = fs.readFileSync(RAW_DATA_DIR + "/" + fileName, "utf-8");
  const { session, student, drawings } = JSON.parse(content);
  for (let label in drawings) {
    samples.push({
      id,
      label,
      student_name: student,
      student_id: session,
    });

    const paths = drawings[label];

    fs.writeFileSync(
      JSON_DIR + "/" + id + ".json",
      JSON.stringify(paths, null, 2)
    );

    generateImageFile(IMG_DIR + "/" + id + ".png", paths);
  }
  printProgress(id, fileNames.length);
  id++;
});

fs.writeFileSync(SAMPLES, JSON.stringify(samples, null, 2));

fs.writeFileSync(
  SAMPLES_JS,
  `export const samples=${JSON.stringify(samples, null, 2)};`
);
