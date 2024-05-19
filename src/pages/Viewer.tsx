import { Suspense } from "react";

import { groupBy } from "../utils.js";
import { samples } from "../js_objects/samples.js";

const groupedSamples = groupBy(samples, "student_id");

export default function Viewer() {
  return (
    <div>
      {Object.keys(groupedSamples).map((studentId) => {
        const studentSamples = groupedSamples[studentId];
        const studentName = studentSamples[0].student_name;
        return (
          <Suspense key={studentId}>
            <div key={studentId}>
              {studentSamples.map(({ id, label }) => {
                return (
                  <div key={id + label}>
                    <h3>{studentName}</h3>
                    <img
                      alt={label}
                      src={"../public/data/dataset/img/" + id + ".png"}
                    />
                  </div>
                );
              })}
            </div>
          </Suspense>
        );
      })}
    </div>
  );
}
