import React from "react";
import { CommentProvider } from "./context/ContextApi.jsx";
// import "./App.css";
import Home from "./pages/Home.jsx";
function App() {
  return (
    <>
      <CommentProvider>
        <Home />
      </CommentProvider>
    </>
  );
}

export default App;
