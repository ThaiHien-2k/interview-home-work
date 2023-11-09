import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { PostProvider } from "./contexts/post_context";

ReactDOM.render(
  <React.StrictMode>
    <PostProvider>
      <App />
    </PostProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
