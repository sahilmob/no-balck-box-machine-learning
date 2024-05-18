import { useRef, useState } from "react";

import NameForm from "../components/NameForm";
import SketchPad from "../components/SketchPad";

const labels = [
  "car",
  "fish",
  "house",
  "tree",
  "bicycle",
  "guitar",
  "pencil",
  "clock",
];

export default function DataCreator() {
  const [name, setName] = useState("");
  const session = useRef(new Date().getTime());
  const [drawingIdx, setDrawingIdx] = useState(0);
  const drawings = useRef<Record<string, number[][][]>>({});

  const nameFormSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    if ((formData.get("name") as string)?.length < 3) {
      alert("Name must be at least 3 characters long");
      return;
    }
    setName(formData.get("name") as string);
  };

  const next = (paths: number[][][]) => {
    if (drawingIdx === labels.length) {
      return;
    }
    drawings.current[labels[drawingIdx]] = paths;
    setDrawingIdx((prev) => prev + 1);
  };

  return (
    <>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Data Creator
      </h1>
      {name ? (
        <SketchPad next={next} key={drawingIdx} label={labels[drawingIdx]} />
      ) : (
        <NameForm formSubmitHandler={nameFormSubmitHandler} />
      )}
    </>
  );
}
