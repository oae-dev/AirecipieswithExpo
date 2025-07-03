import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GenrateRecipies from './GenrateRecipies';

type Props = {
  steps: string[];
};

const Steps = ({ steps }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Steps</Text>

      <View>
        {steps.map((item, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.number}>{index + 1}</Text>
            <Text style={styles.step}>{item}</Text>
          </View>
        ))}
      </View>

      <GenrateRecipies />
      <View style={styles.divider} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: 20,
  },
  heading: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    marginBottom: 10,
  },
  stepContainer: {
    flexDirection: 'row',
    marginVertical: 8,
    paddingRight: 25,
  },
  number: {
    margin: 5,
    paddingTop: 3,
    height: 30,
    width: 30,
    textAlign: 'center',
    borderRadius: 15,
    backgroundColor: '#cedbbd',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  step: {
    fontSize: 17,
    marginStart: 10,
    flex: 1,
  },
  divider: {
    height: 30,
  },
});

export default Steps;
