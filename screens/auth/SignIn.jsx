import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  ToastAndroid,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Button, MyInputs } from "../../components";
import { Link } from "@react-navigation/native";
import { Formik } from "formik";
import { validationSchema } from "../../utils/validation";
import http from "../../axios";
import { useEffect, useState } from "react";
import { ROUTES } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../../redux/actions/userAction";
import { STATUSES, reset, userState } from "../../redux/slices/userSlice";

const userInfo = {
  email: "",
  password: "",
};

const SignIn = ({ navigation }) => {
  const dispatch = useDispatch();
  const { status, message } = useSelector(userState);
  const [formData, setFormData] = useState(userInfo);

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleChange = (value, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
  };

  const handleOnSubmit = () => {
    dispatch(signIn(formData));
    if (status === STATUSES.IDLE) {
      ToastAndroid.show("Logged in successfully", ToastAndroid.SHORT);
      navigation.navigate(ROUTES.HOME);
    }
  };

  if (status === STATUSES.ERROR) {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }

  return (
    <SafeAreaView className="px-4 relative">
      <StatusBar hidden={false} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          className="bg-[#e5ecf4] mt-4 w-[70px] h-[50px] items-center justify-center rounded"
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="keyboard-arrow-left"
            size={38}
            color="#1c4974"
            className="font-bold"
          />
        </TouchableOpacity>

        <View className="mt-4">
          <Text className="font-semibold text-3xl text-[#184978]">
            Hello Again!
          </Text>
          <Text className="font-semibold text-3xl text-[#184978]">Welcome</Text>
          <Text className="font-semibold text-3xl text-[#184978]">back</Text>
        </View>

        <View className="mt-8">
          <MyInputs
            icon="email"
            value={formData.email}
            // onBlur={handleBlur("email")}
            // errors={errors.email && touched.email && errors.email}
            onChangeText={(value) => handleChange(value, "email")}
            placeholder="example@gmail.com"
          />
          <MyInputs
            icon="password"
            value={formData.password}
            // errors={errors.password && touched.password && errors.password}
            // onBlur={handleBlur("password")}
            onChangeText={(value) => handleChange(value, "password")}
            placeholder="************"
          />

          <View className="mt-3">
            <Button
              title="Sign in"
              isSubmitting={status === STATUSES.LOADING}
              onSubmit={handleOnSubmit}
            />
          </View>

          <View className="flex-row items-center mt-4 justify-center mb-8">
            <Text className="text-gray-700 mr-1">Don't have account?</Text>
            <Link to={{ screen: "SignUp" }}>
              <Text className="underline font-bold">Sign up</Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
