import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import moment from "moment";
import { MultipleSelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../../components";
import { useEffect, useState } from "react";
import { data } from "../../utils/data";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useDispatch, useSelector } from "react-redux";
import { STATUSES, userState } from "../../redux/slices/userSlice";
import { updateUser } from "../../redux/actions/userAction";
import { ROUTES } from "../../constants";

const userInfo = {
  name: "",
  mobile: "",
  address: "",
  dob: "",
  description: "",
  facebookLink: "",
  twitterLink: "",
};

const EditProfile = ({ navigation, route }) => {
  const { status, user } = useSelector(userState);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);
  const [date, setDate] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [formData, setFormData] = useState(userInfo);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name,
        mobile: user?.mobile,
        dob: user?.dob,
        description: user?.description,
        facebookLink: user?.facebookLink,
        twitterLink: user?.twitterLink,
        address: user?.address,
      });

      setDate(user?.dob);
    }
  }, [user]);

  const handleSelect = (selectedItems) => {
    setSelected(selectedItems);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleChange = (value, filedName) => {
    setFormData({
      ...formData,
      [filedName]: value,
    });
  };

  const handleSubmit = async () => {
    const { name, mobile, address, description, facebookLink, twitterLink } =
      formData;

    const userData = {
      name,
      mobile,
      address,
      description,
      facebookLink,
      twitterLink,
      dob: date,
      hobbies: selected,
    };

    dispatch(updateUser({ userId: user?._id, data: userData }));
    if (status === STATUSES.IDLE) {
      navigation.navigate(ROUTES.PROFILE);
    }

    setFormData(userInfo);
    setSelected([]);
    setDate("");
  };

  const handleConfirm = (date) => {
    const formattedDate = moment(date).format("DD MMMM, YYYY");
    setDate(formattedDate);
    hideDatePicker();
  };

  if(status === STATUSES.ERROR){
    alert("Something went wrong")
  }

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
          <UserInput
            placeholder="Name"
            value={formData.name}
            onChangeText={(value) => handleChange(value, "name")}
          />
          <UserInput
            placeholder="Phone number"
            value={formData.mobile}
            onChangeText={(value) => handleChange(value, "mobile")}
          />
          {/* <UserInput placeholder="Dob" onPress /> */}
          <UserInput
            placeholder="Address"
            value={formData.address}
            onChangeText={(value) => handleChange(value, "address")}
          />

          <TouchableOpacity
            onPress={showDatePicker}
            className="w-full bg-white rounded-md h-[46px] mb-4 justify-center px-4"
          >
            <Text className={`${date ? "opacity-100" : "opacity-50"}`}>
              {date ? date : "DOB"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />

          <MultipleSelectList
            setSelected={handleSelect}
            data={data}
            save="value"
            label="Hobbies"
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
        </View>

        <TextInput
          multiline={true}
          numberOfLines={4}
          value={formData.description}
          placeholder="Description"
          onChangeText={(value) => handleChange(value, "description")}
          className="bg-white px-4 mb-4 mt-2 rounded"
        />
        <UserInput
          placeholder="Facebook Url"
          value={formData.facebookLink}
          onChangeText={(value) => handleChange(value, "facebookLink")}
        />
        <UserInput
          placeholder="Twitter Url"
          value={formData.twitterLink}
          onChangeText={(value) => handleChange(value, "twitterLink")}
        />

        <View className="mt-3">
          <Button title="Save" isSubmitting={status === STATUSES.LOADING} onSubmit={handleSubmit} />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default EditProfile;

export const UserInput = ({ placeholder, onChangeText, value }) => {
  return (
    <View className="w-full bg-white rounded-md h-[46px] mb-4">
      <TextInput
        value={value}
        onChangeText={(text) => onChangeText(text)}
        placeholder={placeholder}
        className="h-full px-4 text-black"
      />
    </View>
  );
};
