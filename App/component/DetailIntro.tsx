import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import colors from '../../services/colors';

const DetailIntro = ({ recipeData }: any) => {
  console.log('In DetailIntro', recipeData);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.heading}>{recipeData?.recipeName}</Text>

      <Text style={styles.title}>Description</Text>
      <Text style={styles.description}>{recipeData?.description}</Text>

      <View style={styles.infoRow}>
        <View style={styles.infoBox}>
          <Image source={require('../../assets/icons/leaf.png')} style={styles.infoIcon} />
          <View>
            <Text style={styles.infoText}>{recipeData?.calories} Cal</Text>
            <Text style={styles.infoLabel}>Calories</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Image source={require('../../assets/icons/timer.png')} style={styles.infoIcon} />
          <View>
            <Text style={styles.infoText}>{recipeData?.cookTime} Min</Text>
            <Text style={styles.infoLabel}>Cook Time</Text>
          </View>
        </View>

        <View style={styles.infoBox}>
          <Image source={require('../../assets/icons/serve.png')} style={styles.infoIcon} />
          <View>
            <Text style={styles.infoText}>{recipeData?.serveTo} Serve</Text>
            <Text style={styles.infoLabel}>Servings</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
  },
  heading: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
  },
  title: {
    fontFamily: 'Outfit-Bold',
    fontSize: 20,
    marginTop: 10,
  },
  description: {
    color: colors.discription,
    fontSize: 20,
    fontFamily: 'Outfit-Regular',
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  infoBox: {
    backgroundColor: '#cedbbd',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  infoText: {
    color: 'green',
    fontFamily: 'Outfit-Bold',
    fontSize: 17,
    marginTop: 5,
    marginStart: 10,
  },
  infoLabel: {
    marginStart: 12,
    fontSize: 15,
    fontWeight: '500',
  },
  infoIcon: {
    height: 30,
    width: 30,
    tintColor: 'green',
  },
});

export default DetailIntro;
