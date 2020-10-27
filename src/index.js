import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";

const icon = (name, size = null, color = null) => (
  <MaterialCommunityIcons
    name={name}
    color={color ?? "#6746e8"}
    size={size ?? 28}
  />
);

export default function Calculator() {
  const [result, setResult] = useState("");

  const numPress = (num) => {
    setResult((res) => res + num);
  };

  const backSpace = () => {
    setResult(result.toString().substring(0, result.toString().length - 1));
  };

  const percent = () => {
    setResult(result / 100);
  };

  const computeFactorial = (num) => {
    if (num <= 0) return 1;

    return computeFactorial(num - 1) * num;
  };

  const factorial = () => {
    try {
      setResult(computeFactorial(result));
    } catch (error) {
      setResult("Foi mals, nao rolou!");
    }
  };

  const keys = [
    [
      {
        icon: icon("alpha-c", 54, "#ff5959"),
        onPress: () => setResult(""),
        type: "keyClear",
      },
      { icon: icon("backspace"), onPress: backSpace, type: "nan" },
      { icon: icon("percent"), onPress: percent, type: "nan" },
      { icon: icon("division", 32), onPress: () => numPress("/"), type: "nan" },
    ],
    [
      {
        icon: "7",
        onPress: () => numPress("7"),
        type: "num",
      },
      { icon: "8", onPress: () => numPress("8"), type: "num" },
      { icon: "9", onPress: () => numPress("9"), type: "num" },
      {
        icon: icon("close"),
        onPress: () => numPress("*"),
        type: "nan",
      },
    ],
    [
      { icon: "4", onPress: () => numPress("4"), type: "num" },
      { icon: "5", onPress: () => numPress("5"), type: "num" },
      { icon: "6", onPress: () => numPress("6"), type: "num" },
      { icon: icon("minus"), onPress: () => numPress("-"), type: "nan" },
    ],
    [
      { icon: "1", onPress: () => numPress("1"), type: "num" },
      { icon: "2", onPress: () => numPress("2"), type: "num" },
      { icon: "3", onPress: () => numPress("3"), type: "num" },
      { icon: icon("plus"), onPress: () => numPress("+"), type: "nan" },
    ],
    [
      { icon: icon("exclamation", 36), onPress: factorial, type: "nan" },
      { icon: "0", onPress: () => numPress("0"), type: "num" },
      { icon: ".", onPress: () => numPress("."), type: "nan" },
      {
        icon: icon("equal", 32, "#fff"),
        onPress: () => setResult(eval(result)),
        type: "keyEq",
      },
    ],
  ];

  const renderItem = (item, index) => (
    <TouchableOpacity
      onPress={item.onPress}
      style={[styles.key, styles[item.type]]}
      key={index.toString()}
    >
      <Text style={styles.keyText}>{item.icon}</Text>
    </TouchableOpacity>
  );

  const renderRow = (row, index) => (
    <View style={styles.keyboardRow} key={index.toString()}>
      {row.map(renderItem)}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <Text style={styles.displayText}>{result || "0"}</Text>
      </View>
      <View style={styles.keyboard}>{keys.map(renderRow)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#f0f0f2",
  },

  display: {
    width: "100%",
    height: 240,
    padding: 16,
  },

  displayText: {
    fontSize: 46,
    textAlign: "right",
    color: "#888",
    fontWeight: "bold",
  },

  keyboard: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    backgroundColor: "#fff",
    elevation: 3,
    shadowRadius: 3,
  },

  keyboardRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },

  key: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },

  keyText: {
    fontSize: 28,
    color: "#666",
    fontWeight: "bold",
  },

  keyEq: {
    backgroundColor: "#6746e8",
  },
});
