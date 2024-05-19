import { groupBy } from "../utils.js";
import { samples } from "../../public/js_objects/samples.js";

const groupedSamples = groupBy(samples, "student_id");

export default function Viewer() {
  return (
    <div>
      {Object.keys(groupedSamples).map((studentId) => {
        const studentSamples = groupedSamples[studentId];
        const studentName = studentSamples[0].student_name;
        return (
          <div key={studentId}>
            <h3>{studentName}</h3>
            <div key={studentId}>
              {studentSamples.map(({ id, label }) => {
                return (
                  <div key={id + label}>
                    <img
                      alt={label}
                      className="thumb"
                      src={"../public/data/dataset/img/" + id + ".png"}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
