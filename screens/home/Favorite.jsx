import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  LogBox,
  RefreshControl,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, reset } from "../../redux/slices/userSlice";
import { getFavoriteAdventure } from "../../redux/actions/travelAction";
import { travelState } from "../../redux/slices/travelSlice";
import { Error, Loading, NotFound, TravelCard } from "../../components";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "../../constants";

const Favorite = () => {
  const { favorites, status } = useSelector(travelState);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

console.log(favorites);



  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    setTimeout(() => {
      setRefreshing(false);
      dispatch(getFavoriteAdventure());
    }, 2000);
  }, [dispatch]);

  return (
    <SafeAreaView className="mt-14 px-4">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={"blue"}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View className="px-4 mb-4">
          {status === STATUSES.LOADING ? (
            <View className="mt-32">
              <Loading />
            </View>
          ) : status === STATUSES.ERROR ? (
            <View className="mt-32">
              <Error />
            </View>
          ) : favorites?.length > 0 ? (
            favorites &&
            favorites?.map((item, index) => {
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Favorite;
