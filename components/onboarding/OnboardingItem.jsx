import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";

const OnboardingItem = ({ item }) => {
  return (
    <View className="relative">
      <Image
        source={item.image}
        className="flex-1 h-full object-contain
      "
      />
      <View className="absolute h-44 w-full bottom-0 bg-[#39383867]">
        <Text className="text-white font-semibold text-[36px] w-[50%] leading-tight px-4">
          {item.name}
        </Text>
        <Text className="text-[#AAAAAA] px-4 ">{item.description}</Text>
      </View>
    </View>
  );
};

export default OnboardingItem;
