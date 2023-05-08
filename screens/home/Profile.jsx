import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  AsyncStorage,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ROUTES } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { logout, userState } from "../../redux/slices/userSlice";
import { useEffect } from "react";
import { getUser } from "../../redux/actions/userAction";

const str =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt, magnam itaque? Rerum inventore voluptatum corporis iste, placea quia nostrum deserunt ";
const Profile = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(userState);

  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate(ROUTES.SIGNIN);
  };

  useEffect(() => {
    dispatch(getUser(user?._id));
  }, [dispatch, user?.id]);

  return (
    <ScrollView>
      <SafeAreaView className="mt-8 px-4">
        <View className="flex-row items-center justify-between">
          <Ionicons
            name="arrow-back"
            size={28}
            color="#333"
            onPress={() => navigation.goBack()}
          />

          <TouchableOpacity
            onPress={handleLogout}
            className="bg-orange-700 w-[80px] h-[40px] rounded-full items-center justify-center"
          >
            <Text className="text-white text-md font-bold">Logout</Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 my-4">
          <View className="w-[80px] h-[80px] rounded-full bg-gray-300">
            <Image
              source={{
                uri: user
                  ? user?.avatar
                  : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png",
              }}
              className="w-full h-full rounded-full object-cover"
            />
          </View>
          <View>
            <Text className="font-bold text-2xl">{user?.name}</Text>
            <Text className="text-gray-500 leading-4 text-start w-[240px]">
              {user?.description &&
                user?.description.length > 50 &&
                user?.description.substring(0, 60) + "...."}
            </Text>
          </View>
        </View>

        <View>
          <View className="flex-row items-center space-x-2">
            <FontAwesome name="map-marker" size={22} color="#666" />
            <Text className="text-[17px] font-semibold text-[#666]">
              {user?.address}
            </Text>
          </View>

          <View className="flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTES.USERINFO, { user: user })
              }
              className="bg-blue-500 w-28 h-[40px] rounded-full items-center justify-center mt-4"
            >
              <Text className="text-center text-white text-[14px] font-bold">
                View more
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(ROUTES.UPLOADADVENTURE, { user: user })
              }
              className="bg-gray-400 w-28 h-[40px] rounded-full items-center justify-center mt-4"
            >
              <Text className="text-center text-white text-[14px] font-bold">
                Post
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-12">
          <Text className="text-2xl font-bold">My trips</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Profile;
