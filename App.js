import React from "react";
import { View } from "react-native";
import Constants from "expo-constants";

import Calculator from "./src";

const StatusBar = () => {
  return <View style={{ height: Constants.statusBarHeight }} />;
};

export default function App() {
  return (
    <React.Fragment>
      <StatusBar />
      <Calculator />
    </React.Fragment>
  );
}
