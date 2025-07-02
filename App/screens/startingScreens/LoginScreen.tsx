import React, { useState } from 'react';
import { Image, Keyboard, Platform, StyleSheet, Text, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';


import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import MyButton from '@/App/component/MyButton';
import MyModal from '@/App/component/MyModal';
import AuthTextField from '@/App/component/TextField';
import { auth } from '@/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { StackRootProps } from '../navigators/starting';
import { screens } from '../screenNames/screenNames';


const LoginScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<StackRootProps>>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [wrongEmail, setwrongEmail] = useState<boolean>(false);
  const [wrongPassword, setwrongPassword] = useState<boolean>(false);
  const [modal, setmodal] = useState<boolean>(false);

  
const loginUser = ()=>{
    Keyboard.dismiss();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
         if (Platform.OS === 'android') {
      ToastAndroid.show('Login Success', ToastAndroid.SHORT);
    } else {
      alert('Login Success');  
    }
        navigation.replace(screens.HomeTabs);
      })
      .catch(
        (error) => {
          console.error(error);
          if (error?.code === 'auth/invalid-email') {
            setwrongEmail(true);
            setwrongPassword(true);

          }
          if (error?.code === 'auth/wrong-password') {
            setwrongPassword(true);
          }
          if (error?.code === 'auth/invalid-credential') {
            setwrongEmail(true);
            setwrongPassword(true);

          }

        }
      );
}


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={require('../../../assets/Images/Splash/1.jpg')} style={styles.logo} />

        <View style={styles.fieds}>
          <View>
            <AuthTextField value={email} onchange={setEmail} placeholder="Email"
            correctData={wrongEmail} changeOnFoucs={() => {
              setwrongEmail(false);
              setwrongPassword(false);
            }} />
            {
              wrongEmail ? <Text style={styles.wrongText}>Worng Email</Text> : null
            }
          </View>
          <View>
            <AuthTextField value={password} onchange={setPassword} placeholder="Password"
            correctData={wrongPassword} changeOnFoucs={() => {
              setwrongEmail(false);
              setwrongPassword(false);
            }} />
            {
              wrongPassword ? <Text style={styles.wrongText}>Worng Password</Text> : null
            }
          </View>
        </View>
        {
          password === '' || email === '' ?
            <View style={styles.buttonWidth}>
              <MyButton title="Sign In" color="#7a7746" onpress={() => setmodal(true)} btnwidth={'90%'}/>
            </View>
            :
            <View style={styles.buttonWidth}>
              <MyButton title="Sign In" color={wrongPassword ? 'red' : '#7a7746'} onpress={loginUser} btnwidth={'90%'} />
            </View>

        }


        <TouchableOpacity
          onPress={() => navigation.replace(screens.SignUp)}>
          <Text>Dont have an account? Sign up</Text>

        </TouchableOpacity>

        <MyModal visiblility={modal} setVisibility={setmodal} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    gap: 30,
    alignItems: 'center',

  },
  logo: {
    height: 150, width: 200,
    borderRadius: 30,
  },
  fieds: {
    width: '90%',
    justifyContent: 'space-between',
    gap: 20,
  },
  buttonWidth: {
    width: '80%',
  },
  wrongText: {
    color: 'red',
  },
});

export default LoginScreen;
