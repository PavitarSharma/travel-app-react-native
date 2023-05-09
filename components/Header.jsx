import { View, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { userState } from "../redux/slices/userSlice";

const Header = ({ onNavigate }) => {
  const { user } = useSelector(userState);
  return (
    <View className="flex-row items-center justify-between px-4 py-2">
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <MaterialIcons name="menu" size={38} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onNavigate}
        className="w-[40px] h-[40px] rounded-full"
      >
        <Image
          source={{
            uri: user?.avatar
              ? user?.avatar
              : "https://res.cloudinary.com/pavitarsharma/image/upload/v1683457291/dm5pkbvd9q10mwqxrbdp.png",
          }}
          className="w-full h-full rounded-full object-cover"
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
