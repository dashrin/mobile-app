import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Appointment = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointment Screen</Text>
      <Text style={styles.text}>This is the appointment screen for scheduling appointments.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default Appointment;
