import { View, Text, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const Searchbar = () => {
  return (
    <View className="bg-white w-full flex-row items-center space-x-2 rounded-full h-[52px] px-4">
      <MaterialIcons name="search" size={28} color="#999" />
      <TextInput placeholder="Search" className="text-lg font-semibold w-full" />
    </View>
  );
};

export default Searchbar;
