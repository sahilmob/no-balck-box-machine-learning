import { useState } from "react";

import "./App.css";
import Viewer from "./pages/Viewer";
import DataCreator from "./pages/DataCreator";
import { VIEWS } from "./constants.js";

function App() {
  const [view, setView] = useState(VIEWS.DATA_CREATOR); // ['viewer', 'data-creator'
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "10px",
        }}
      >
        <button onClick={() => setView(VIEWS.VIEWER)}>Viewer</button>
        <button onClick={() => setView(VIEWS.DATA_CREATOR)}>
          Data Creator
        </button>
      </div>
      {view === VIEWS.VIEWER && <Viewer />}
      {view === VIEWS.DATA_CREATOR && <DataCreator />}
    </div>
  );
}

export default App;
