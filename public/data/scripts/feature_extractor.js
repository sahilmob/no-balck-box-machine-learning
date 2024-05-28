import fs from "fs";

import { SAMPLES, JSON_DIR, FEATURES, FEATURES_JS } from "../../constants.js";
import { getPathCount, getPointCount } from "../../features.js";

const samples = JSON.parse(fs.readFileSync(SAMPLES, "utf8"));

for (const sample of samples) {
  const paths = JSON.parse(
    fs.readFileSync(JSON_DIR + "/" + +sample.id + ".json", "utf8")
  );
  sample.point = [getPathCount(paths), getPointCount(paths)];
}

const featureNames = ["Path Count", "Point Count"];

fs.writeFileSync(
  FEATURES,
  JSON.stringify({
    featureNames,
    samples: samples.map((s) => ({ point: s.point, label: s.label })),
  })
);

fs.writeFileSync(
  FEATURES_JS,
  `export const features=${JSON.stringify({
    featureNames,
    samples,
  })}`
);
