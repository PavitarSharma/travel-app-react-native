import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  SafeAreaView,
  LogBox,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Error,
  Header,
  Loading,
  NotFound,
  Searchbar,
  TravelCard,
} from "../../components";
import { travelsData } from "../../utils/data";
import { STATUSES, userState } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import { travelState } from "../../redux/slices/travelSlice";
import { getAllTravelAdventure } from "../../redux/actions/travelAction";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants";

const Home = () => {
  const { user } = useSelector(userState);
  const navigation = useNavigation();
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");
  const { travels, status } = useSelector(travelState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTravelAdventure({ title: search, category }));
  }, [dispatch, search, category]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const handleSelectCategory = (value) => {
    setCategory(value);
  };

  return (
    <SafeAreaView className="mt-6">
      <ScrollView>
        <Header />
        <View className="mt-4 px-4">
          <Searchbar setSearch={setSearch} search={search} />
        </View>

        <View className="px-4 my-8">
          {
            <FlatList
              horizontal
              legacyImplementation={false}
              showsHorizontalScrollIndicator={false}
              data={travelsData}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    key={item.id}
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

        <ScrollView>
          <View className="px-4 mb-4">
            {status === STATUSES.LOADING ? (
              <View className="mt-32">
                <Loading />
              </View>
            ) : status === STATUSES.ERROR ? (
              <View className="mt-32">
                <Error />
              </View>
            ) : travels?.length > 0 ? (
              travels &&
              travels?.map((item, index) => {
                return (
                  <TravelCard
                    onPressNavigation={() =>
                      navigation.navigate(ROUTES.TRAVELDETAIL, { item: item })
                    }
                    key={item?._id}
                    item={item}
                  />
                );
              })
            ) : (
              <View className="mt-32">
                <NotFound />
              </View>
            )}
          </View>
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
