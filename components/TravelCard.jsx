import { View, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating";
import currencyFormat from "../utils/currencyFormat";


const TravelCard = ({ item, onPressNavigation }) => {

  return (
    <View className="w-full h-auto mb-6">
      <View className="h-[250px] w-full rounded-xl relative">
        <TouchableOpacity onPress={onPressNavigation}>
          <Image
            source={{ uri: item?.image }}
            className="w-full h-full object-cover rounded-3xl"
          />
        </TouchableOpacity>
      
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
