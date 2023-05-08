import { View, Text, useWindowDimensions } from "react-native";
import React from "react";

const Pagination = ({ data, currentIndex, setcurrentIndex }) => {
  return (
    <View className="flex-row items-center space-x-2 px-4 mt-4">
      {data.map((_, i) => {
        return (
          <View
            onPress={() => setcurrentIndex(i)}
            key={i}
            className={`h-[2px] w-8 rounded-md ${
              i === currentIndex ? "bg-white" : "bg-[#AAAAAA]"
            }`}
          ></View>
        );
      })}
    </View>
  );
};

export default Pagination;
