import { Stack } from "expo-router";

export default function OrdersLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ 
            headerShown:true,
            title: "what's new",
        }} 
       />
    </Stack>
  );
}