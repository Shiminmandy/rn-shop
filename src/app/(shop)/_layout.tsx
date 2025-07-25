import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../providers/auth-provider";

function TabBarIcon(props: { 
  name: React.ComponentProps<typeof FontAwesome>["name"]; 
  color: string;
 }) {
  return <FontAwesome size={24} style={{ color: '#1BC464' }} {...props} />;
 }

const TabsLayout = () => {

  const { session, mounting } = useAuth();

  if(mounting) return (

      <ActivityIndicator/>

  );
  if(!session) return <Redirect href='/auth' />;

  return (
    <SafeAreaView edges={["top","bottom","left","right"]} style={styles.INamedsafeArea}>
      <Tabs 
      screenOptions={{
        tabBarActiveTintColor: "#1BC464",
        tabBarInactiveTintColor: "#gray",
        tabBarLabelStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingTop: 10,
        },
        headerShown: false,
      }}
      >
        <Tabs.Screen
        name="index"  //index is the name of the screen
        options={{ 
            title: 'shop',
            tabBarIcon(props) {
              return <TabBarIcon {...props} name="shopping-cart" />;
            },
        }}
        />
        <Tabs.Screen 
        name="orders"  //orders is the name of the screen
        options={{
          title: 'Orders',
            tabBarIcon(props) {
              return <TabBarIcon {...props} name="book" />;
            },
         }} 
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  INamedsafeArea: {
    flex: 1,
    backgroundColor: "#1BC464",
  },
});