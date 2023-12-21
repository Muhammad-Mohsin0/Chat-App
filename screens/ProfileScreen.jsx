import { View, Text, ViewBase } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { Entypo, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native";
import { firebaseAuth } from "../config/firebase.config";
import { SET_USER_NULL } from "../context/actions/userActions";

const ProfileScreen = () => {
  const user = useSelector((state) => state.user.user);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await firebaseAuth.signOut().then(() => {
      dispatch(SET_USER_NULL());
      navigation.replace("LoginScreen");
    });
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-start">
      {/*icons */}
      <View className="w-full flex-row items-center justify-between px-5 py-8">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="chevron-left" size={32} color={"#555"} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Entypo name="dots-three-vertical" size={24} color="#555" />
        </TouchableOpacity>
      </View>

      {/*profile section */}

      <View className="items-center justify-center">
        <View className="relative border-2 border-amber-400 p-1 rounded-full">
          <Image
            source={{ uri: user?.profilePic }}
            className="w-20 h-20 "
            resizeMode="contain"
          />
        </View>
        <Text className="text-xl font-semibold text-bold pt-3">
          {user?.fullName}
        </Text>
        <Text className="text-base font-semibold  text-slate-600">
          {user?.providerData.email}
        </Text>
      </View>

      {/*icons section */}
      <View className="w-full flex-row items-center justify-evenly py-6">
        <View className="items-center justify-center">
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
            <MaterialIcons name="messenger-outline" size={24} color={"#555"} />
          </TouchableOpacity>
          <Text className="text-sm text-slate-500 py-1"> Message</Text>
        </View>

        <View className="items-center justify-center">
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
            <Ionicons name="ios-videocam-outline" size={24} color={"#555"} />
          </TouchableOpacity>
          <Text className="text-sm text-slate-500 py-1"> Video Call</Text>
        </View>

        <View className="items-center justify-center">
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
            <Ionicons name="call-outline" size={24} color={"#555"} />
          </TouchableOpacity>
          <Text className="text-sm text-slate-500 py-1"> Call</Text>
        </View>

        <View className="items-center justify-center">
          <TouchableOpacity className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200">
            <Entypo name="dots-three-horizontal" size={24} color="#555" />
          </TouchableOpacity>
          <Text className="text-sm text-slate-500 py-1"> More</Text>
        </View>
      </View>

      {/*media shared */}
      <View className="w-full px-6 space-y-3">
        <View className="w-full flex-row items-center justify-between">
          <Text className="text-base font-semibold text-slate-500">
            Media shared
          </Text>
          <TouchableOpacity>
            <Text className="text-base font-semibold text-slate-500">
              <Text className="text-base font-semibold uppercase text-slate-500">
                View All
              </Text>
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-full flex-row items-center justify-between ">
          <TouchableOpacity className="w-24 h-24 m-1 rounded-xl bg-gray-200 overflow-hidden">
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2023/11/26/20/58/horse-8414296_1280.jpg",
              }}
              className="w-full h-full "
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity className="w-24 h-24 m-1 rounded-xl bg-gray-200 overflow-hidden">
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2021/12/12/08/01/polar-bear-6864536_1280.jpg",
              }}
              className="w-full h-full "
              resizeMode="cover"
            />
          </TouchableOpacity>
          <TouchableOpacity className="w-24 h-24 m-1 rounded-xl bg-gray-200 overflow-hidden">
            <Image
              source={{
                uri: "https://cdn.pixabay.com/photo/2017/05/31/18/38/sea-2361247_1280.jpg",
              }}
              className="w-full h-full "
              resizeMode="cover"
            />
            <View className="absolute w-full h-full items-center justify-center bg-[#00000068]">
              <Text className="text-base text-white font-semibold"> 250+</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/*setting options */}
      <View className="w-full px-6 py-4  flex-row items-center justify-between">
        <View className=" flex-row items-center">
          <MaterialIcons name="security" size={24} color={"#555"} />
          <Text className="text-base font-semibold px-3 text-slate-600">
            Privacy
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={32} color={"#555"} />
      </View>

      <View className="w-full px-6 py-4  flex-row items-center justify-between">
        <View className=" flex-row items-center">
          <MaterialIcons name="message" size={24} color={"#555"} />
          <Text className="text-base font-semibold px-3 text-slate-600">
            Groups
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={32} color={"#555"} />
      </View>

      <View className="w-full px-6 py-4  flex-row items-center justify-between">
        <View className=" flex-row items-center">
          <MaterialIcons name="music-note" size={24} color={"#555"} />
          <Text className="text-base font-semibold px-3 text-slate-600">
            Media's & Downloads
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={32} color={"#555"} />
      </View>

      <View className="w-full px-6 py-4  flex-row items-center justify-between">
        <View className=" flex-row items-center">
          <MaterialIcons name="person" size={24} color={"#555"} />
          <Text className="text-base font-semibold px-3 text-slate-600">
            Account
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={32} color={"#555"} />
      </View>

      <TouchableOpacity
        onPress={handleLogout}
        className="w-full px-6 py-4 flex-row items-center justify-center"
      >
        <Text className="text-lg font-semibold text-amber-600 px-3 ">
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;
