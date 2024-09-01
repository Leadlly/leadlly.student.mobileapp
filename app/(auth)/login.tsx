import {
  View,
  Text,
  TextInput,
  Image,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { LoginFormSchema } from "../../schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Link, useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLoginUser } from "../../services/queries/userQuery";
import { useAppDispatch } from "../../services/redux/hooks";
import { loginAction } from "../../services/redux/slices/userSlice";
import Toast from "react-native-toast-message";
import { colors } from "../../constants/constants";

const Login = () => {
  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const { mutateAsync: login, isPending } = useLoginUser();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginFormSchema>) => {
    try {
      const res = await login(data);
      dispatch(loginAction({ token: res.token, ...res.user }));
      Toast.show({
        type: "success",
        text1: res.message,
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error);

      Toast.show({
        type: "error",
        text1: error.message,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-white">
      <Image
        source={require("../../assets/images/leadlly_logo_full.png")}
        alt="Leadlly"
        className="w-36 h-16"
        resizeMode="contain"
      />
      <View className="flex-1 items-center justify-center">
        <View
          className="rounded-xl bg-white px-4 py-10 w-full"
          style={styles.boxShadow}
        >
          <View className="mb-10">
            <Text className="text-5xl font-mada-Bold leading-tight text-center">
              Welcome
            </Text>
            <Text className="text-lg leading-tight font-mada-regular text-center">
              We are glad to see you with us
            </Text>
          </View>

          <View className="mb-4">
            <Controller
              name="email"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <View className="h-12 w-full border border-input-border px-3 rounded-lg flex-row items-center">
                  <View className="mr-3">
                    <AntDesign name="user" size={18} color="#7F7F7F" />
                  </View>
                  <TextInput
                    inputMode="email"
                    placeholder="Enter your email"
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    value={field.value}
                    cursorColor={colors.primary}
                    selectionHandleColor={colors.primary}
                    selectionColor={colors.primary200}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    className="flex-1 text-lg font-mada-regular"
                  />
                </View>
              )}
            />
            {form.formState.errors.email && (
              <Text className="text-red-600 font-mada-medium">
                {form.formState.errors.email.message}
              </Text>
            )}
          </View>

          <View className="mb-4">
            <Controller
              name="password"
              control={form.control}
              rules={{ required: true }}
              render={({ field }) => (
                <View className="h-12 w-full border border-input-border px-3 rounded-lg flex-row items-center">
                  <View className="mr-3">
                    <Feather name="lock" size={18} color="#7F7F7F" />
                  </View>
                  <TextInput
                    placeholder="Password"
                    secureTextEntry={toggleShowPassword ? false : true}
                    onBlur={field.onBlur}
                    onChangeText={field.onChange}
                    value={field.value}
                    cursorColor={colors.primary}
                    selectionHandleColor={colors.primary}
                    selectionColor={colors.primary200}
                    autoCapitalize="none"
                    className="flex-1 text-lg font-mada-regular"
                  />
                  <Pressable
                    onPress={() => setToggleShowPassword(!toggleShowPassword)}
                  >
                    {toggleShowPassword ? (
                      <FontAwesome6
                        name="eye-slash"
                        size={16}
                        color="#7F7F7F"
                      />
                    ) : (
                      <FontAwesome6 name="eye" size={16} color="#7F7F7F" />
                    )}
                  </Pressable>
                </View>
              )}
            />
            {form.formState.errors.password && (
              <Text className="text-red-600 font-mada-medium">
                {form.formState.errors.password.message}
              </Text>
            )}
          </View>

          <Pressable
            onPress={form.handleSubmit(onSubmit)}
            disabled={isPending}
            className="w-full h-12 bg-primary rounded-lg items-center justify-center mb-4 disabled:bg-primary/30"
          >
            {isPending ? (
              <ActivityIndicator size={"small"} color={"#fff"} />
            ) : (
              <Text className="text-lg font-mada-semibold text-white">
                Login
              </Text>
            )}
          </Pressable>
          <View className="mb-2 flex-row justify-between">
            <Text className="text-center text-base text-[#7F7F7F]">
              No account yet?{" "}
              <Link href={"/sign-up"} className="text-primary font-mada-medium">
                Sign Up
              </Link>
            </Text>
            <Link
              href={"/forgot-password"}
              className="text-primary text-base text-center font-mada-medium"
            >
              Forgot Password
            </Link>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  boxShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.65,
    elevation: 6,
  },
});

export default Login;
