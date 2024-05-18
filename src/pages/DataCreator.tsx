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
  const ableToSave = drawingIdx === labels.length - 1;

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
    drawings.current[labels[drawingIdx]] = paths;
    if (ableToSave) {
      save();
      return;
    } else {
      setDrawingIdx((prev) => prev + 1);
    }
  };

  const save = () => {
    const data = {
      name,
      session: session.current,
      drawings: drawings.current,
    };
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," +
        encodeURIComponent(JSON.stringify(data))
    );
    const filename = data.session + ".json";
    element.setAttribute("download", filename);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
        <SketchPad
          next={next}
          key={drawingIdx}
          ableToSave={ableToSave}
          label={labels[drawingIdx]}
        />
      ) : (
        <NameForm formSubmitHandler={nameFormSubmitHandler} />
      )}
    </>
  );
}
