import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Header, Searchbar } from "../../components";
import { travels } from "../../utils/data";
import { userState } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { travelState } from "../../redux/slices/travelSlice";
import { getAllTravelAdventure } from "../../redux/actions/travelAction";

const Home = () => {
  const { user } = useSelector(userState);
  const [category, setCategory] = useState("");
  const { travel, status } = useSelector(travelState);
  const dispatch = useDispatch();
console.log(travel);
  useEffect(() => {
    dispatch(getAllTravelAdventure());
  }, [dispatch]);

  const handleSelectCategory = (value) => {
    setCategory(value);
  };

  return (
    <SafeAreaView className="mt-6">
      <ScrollView>
        <Header />
        <View className="mt-4 px-4">
          <Searchbar />
        </View>

        <View className="px-4 my-8">
          {
            <FlatList
              horizontal
              legacyImplementation={false}
              showsHorizontalScrollIndicator={false}
              data={travels}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    className={`w-[70px] h-[70px] rounded-full ${
                      category === item.title ? "bg-orange-100" : "bg-white"
                    } items-center justify-center mr-3`}
                    onPress={() => handleSelectCategory(item.title)}
                  >
                    <Image
                      source={item.image}
                      className="w-[50%] h-[50%] object-contain"
                    />
                  </TouchableOpacity>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          }
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
