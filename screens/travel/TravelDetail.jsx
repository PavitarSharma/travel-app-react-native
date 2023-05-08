import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ROUTES } from "../../constants";
import { TravelCard } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { travelState } from "../../redux/slices/travelSlice";
import { useState } from "react";
import { bookedAdventure } from "../../redux/actions/travelAction";
import { STATUSES } from "../../redux/slices/userSlice";

const TravelDetail = ({ navigation, route }) => {
  const { item } = route.params;
  const { travel, status } = useSelector(travelState);
  const dispatch = useDispatch();
  const [booked, setBooked] = useState(false);
  console.log(travel);

  const handleBookedTrip = () => {
    setBooked(!booked);
    dispatch(bookedAdventure({ id: item?._id, body: booked }));

    if (status === STATUSES.IDLE) {
      alert("You booked a trip");
    }
  };
  return (
    <ScrollView>
      <SafeAreaView className="mt-8 px-4 mb-10">
        <View className="flex-row items-center justify-between">
          <Ionicons
            name="arrow-back"
            size={28}
            color="#333"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View className="mt-4">
          <TravelCard item={item} onPressNavigation={() => null} />
        </View>

        <View className="w-full h-[1px] bg-gray-300"></View>

        <View>
          <Text className="font-bold text-lg my-2">Description</Text>
          <Text className="text-gray-500 leading-5">{item?.description}</Text>
        </View>

        <TouchableOpacity
          disabled={travel?.isBooked}
          onPress={handleBookedTrip}
          className="w-full bg-black h-[50px] items-center justify-center rounded-full mt-4"
        >
          <Text className="text-white font-bold">Book Now</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default TravelDetail;
