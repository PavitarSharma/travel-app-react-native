import { View, Text } from "react-native";
import React from "react";

const NotFound = ({ title }) => {
  return (
    <View className="items-center justify-center space-y-2">
      <Text className="text-xl text center">😔</Text>
      <Text className="text-lg text-center">{title}</Text>
    </View>
  );
};

export default NotFound;
