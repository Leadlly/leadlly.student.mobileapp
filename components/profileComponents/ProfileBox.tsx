import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useAppSelector } from "../../services/redux/hooks";
import { capitalizeFirstLetter } from "../../helpers/utils";
import clsx from "clsx";
import { Link } from "expo-router";

const ProfileBox = () => {
  const user = useAppSelector((state) => state.user.user);
  return (
    <View className="border border-input-border rounded-2xl bg-primary/10 p-4 items-center justify-center mb-3">
      <View
        className={clsx(
          "w-20 h-20 rounded-full items-center justify-center mb-2",
          user?.avatar && user.avatar.url ? "" : "bg-slate-100"
        )}
      >
        {user?.avatar && user.avatar.url ? (
          <Image
            src={user.avatar.url}
            alt={`${user.firstname}'s avatar`}
            resizeMode="cover"
            className="w-full h-full rounded-full"
          />
        ) : (
          <Text className="text-xl font-mada-semibold leading-tight">
            {capitalizeFirstLetter(user?.firstname.charAt(0))}
            {user?.lastname
              ? capitalizeFirstLetter(user.lastname.charAt(0))
              : ""}
          </Text>
        )}
      </View>

      <Text
        className="capitalize text-[22px] font-mada-semibold leading-tight mb-2"
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        <Text className="text-primary font-mada-Bold">Hello,</Text>{" "}
        {user?.firstname} {user?.lastname ? user.lastname : null}
      </Text>

      <Text className="text-lg font-mada-regular leading-6 w-[250px] text-justify">
        Embrace the course as a catalyst for personal growth and empowerment,
        propelling you towards success with unwavering determination.
      </Text>

      <Link href="/personalInfo" asChild>
        <TouchableOpacity className="w-32 h-10 bg-white rounded-lg border border-input-border items-center justify-center -mt-2">
          <Text className="text-sm font-mada-semibold leading-tight text-primary">
            Manage Account
          </Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
};

export default ProfileBox;
