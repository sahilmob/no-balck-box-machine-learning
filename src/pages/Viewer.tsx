import { groupBy } from "../utils.js";
import { samples } from "../../public/js_objects/samples.js";

const groupedSamples = groupBy(samples, "student_id");

export default function Viewer() {
  return (
    <div>
      {Object.keys(groupedSamples).map((studentId, idx) => {
        const studentSamples = groupedSamples[studentId];
        const studentName = studentSamples[0].student_name;
        return (
          <div key={studentId}>
            <h3>{studentName}</h3>
            <div
              key={studentId}
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              {studentSamples.map(({ id, label }) => {
                return (
                  <div
                    style={{
                      padding: "10px",
                      backgroundColor: "white",
                      textAlign: "center",
                      borderRadius: "10px",
                    }}
                    key={id + label}
                  >
                    <div>{label}</div>
                    <img
                      alt={label}
                      style={{
                        width: "100%",
                        display: "block",
                        margin: "auto",
                      }}
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
