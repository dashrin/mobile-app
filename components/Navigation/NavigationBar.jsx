import React, { useState, useEffect } from 'react';
import { StyleSheet, Pressable, Animated, View, Text } from 'react-native';
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";



const NavigationBar = ({ navigation }) => {
  const [scaleAnim1] = useState(new Animated.Value(1)); 
  const [scaleAnim2] = useState(new Animated.Value(1)); 
  const [scaleAnim3] = useState(new Animated.Value(1)); 
  const [scaleAnim4] = useState(new Animated.Value(1)); 
  const [activeButton, setActiveButton] = useState(false);
  //fonts

  const handlePressIn = (scaleAnim, buttonName) => () => {
    Animated.spring(scaleAnim, {
      toValue: 1.2, 
      useNativeDriver: true,
    }).start();
    setActiveButton(buttonName);
  };

  const handlePressOut = (scaleAnim) => () => {
    Animated.spring(scaleAnim, {
      toValue: 1, 
      useNativeDriver: true,
    }).start();
  };

  const signinPageButton = () => {
    navigation.navigate('SigninPage');
  };

  //fonts

  

  return (
    <>
      <View style={styles.NavContainer}>
        <View style={styles.NavBar}>
          <Pressable
            onPressIn={handlePressIn(scaleAnim1, 'home')}
            onPressOut={handlePressOut(scaleAnim1)}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim1 }] }}>
              <View style={styles.IconBehavior}>
                <Entypo style={{ color: activeButton === 'home' ? '#92A3FD': '#98A3B3'  }} name="home" size={20} />
                <Text style={[styles.texts, { color: activeButton === 'home' ? '#92A3FD': '#98A3B3', fontFamily: 'Poppins', marginBottom: 2  }]}>Home</Text>
              </View>
            </Animated.View>
          </Pressable>

          <Pressable
            onPressIn={handlePressIn(scaleAnim2, 'appointment')}
            onPressOut={handlePressOut(scaleAnim2)}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim2 }] }}>
              <View style={styles.IconBehavior}>
                <FontAwesome6 style={{ color: activeButton === 'appointment' ? '#92A3FD': '#98A3B3'  }} name="calendar-alt" size={19} />
                <Text style={[styles.texts, { color: activeButton === 'appointment' ? '#92A3FD': '#98A3B3', fontFamily: 'Poppins'  }]}>Appointment</Text>
              </View>
            </Animated.View>
          </Pressable>

          <Pressable
            onPressIn={handlePressIn(scaleAnim3, 'doctors')}
            onPressOut={handlePressOut(scaleAnim3)}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim3 }] }}>
              <View style={styles.IconBehavior}>
                <FontAwesome style={{ color: activeButton === 'doctors' ? '#92A3FD': '#98A3B3'  }} name="user-md" size={20} />
                <Text style={[styles.texts, { color: activeButton === 'doctors' ? '#92A3FD': '#98A3B3', fontFamily: 'Poppins'  }]}>Doctors</Text>
              </View>
            </Animated.View>
          </Pressable>

          <Pressable
            onPressIn={handlePressIn(scaleAnim4, 'profile')}
            onPressOut={handlePressOut(scaleAnim4)}
          >
            <Animated.View style={{ transform: [{ scale: scaleAnim4 }] }}>
              <View style={styles.IconBehavior}>
                <FontAwesome style={{ color: activeButton === 'profile' ? '#92A3FD': '#98A3B3'  }} name="user" size={20} />
                <Text style={[styles.texts, { color: activeButton === 'profile' ? '#92A3FD': '#98A3B3', fontFamily: 'Poppins'  }]}>Profile</Text>
              </View>
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 40,
    width: 270,
    textAlign: "center"
  },
  NavContainer: {
    position: 'absolute',
    alignItems: "center",
    width: '100%',
    bottom: 0,
  },
  NavBar: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    justifyContent: 'space-evenly',
    alignItems: "center",
    backgroundColor: '#ffffff',
    elevation: 40,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 10,
  },
  IconBehavior: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  texts: {
    fontSize: 9,
    marginTop: 2,
  },
});

export default NavigationBar;
