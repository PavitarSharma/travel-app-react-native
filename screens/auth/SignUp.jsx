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
import { signUp } from "../../redux/actions/userAction";
import { STATUSES, reset, userState } from "../../redux/slices/userSlice";

const userInfo = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(userState)
  const { status, message } = useSelector(userState);

  // useEffect(() => {
  //   dispatch(reset());
  // }, [dispatch]);

  const handleOnSubmit = async (values, formikActions) => {
    const { name, email, password } = values;

    const formData = {
      name,
      email,
      password,
    };

    dispatch(signUp(formData));

    // try {
    //   const { data } = await http.post("/user/signUp", formData);
    //   setMessage(data.message)
    //   setStatus(data.status)
    //   setError(false)
    //   console.log(data);
    // } catch (error) {
    //   console.log(error);
    //   setMessage(data.message)
    //   setStatus(data.status)
    //   setError(true)
    // }
    if (status === STATUSES.IDLE) {
      ToastAndroid.show("User registered successfully", ToastAndroid.SHORT);
      // navigation.navigate(ROUTES.SIGNIN);
    }

    if (status === STATUSES.ERROR) {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    // formikActions.resetForm();
    formikActions.setSubmitting(false);
  };

console.log(user);

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
          <Text className="font-semibold text-3xl text-[#184978]">Hello!</Text>
          <Text className="font-semibold text-3xl text-[#184978]">
            Signup to
          </Text>
          <Text className="font-semibold text-3xl text-[#184978]">
            get started to explore
          </Text>
        </View>

        <Formik
          initialValues={userInfo}
          validationSchema={validationSchema}
          onSubmit={(values, formikActions) =>
            handleOnSubmit(values, formikActions)
          }
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => {
            const { name, email, password, confirmPassword } = values;

            return (
              <View className="mt-8">
                <MyInputs
                  icon="user"
                  errors={errors.name && touched.name && errors.name}
                  onBlur={handleBlur("name")}
                  value={name}
                  onChangeText={handleChange("name")}
                  placeholder="John Smith"
                />
                <MyInputs
                  icon="email"
                  value={email}
                  onBlur={handleBlur("email")}
                  errors={errors.email && touched.email && errors.email}
                  onChangeText={handleChange("email")}
                  placeholder="example@gmail.com"
                />
                <MyInputs
                  icon="password"
                  value={password}
                  errors={
                    errors.password && touched.password && errors.password
                  }
                  onBlur={handleBlur("password")}
                  onChangeText={handleChange("password")}
                  placeholder="************"
                />
                <MyInputs
                  icon="password"
                  value={confirmPassword}
                  onBlur={handleBlur("confirmPassword")}
                  errors={
                    errors.confirmPassword &&
                    touched.confirmPassword &&
                    errors.confirmPassword
                  }
                  onChangeText={handleChange("confirmPassword")}
                  placeholder="************"
                />
                <View className="mt-3">
                  <Button
                    title="Sign up"
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                  />
                </View>

                <View className="flex-row items-center mt-4 justify-center mb-8">
                  <Text className="text-gray-700 mr-1">
                    Already have an account?
                  </Text>
                  <Link to={{ screen: "SignIn" }}>
                    <Text className="underline font-bold">Sign in</Text>
                  </Link>
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
