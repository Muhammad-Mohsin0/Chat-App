import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { BGImage, Logo } from "../assets";
import { UserTextInput } from "../components";
import { useNavigation } from "@react-navigation/native";
import { avatars } from "../utils/supports";
import { MaterialIcons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { doc, setDoc } from "firebase/firestore";

const SignUpScreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);
  const screenHeight = Math.round(Dimensions.get("window").height);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url);
  const [isAvatarMenu, setIsAvatarMenu] = useState(false);
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const navigation = useNavigation();

  const handleAvatar = (item) => {
    setAvatar(item?.image.asset.url);
    setIsAvatarMenu(false);
  };

  const handleSignUp = async () => {
    if (getEmailValidationStatus && email !== "") {
      try {
        const userCred = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password
        );

        const data = {
          _id: userCred?.user.uid,
          fullName: name,
          profilePic: avatar,
          providerData: userCred.user.providerData[0],
        };

        await setDoc(doc(firestoreDB, "users", userCred?.user.uid), data);
        navigation.navigate("LoginScreen");
      } catch (error) {
        console.error("Signup error:", error.message);
        // Handle signup error if needed
      }
    }
  };

  return (
    <View className="flex-1 items-center justify-start">
      <Image
        source={BGImage}
        resizeMode="cover"
        className="h-96"
        style={{ width: screenWidth }}
      />

      {isAvatarMenu && (
        <>
          {/* list of avatar section */}
          <View
            className="absolute inset-0 z-10 "
            style={{ width: "100%", height: "100%" }}
          >
            <ScrollView>
              <BlurView
                className="w-full h-full px-2 py-10 flex-row flex-wrap items-center justify-evenly "
                tint="light"
                intensity={30}
                style={{ width: "100%", height: "100%" }}
              >
                {avatars?.map((item) => (
                  <TouchableOpacity
                    onPress={() => handleAvatar(item)}
                    key={item._id}
                    className="w-20 m-3 h-20 p-1  rounded-full border-2 border-amber-300 relative"
                  >
                    <Image
                      source={{ uri: item?.image.asset.url }}
                      className="w-full h-full"
                      resizeMode="contain"
                    />
                  </TouchableOpacity>
                ))}
              </BlurView>
            </ScrollView>
          </View>
        </>
      )}

      {/* Main View  */}
      <View
        className="w-full h-full bg-white rounded-tl-[90px]
       -mt-60 flex items-center justify-start py-6 px-6 space-y-6"
      >
        <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
        <Text className="py-2 text-slate-600 text-xl font-semibold">
          Register
        </Text>

        {/* avatar section  */}
        <View className="w-full flex items-center justify-center relative -my-4">
          <TouchableOpacity
            onPress={() => setIsAvatarMenu(true)}
            className="w-20 h-20 p-1 rounded-full border-2 border-amber-400 relative"
          >
            <Image
              source={{ uri: avatar }}
              className="w-full h-full "
              resizeMode="contain"
            />
            <View className="w-6 h-6 bg-amber-400 rounded-full absolute top-0 right-0 flex items-center justify-center">
              <MaterialIcons name="edit" size={18} color={"#f59e0b"} />
            </View>
          </TouchableOpacity>
        </View>

        <View className="w-full flex items-center justify-center">
          {/* full name  */}
          <UserTextInput
            placeholder="Full Name"
            isPass={false}
            setStateValue={setName}
          />

          {/* email */}
          <UserTextInput
            placeholder="Email"
            isPass={false}
            setStateValue={setEmail}
            setGetEmailValidationStatus={setGetEmailValidationStatus}
          />

          {/* password */}
          <UserTextInput
            placeholder="Password"
            isPass={true}
            setStateValue={setPassword}
          />

          {/* Sign up button */}
          <TouchableOpacity
            onPress={handleSignUp}
            className="w-full px-4 py-2 rounded-xl bg-amber-400 my-3 flex items-center justify-center"
          >
            <Text className="py-2 text-slate-500 text-xl font-semibold">
              Sign Up
            </Text>
          </TouchableOpacity>

          <View className="w-full py-2 flex-row items-center justify-center space-x-2">
            <Text className="text-base text-slate-600 ">Have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("LoginScreen")}
            >
              <Text className=" text-base text-amber-700 font-semibold">
                LogIn Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignUpScreen;
