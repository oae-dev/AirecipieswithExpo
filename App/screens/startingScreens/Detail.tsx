import DetailIntro from '@/App/component/DetailIntro';
import Ingredients from '@/App/component/Ingredients';
import Steps from '@/App/component/Steps';
import { AddData, DeleteFav, FetchData } from '@/services/database';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { StackRootProps } from '../navigators/starting';



type DetailRouteProp = RouteProp<StackRootProps, 'Detail'>;

const Detail = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<StackRootProps>>();
  const route = useRoute<DetailRouteProp>();
  const { recipeData } = route.params;
  console.log('On Detail Screen' + recipeData);
  const objectiveData = JSON.parse(recipeData);
  const [fav, setfav] = useState<boolean>(false);
  console.log('DETAIL OBJECTIVE DATA -', objectiveData);

  const [DataBaseRecipieData,setDatabaseRecipieData] = useState<any[]>([]);


  const GetData = async ()=>{
     const data = await FetchData();
     console.log('MYDATA',data);
     setDatabaseRecipieData(data);
    };

    useEffect(()=>{
      GetData();
    },[]);


    useEffect(() => {
  if (DataBaseRecipieData) {
    const isFav = DataBaseRecipieData.some(
    (item: any) => item.recipeName === objectiveData.recipeName
  );
  setfav(isFav);
  }
}, [DataBaseRecipieData, objectiveData.recipeName]);



  return (

    <ScrollView style={styles.container}>
      <View style={styles.imgcontainer}>

          <TouchableOpacity
            onPress={() => Navigation.goBack()}

            style={styles.back}>
              <Image source={require('../../../assets/icons/back.png')} style={styles.backimg} />
            </TouchableOpacity>

        <Image source={require('../../../assets/detailimg.png')}
          style={styles.screenImg} />
        {
          fav ?
            <TouchableOpacity
            onPress={()=>{
              setfav(!fav);
               DeleteFav(objectiveData.recipeName);
            }}

            style={styles.favicon}>
              <Image source={require('../../../assets/icons/i1.png')} style={styles.fabimg} />
            </TouchableOpacity>
            :
            <TouchableOpacity
            onPress={()=>{
              setfav(!fav);
              AddData(objectiveData);
            }}

            style={styles.nonfavicon}>
              <Image source={require('../../../assets/icons/i1.png')} style={styles.nonfavImg} />
            </TouchableOpacity>
        }
      </View>

      <DetailIntro recipeData={recipeData} />
      <Ingredients recipeData={recipeData} />
      <Steps steps={objectiveData.steps} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container:{
    padding: 20,
    paddingBottom: 50,
  },
  imgcontainer:{
    height:300,
  },
  favicon: {
    height: 70, width: 70,
    backgroundColor: 'green', position: 'absolute',
    bottom: 10, right: 10,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabimg:{
    height: 40,
     width: 40,
  },
  nonfavImg:{
    height: 40,
    width: 40,
    tintColor:'white',
  },
  nonfavicon:{
    height: 70, width: 70,
    backgroundColor: 'gray', position: 'absolute',
    bottom: 10, right: 10,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  back:{
    height: 50, width: 50,
    backgroundColor: 'white', position: 'absolute',
    top: 10, left: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  elevation: 10,
  },
  backimg:{
    height: 40,
    width: 40,
  },
  screenImg:{
  height:'100%',
  width:'100%',
  borderRadius:30,
  },
});

export default Detail;
