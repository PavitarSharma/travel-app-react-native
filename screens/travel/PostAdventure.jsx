import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import StarRating from "react-native-star-rating-widget";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { Button } from "../../components";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const data = [
  { key: 1, value: "Temple" },
  { key: 2, value: "Vacations" },
  { key: 3, value: "Climbing" },
  { key: 4, value: "Safari" },
  { key: 5, value: "Rafting" },
  { key: 6, value: "Skking" },
  { key: 7, value: "Jockey" },
  { key: 8, value: "Hiking" },
  { key: 9, value: "Beach" },
];

const PostAdventure = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    loaction: "",
  });

  const handleChange = (value, filedName) => {
    setFormData({
      ...formData,
      [filedName]: value,
    });
  };

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
        setImage(response.assets[0].uri);
      }
    }
  };

  const handleSubmit = async () => {
    const { title, description, price, loaction } = formData;
    const travelData = new FormData();
    travelData.append("image", {
      name: new Date() + "_profile",
      uri: image,
      type: "image/jpg",
    });
    travelData.append("title", title);
    travelData.append("description", description);
    travelData.append("price", price);
    travelData.append("loaction", loaction);
    travelData.append("category", selected);
    travelData.append("rating", rating);

    // if (status === STATUSES.IDLE) {
    //   setImage("");
    // }
  };

  return (
    <ScrollView>
      <SafeAreaView className="mt-8 px-4 mb-14">
        <View>
          <Ionicons
            name="arrow-back"
            size={28}
            color="#333"
            onPress={() => navigation.goBack()}
          />
        </View>

        <View className="mt-8">
          <View className="w-full h-[200px] bg-gray-300 rounded-md relative mx-auto mb-4">
            <Image
              source={image ? { uri: image } : null}
              className="w-full h-full rounded-md object-cover"
            />
          </View>

          <TouchableOpacity
            onPress={openImageLibrary}
            className="bg-gray-300 rounded-md w-full h-[40px] items-center justify-center mx-auto mb-8"
          >
            <Text className="font-semibold">Upload Image</Text>
          </TouchableOpacity>
          <Input
            placeholder="Title"
            value={formData.title}
            onChangeText={(value) => handleChange(value, "title")}
          />
          <Input
            placeholder="Price"
            value={formData.price}
            onChangeText={(value) => handleChange(value, "price")}
            type="numeric"
          />
          <Input
            placeholder="Loaction"
            value={formData.loaction}
            onChangeText={(value) => handleChange(value, "loaction")}
          />

          <SelectList
            setSelected={(val) => setSelected(val)} 
            data={data}
            save="value"
            placeholder="Select Traveling Category"
            boxStyles={{
              backgroundColor: "white",
            }}
            inputStyles={{
              opacity: 0.5,
            }}
            dropdownStyles={{
              backgroundColor: "white",
            }}
          />

          <TextInput
            multiline={true}
            numberOfLines={4}
            value={formData.description}
            placeholder="Description"
            onChangeText={(value) => handleChange(value, "description")}
            className="bg-white px-4 mb-4 mt-4 rounded"
          />

          <View className="mb-2">
            <Text className="text-lg text-gray-400 mb-2">Rate your trip</Text>
            <StarRating
              starSize={34}
              color="gray"
              rating={rating}
              onChange={setRating}
            />
          </View>
        </View>

        <View className="mt-3">
          <Button title="Save" isSubmitting={false} onSubmit={handleSubmit} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PostAdventure;

export const Input = ({ type, placeholder, onChangeText, value }, props) => {
  return (
    <View className="w-full bg-white rounded-md h-[46px] mb-4">
      <TextInput
        {...props}
        value={value}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        keyboardType={type}
        className="h-full px-4 text-black"
      />
    </View>
  );
};
