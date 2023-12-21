import { View, Text, Dimensions, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Image } from "react-native";
import { BGImage, Logo } from "../assets";
import { UserTextInput } from "../components";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { SET_USER } from "../context/actions/userActions";

const LoginScreen = () => {
  const screenWidth = Math.round(Dimensions.get("window").width);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [getEmailValidationStatus, setGetEmailValidationStatus] =
    useState(false);

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (getEmailValidationStatus && email !== "") {
      await signInWithEmailAndPassword(firebaseAuth, email, password)
        .then((userCred) => {
          if (userCred) {
            console.log("User Id:", userCred.user.uid);
            getDoc(doc(firestoreDB, "users", userCred.user.uid)).then(
              (docSnap) => {
                if (docSnap.exists()) {
                  console.log("User Data :", docSnap.data());
                  dispatch(SET_USER(docSnap.data()));
                }
              }
            );
          }
        })
        .catch((err) => {
          console.log(" Error :", err.message);
          if (err.message.includes("invalid-login-credentials")) {
            setAlert(true);
            setAlertMessage("Invalid Username or Password");
            setTimeout(() => {
              setAlertMessage(null);
              setAlert(false);
            }, 5000);
          }
        });
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

      <View
        className="w-full h-full bg-white rounded-tl-[90px]
       -mt-44 flex items-center justify-start py-6 px-6 space-y-6"
      >
        <Image source={Logo} className="w-16 h-16" resizeMode="contain" />
        <Text className="py-2 text-slate-600 text-xl font-semibold">
          Welcome
        </Text>
        <View className="w-full flex items-center justify-center">
          {/* alert  */}

          {alert && (
            <Text className="text-base text-red-600">{alertMessage}</Text>
          )}

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

          {/* login button */}
          <TouchableOpacity
            onPress={handleLogin}
            className="w-full px-4 py-2 rounded-xl bg-amber-400 my-3 flex items-center justify-center"
          >
            <Text className="py-2 text-slate-500 text-xl font-semibold">
              Sign In
            </Text>
          </TouchableOpacity>

          <View className="w-full py-12 flex-row items-center justify-center space-x-2">
            <Text className="text-base text-slate-600 ">
              Don't have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("SignUpScreen")}
            >
              <Text className=" text-base text-amber-700 font-semibold">
                Create Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
