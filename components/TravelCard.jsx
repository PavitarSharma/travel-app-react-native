import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import StarRating from "react-native-star-rating";
import currencyFormat from "../utils/currencyFormat";
import { FontAwesome } from "@expo/vector-icons";
import { ROUTES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { favoriteAdventureTrip } from "../redux/actions/travelAction";
import { favoriteTrip, travelState } from "../redux/slices/travelSlice";
import { STATUSES } from "../redux/slices/userSlice";

const TravelCard = ({ item, onPressNavigation }) => {
  const navigation = useNavigation();
  const [favorite, setFavorite] = useState(false);
  const dispatch = useDispatch();
  const { travel, status } = useSelector(travelState);

  const handleFavorite = () => {
    setFavorite(!favorite);
    dispatch(favoriteAdventureTrip({ id: item?._id, body: favorite }));
   
  };


  return (
    <View className="w-full h-auto mb-6">
      <View className="h-[250px] w-full rounded-xl relative">
        <TouchableOpacity onPress={onPressNavigation}>
          <Image
            source={{ uri: item?.image }}
            className="w-full h-full object-cover rounded-3xl"
          />
        </TouchableOpacity>
        <View className="absolute top-3 right-4">
          <TouchableOpacity onPress={handleFavorite}>
            <FontAwesome
              name={item?.favorite ? "heart" : "heart-o"}
              size={26}
              color={item?.favorite ? "red" : "white"}
            />
          </TouchableOpacity>
          {/* {!favorite ? (
            <TouchableOpacity onPress={handleFavorite}>
              <FontAwesome name="heart-o" size={26} color="white" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setFavorite(false)}>
              <FontAwesome name="heart" size={26} color="red" />
            </TouchableOpacity>
          )} */}
        </View>
      </View>

      <View className="mt-2 pl-2">
        <Text className="font-bold text-lg">{item?.title}</Text>

        <Text className="text-gray-500">{item?.loaction}</Text>
        <View className="w-[120px] my-2">
          <StarRating
            disabled={false}
            maxStars={5}
            rating={4.3}
            starSize={18}
            emptyStar={"ios-star-outline"}
            fullStar={"ios-star"}
            halfStar={"ios-star-half"}
            iconSet={"Ionicons"}
            fullStarColor={"black"}
          />
        </View>
        <View className="flex-row items-center space-x-1">
          <Text className="font-bold text-[16px]">
            {currencyFormat(item?.price)}
          </Text>
          <Text className="text-[14px] opacity-40">per night</Text>
        </View>
      </View>
    </View>
  );
};

export default TravelCard;
