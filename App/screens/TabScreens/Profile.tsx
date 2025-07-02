import { auth } from '@/firebaseConfig'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { signOut } from 'firebase/auth'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { TabRootTypes } from '../navigators/TabHome'
import { StackRootProps } from '../navigators/starting'
import { screens } from '../screenNames/screenNames'

const Profile = () => {
  const Navigation = useNavigation<NativeStackNavigationProp<StackRootProps>>();
  const tabNavigation = useNavigation<BottomTabNavigationProp<TabRootTypes>>();
  return (
    <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
      <TouchableOpacity 
      onPress={()=> {signOut(auth); Navigation.replace(screens.Splash)}}
      style={{backgroundColor:'red',height:30,width:60}}>
        <Text>logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Profile