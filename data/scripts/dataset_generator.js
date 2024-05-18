import fs from "fs";

const DATA_DIR = "../";
const RAW_DATA_DIR = DATA_DIR + "/raw";
const DATASET_DIR = DATA_DIR + "/dataset";
const JSON_DIR = DATASET_DIR + "/json";
const IMG_DIR = DATASET_DIR + "/img";
const SAMPLES = DATASET_DIR + "/samples.json";

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

    fs.writeFileSync(
      JSON_DIR + "/" + id + ".json",
      JSON.stringify(drawings[label], null, 2)
    );
  }
  id++;
});

fs.writeFileSync(SAMPLES, JSON.stringify(samples, null, 2));
