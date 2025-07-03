import React, { useContext, useRef, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../../services/colors';
import MyButton from './MyButton';


import ActionSheet, { ActionSheetRef } from 'react-native-actions-sheet';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { screens } from '../screens/screenNames/screenNames';

import ModalAI from '../../services/gemApi';
import { GENERATE_COMPLETE_RECIPE_PROMPT, GENERATE_OPTION_RECIPE_PROMPT } from '../../services/propmts';
import { useVeg } from '../context/vegSwitchContext';
import { StackRootProps } from '../screens/navigators/starting';
import Myloader from './loader';




const GenrateRecipies = () => {
  const { veg } = useContext(useVeg);
  const Navigation = useNavigation<NativeStackNavigationProp<StackRootProps>>();
  const [search, setSearch] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const ActionSheetref = useRef<ActionSheetRef>(null);
  const [recipieContent, setRecippieContent] = useState<any>(null);
  const [myLoadershow, setmyLoadershow] = useState<boolean>(false);


  const vegitarian = veg ? 'vegitarian' : 'non-Vegitarian';


  const genrateRecipies = async (input: string | undefined) => {
    setLoading(true);
    if (search === '') {
      console.log('enter something');
    }
    try {
      const result = await ModalAI(`${input},${vegitarian}\n${GENERATE_OPTION_RECIPE_PROMPT}`);
      let stringResult = result?.choices?.[0]?.message?.content.trim();
      console.log("🔍 Raw AI Response:\n", stringResult);

      if (stringResult?.startsWith('```')) {
      stringResult = stringResult.replace(/^```(?:json)?/, '').replace(/```$/, '').trim();
    }
      const parsedResult = JSON.parse(stringResult);

      console.log('✅', parsedResult);
      setRecippieContent(parsedResult);
      ActionSheetref.current?.show();


      setLoading(false);
    } catch (error: any) {
      console.error('❌ AI Error:', error?.response?.data || error.message || error);
      setLoading(false);
    }
  };


  const GetFullDetailRecipie = async (item: any) => {
    ActionSheetref.current?.hide();
    setmyLoadershow(true);
    const MyPrompt = `Recipie Name:${item.recipeName} and discription:${item.description} ${GENERATE_COMPLETE_RECIPE_PROMPT}`;
    const result = await ModalAI(MyPrompt);
    let stringResult = result?.choices?.[0]?.message?.content.trim();
    if (stringResult?.startsWith('```')) {
      stringResult = stringResult.replace(/^```(?:json)?/, '').replace(/```$/, '').trim();
    }
    const parsedResult = JSON.parse(stringResult);

    console.log('✅', parsedResult);
    console.log('✅', JSON.stringify(parsedResult));


    setmyLoadershow(false);
    Navigation.push(screens.Detail, { recipeData: stringResult });

  };



  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Images/home/pan.gif')} style={styles.img} />
      <Text style={styles.heading}>Warm up your stove, and lets get cooking!</Text>
      <Text style={styles.dis}>Make someting for your LOVE</Text>
      <TextInput placeholder="What you want to create? Add Ingredients etc."
        onChangeText={(text) => setSearch(text)}
        value={search}
        multiline
        numberOfLines={3}
        style={styles.search}
      />

      <MyButton title={loading ? 'Loading...' : 'Genrate Recipe'} color="green" onpress={() => genrateRecipies(search)} btnwidth={'60%'} />


      <ActionSheet ref={ActionSheetref}>
        <View>
          <Text style={styles.ActionSheetHeading}>Select Recipies</Text>
          <View style={styles.divider} />
          <FlatList data={recipieContent}
            renderItem={({ item }: any) => (
              <TouchableOpacity style={styles.recipieContainer}
                onPress={() => GetFullDetailRecipie(item)}
              >
                <Text style={styles.RecipieHeading}>{item.recipeName}</Text>
                <Text style={styles.recipieDis}>{item.description}</Text>
              </TouchableOpacity>
            )} />
        </View>
      </ActionSheet>
      <Myloader visible={myLoadershow} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 8,
    marginTop: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.genraterbg,
  },
  img: {
    height: 100,
    width: 100,
  },
  heading: {
    fontSize: 23,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
    margin: 5,
  },
  dis: {
    fontSize: 16,
    fontWeight: '500',
  },
  search: {
    height: 100,
    backgroundColor: colors.White,
    borderRadius: 15,
    width: '100%',
    marginTop: 20,
    padding: 15,
    textAlignVertical: 'top',
    fontSize: 17,
    marginBottom: 10,
  },
  ActionSheetHeading: {
    padding: 25,
    paddingBottom: 3,
    fontSize: 20,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
  },
  recipieContainer: {
    margin: 10,
    alignSelf: 'center',
    borderWidth: 0.5,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: 6,
    padding: 10,
  },
  RecipieHeading: {
    fontSize: 18,
    fontFamily: 'Outfit-Bold',
  },
  recipieDis: {
    fontSize: 16,
    color: colors.discription,
    fontFamily: 'Outfit-Regular',
  },
  btn: {
    marginTop: 10,
  },
  divider: {
    height: 2,
    backgroundColor: 'black',
    width: 50, marginBottom: 6,
    alignSelf: 'center',
  },

});

export default GenrateRecipies;
