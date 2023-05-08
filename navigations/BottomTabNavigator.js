import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { ROUTES } from "../constants";
import { Favorite, Home, Profile } from "../screens";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;

          if (route.name === ROUTES.HOME_TAB) {
            iconName = focused ? "ios-home-sharp" : "ios-home-outline";
          } else if (route.name === ROUTES.FAVORITE) {
            iconName = focused ? "ios-heart-sharp" : "ios-heart-outline";
          } else if (route.name === ROUTES.PROFILE) {
            return focused ? (
              <FontAwesome name="user" size={24} color="black" />
            ) : (
              <FontAwesome name="user-o" size={size} color={color} />
            );
          }
          return <Ionicons name={iconName} size={24} color="black" />;
        },
        tabBarShowLabel: false,
        
      })}
    >
      <Tab.Screen name={ROUTES.HOME_TAB} component={Home} />
      <Tab.Screen name={ROUTES.FAVORITE} component={Favorite} />
      <Tab.Screen name={ROUTES.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
