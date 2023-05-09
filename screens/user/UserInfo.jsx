import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { ROUTES } from "../../constants";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../../redux/actions/userAction";
import { STATUSES, userState } from "../../redux/slices/userSlice";

const UserInfo = ({ navigation, route }) => {
  const [profileImage, setProfileImage] = useState("");
  const { status } = useSelector(userState);
  const dispatch = useDispatch();
  const { user } = route.params;

  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }

    if (status === "granted") {
      const response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!response.canceled) {
        setProfileImage(response.assets[0].uri);
      }
    }
  };

  const uploadProfileImage = () => {
    const formData = new FormData();
    formData.append("avatar", {
      name: new Date() + "profile",
      uri: profileImage,
      type: "image/jpg",
    });

    dispatch(updateAvatar({ userId: user?._id, data: formData }));

    if (status === STATUSES.IDLE) {
      navigation.goBack();
    }
  };

  const handleOpenLink = async (url) => {
    try {
      await Linking.openURL(url);
    } catch {
      throw new Error("URI cant open:" + url);
    }
  };

  return (
    <SafeAreaView className="mt-8 px-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center justify-between">
          <Ionicons
            name="arrow-back"
            size={28}
            color="#333"
            onPress={() => navigation.goBack()}
          />

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTES.EDITPROFILE, { user: user })
            }
            className="bg-blue-500 py-[12px] px-8 rounded-full"
          >
            <Text className="text-white font-bold text-md">Edit</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View className="items-center justify-center space-y-3">
            <View className="w-[140px] h-[140px] bg-gray-300 rounded-full relative">
              {profileImage ? (
                <Image
                  source={{ uri: profileImage }}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <Image
                  source={{
                    uri: user?.avatar
                      ? user?.avatar
                      : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png",
                  }}
                  className="w-full h-full rounded-full object-cover"
                />
              )}

              <TouchableOpacity
                onPress={openImageLibrary}
                className="absolute bottom-4 right-1 bg-blue-500 rounded-full w-[30px] h-[30px] items-center justify-center mx-auto"
              >
                <FontAwesome name="edit" size={18} color="black" />
              </TouchableOpacity>
            </View>

            {profileImage && (
              <TouchableOpacity
                onPress={uploadProfileImage}
                className="mx-auto mt-2 bg-blue-500 px-8 py-2 rounded-full"
              >
                <Text className="text-white font-bold">Upload</Text>
              </TouchableOpacity>
            )}

            <View>
              <Text className="text-center text-xl font-bold">
                {user?.name}
              </Text>
              <Text className="opacity-60">{user?.address}</Text>
            </View>
          </View>
        </View>

        <View className="my-8">
          <UserDetail icon="envelope" name={user?.email} />
          {user?.mobile && <UserDetail icon="phone" name={user?.mobile} />}
          {user?.dob && <UserDetail icon="calendar" name={user?.dob} />}
          <UserDetail icon="map-marker" name="California, USA" />
        </View>

        <View className="border border-gray-300 p-2 rounded">
          <Text className="text-[16px] leading-6 text-gray-500 font-semibold">
            {user?.description}
          </Text>
        </View>

        {user?.hobbies?.length > 0 && (
          <View className="my-6">
            <Text className="text-xl font-bold">Hobbies</Text>

            <View className="flex-row items-center space-x-4 flex-wrap space-y-4">
              {user?.hobbies?.map((hobby, index) => {
                return (
                  <View
                    key={index}
                    className="py-[6px] px-[16px]  bg-gray-200 rounded-full"
                  >
                    <Text className="text-[12px] font-bold opacity-60">
                      # {hobby}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <View className="mb-10">
          <Text className="text-lg font-semibold">Follow</Text>

          <View className="flex-row items-center space-x-4 mt-4">
            <TouchableOpacity
              onPress={() => handleOpenLink(user?.twitterLink)}
              className="bg-white rounded-full w-[40px] h-[40px] items-center justify-center"
            >
              <FontAwesome name="twitter" size={24} color="#1A8cD8" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleOpenLink(user?.facebookLink)}
              className="bg-white rounded-full w-[40px] h-[40px] items-center justify-center"
            >
              <FontAwesome name="facebook" size={24} color="#1B74E4" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserInfo;

export const UserDetail = ({ icon, name }) => {
  return (
    <View className="flex-row items-center space-x-2 mb-3">
      <FontAwesome name={icon} size={20} color="#666" />
      <Text className="text-[15px] font-semibold opacity-60">{name}</Text>
    </View>
  );
};
