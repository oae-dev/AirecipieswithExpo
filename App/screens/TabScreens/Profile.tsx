import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as ImagePicker from 'expo-image-picker';
import { getAuth, signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../../../services/colors';
import { StackRootProps } from '../navigators/starting';
import { TabRootTypes } from '../navigators/TabHome';
import { screens } from '../screenNames/screenNames';


type buttonsListType = {
  img: number
  title: string
  screen: keyof TabRootTypes | keyof StackRootProps
}

const buttonslist: buttonsListType[] = [
  {
    img: require('../../../assets/icons/i1.png'),
    title: 'home',
    screen: screens.Home,
  },
  {
    img: require('../../../assets/icons/i2.png'),
    title: 'Explore',
    screen: screens.Explore,
  },
  {
    img: require('../../../assets/icons/i3.png'),
    title: 'CookBook',
    screen: screens.CookBook,
  },
  {
    img: require('../../../assets/icons/logout.png'),
    title: 'Logout',
    screen: screens.Splash,
  },
];

const Profile = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<StackRootProps>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabRootTypes>>();
  const [profileImg, setProfileImg] = useState<any | null>();
  const pickImg = async () => {
   const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    Alert.alert('Permission required', 'Please allow access to your gallery.');
    return;
  }

  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: true, 
      quality: 1, 
      
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImg(result.assets[0]);
      console.log(result.assets[0]);
    } else {
      console.log('User cancelled image selection');
    }
  } catch (error) {
    console.log('ImagePicker Error:', error);
  }
  };

  return (
    <View style={style.container}>
      <View style={style.uperView}>
        <Image source={require('../../../assets/Images/profile/profilebg.png')} style={style.bgimg} />
        <TouchableOpacity onPress={pickImg} style={style.profileimgOuter}>
          <Image
            source={
              profileImg?.uri
                ? { uri: profileImg.uri }
                : require('../../../assets/Images/profile/profile.png')
            }
            style={style.profile}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={buttonslist}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => { if(item.screen === 'Splash') { signOut(getAuth()); Navigation.replace(screens.Splash);}
            else {tabNavigation.navigate(item.screen as keyof TabRootTypes);}}}
            style={style.btncontainer}>
            <Image source={item.img} style={style.btnLogo} />
            <Text style={style.btnText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};


const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Primary,
    padding: 25,
  },
  uperView:{
    height: '40%',
  },
  bgimg: {
    height: '90%',
    width: '100%',
    borderRadius:10,
  },
  profile: {
    height: '100%',
    width: '100%',
    borderRadius: 40,
    resizeMode: 'cover',
  },
  profileimgOuter: {
    height: 80,
    width: 80,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    borderRadius: 40,
    alignSelf: 'center',
    overflow: 'hidden',
    elevation: 5,
  },
  btncontainer:{
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  btnLogo:{
    height: 50,
    width: 50,
  },
  btnText:{
    fontSize:19,
    fontFamily: 'Outfit-Bold',
    marginStart:15,
  },
});
export default Profile;
