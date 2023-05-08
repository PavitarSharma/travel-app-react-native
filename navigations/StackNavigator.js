import { createStackNavigator } from "@react-navigation/stack";
import {
  EditProfile,
  PostAdventure,
  SignIn,
  SignUp,
  TravelDetail,
  UserInfo,
} from "../screens";
import { ROUTES } from "../constants";
import BottomTabNavigator from "./BottomTabNavigator";
import { useSelector } from "react-redux";
import { userState } from "../redux/slices/userSlice";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const { token } = useSelector(userState);

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
      }}
      initialRouteName={token ? ROUTES.HOME : ROUTES.SIGNIN}
    >
      <Stack.Screen
        name={ROUTES.SIGNUP}
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.SIGNIN}
        component={SignIn}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTES.HOME}
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTES.TRAVELDETAIL}
        component={TravelDetail}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTES.UPLOADADVENTURE}
        component={PostAdventure}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={ROUTES.USERINFO}
        component={UserInfo}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={ROUTES.EDITPROFILE}
        component={EditProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
