import { Stack } from "expo-router";

const InitialInfoLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="initialInfo" options={{ headerShown: false }} />
    </Stack>
  );
};

export default InitialInfoLayout;
