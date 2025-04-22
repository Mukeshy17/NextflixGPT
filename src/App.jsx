import React from "react";
import Body from "./components/Body"; // Ensure the path is correct
import { Provider } from "react-redux";
import { appStore } from "./utils/appStore";

function App() {
  return (
    <Provider store={appStore}>
      <Body/>
    </Provider>
  );
}

export default App;
