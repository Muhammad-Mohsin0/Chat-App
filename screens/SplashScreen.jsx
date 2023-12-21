import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator, Image } from "react-native";
import { Logo } from "../assets";
import { useLayoutEffect } from "react";
import { firebaseAuth, firestoreDB } from "../config/firebase.config";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { SET_USER } from "../context/actions/userActions";
import { useDispatch } from "react-redux";

const SplashScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    checkLoggedUser();
  }, []);

  const checkLoggedUser = async () => {
    firebaseAuth.onAuthStateChanged((userCred) => {
      if (userCred?.uid) {
        getDoc(doc(firestoreDB, "users", userCred?.uid))
          .then((docSnap) => {
            if (docSnap.exists()) {
              console.log("User Data :", docSnap.data());
              dispatch(SET_USER(docSnap.data()));
            }
          })
          .then(() => {
            setTimeout(() => {
              navigation.replace("HomeScreen");
            }, 1000);
          });
      } else {
        navigation.replace("LoginScreen");
      }
    });
  };
  return (
    <View className="flex-1 items-center justify-center space-y-24">
      <Image source={Logo} className="w-24 h-24 " resizeMode="contain" />
      <ActivityIndicator size={"large"} color={"00ff00"} />
    </View>
  );
};

export default SplashScreen;
