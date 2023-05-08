import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  LogBox,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES } from "../../redux/slices/userSlice";
import { getFavoriteAdventure } from "../../redux/actions/travelAction";
import { travelState } from "../../redux/slices/travelSlice";
import { Error, Loading, NotFound, TravelCard } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants";

const Favorite = () => {
  const { travels, status } = useSelector(travelState);
  const dispatch = useDispatch();
  const navigation = useNavigation()

  useEffect(() => {
    dispatch(getFavoriteAdventure());
  }, [dispatch]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);
  return (
    <ScrollView>
      <SafeAreaView className="mt-6 px-4">
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
                 isHeart
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
      </SafeAreaView>
    </ScrollView>
  );
};

export default Favorite;
