import { useEffect, useRef } from "react";
import { groupBy } from "../utils.js";
import { samples } from "../../public/js_objects/samples.js";
import { features } from "../../public/js_objects/features.js";

import { Chart } from "../lib/chart/chart.js";
import { graphics } from "../lib/chart/graphics.js";
let chart;
const groupedSamples = groupBy(samples, "student_id");

export default function Viewer() {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const handleClick = (sample, doScroll = true) => {
    [...document.getElementsByClassName("sampleContainer")].forEach((el) => {
      el.classList.remove("selected");
    });

    if (!sample) return;

    const element = document.getElementById("sample_" + sample.id);
    if (element?.classList.contains("selected")) {
      element.classList.remove("selected");
      chart.selectSample(null);
    } else {
      element?.classList.add("selected");
    }
    if (doScroll) {
      element?.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    }
    chart.selectSample(sample);
  };

  useEffect(() => {
    const styles = {
      car: {
        color: "gray",
        text: "🚗",
      },
      fish: {
        color: "red",
        text: "🐠",
      },
      house: {
        color: "yellow",
        text: "🏠",
      },
      tree: {
        color: "green",
        text: "🌴",
      },
      bicycle: {
        color: "cyan",
        text: "🚲",
      },
      guitar: {
        color: "blue",
        text: "🎸",
      },
      pencil: {
        color: "magenta",
        text: "✏️",
      },
      clock: {
        color: "lightgray",
        text: "⏰",
      },
    };
    const options = {
      size: 400,
      axesLabels: features.featureNames,
      styles,
      transparency: 0.7,
      icon: "image",
    };
    graphics.generateImages(styles);
    chart = new Chart(
      chartContainerRef?.current,
      features.samples,
      options,
      (sample) => handleClick(sample, true)
    );
  }, []);
  return (
    <div>
      <div
        style={{
          height: "110100px",
          width: "100%",
        }}
      ></div>
      <div ref={chartContainerRef} id="chartContainer" />
      {Object.keys(groupedSamples).map((studentId) => {
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
              {studentSamples.map((sample) => {
                return (
                  <div
                    onClick={() => handleClick(sample, false)}
                    style={{
                      padding: "10px",
                      backgroundColor: "white",
                      textAlign: "center",
                      borderRadius: "10px",
                    }}
                    key={sample.id + sample.label}
                    id={"sample_" + sample.id}
                    className="sampleContainer"
                  >
                    <div>{sample.label}</div>
                    <img
                      alt={sample.label}
                      style={{
                        width: "100%",
                        display: "block",
                        margin: "auto",
                      }}
                      src={"../public/data/dataset/img/" + sample.id + ".png"}
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
