import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { slides } from "../../utils/data";
import { OnboardingItem, Pagination } from "../../components";
import { useNavigation } from "@react-navigation/native";

const Onboarding = () => {
  const navigation = useNavigation()
  const [currentIndex, setcurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef();
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setcurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false
    }, [])
  })

  return (
    <SafeAreaView className="h-full w-full bg-black">
      <View className="h-[88%] w-full relative">
        <FlatList
          data={slides}
          renderItem={({ item }) => <OnboardingItem item={item} />}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator
          bounces={false}
          keyExtractor={(item) => item.id}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
      </View>

      <View className="flex-row items-center justify-between">
        <Pagination
          currentIndex={currentIndex}
          setcurrentIndex={setcurrentIndex}
          data={slides}
          scrollX={scrollX}
        />

        <TouchableOpacity className="mt-4" onPress={() => navigation.navigate("SignUp")}>
          <View className="bg-[#BAFE66] py-[18px] rounded-full w-[120px]">
            <Text className="text-center">Get Started</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
