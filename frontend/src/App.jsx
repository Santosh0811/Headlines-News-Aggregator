import React, { useState } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import {
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./App.css";

const App = () => {
  const [progress, setProgress] = useState(0);

  const apiKey = import.meta.env.VITE_BACKEND_URL;

  return (
    <div>
      <Navbar />

      <LoadingBar
        color="#f11946"
        progress={progress}
      />

      <Routes>
        <Route
          path="/"
          element={<Navigate to="/general" replace />}
        />

        <Route
          path="/general"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              category="general"
            />
          }
        />

        <Route
          path="/business"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              category="business"
            />
          }
        />

        <Route
          path="/sports"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              category="sports"
            />
          }
        />

        <Route
          path="/entertainment"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              category="entertainment"
            />
          }
        />

        <Route
          path="/health"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              category="health"
            />
          }
        />

        <Route
          path="/technology"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              category="technology"
            />
          }
        />

        <Route
          path="/science"
          element={
            <News
              setProgress={setProgress}
              apiKey={apiKey}
              category="science"
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
