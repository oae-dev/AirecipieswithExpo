import React, { useState } from 'react';
import { Image, Keyboard, Platform, Text, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import Myloader from '@/App/component/loader';
import MyButton from '@/App/component/MyButton';
import MyModal from '@/App/component/MyModal';
import AuthTextField from '@/App/component/TextField';
import { auth } from '@/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { StackRootProps } from '../navigators/starting';
import { screens } from '../screenNames/screenNames';
import { styles } from './LoginScreen';


const SignUpScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<StackRootProps>>();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [wrongEmail, setwrongEmail] = useState<boolean>(false);
  const [wrongPassword, setwrongPassword] = useState<boolean>(false);
  const [modal, setmodal] = useState<boolean>(false);
  const [myerror,setMyError] = useState<string | null >(null);
  const [myLoadershow, setmyLoadershow] = useState<boolean>(false);

  const createUser = () => {
    setmyLoadershow(true);
   createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        setmyLoadershow(false);
         if (Platform.OS === 'android') {
              ToastAndroid.show('SignUp Successfuly', ToastAndroid.SHORT);
            } else {
              alert('Signup Successfuly');  
            }
        
        navigation.replace(screens.HomeTabs);
      })
      .catch(
        error => {
          if (error.code === 'auth/email-already-in-use') {
            setwrongEmail(true);
            setwrongPassword(true);
            setMyError('auth/email-already-in-use');
            setmyLoadershow(false);
            
          }
          if (error.code === 'auth/invalid-email') {
            setwrongEmail(true);
            setwrongPassword(true);
            setMyError('auth/invalid-email');
            console.log('That email address is invalid!');
            setmyLoadershow(false);
          }
          if ( error.code === 'auth/weak-password') {
            setwrongPassword(true);
            setMyError('auth/weak-password');
            setmyLoadershow(false);
            
          }

          console.error(error);
          setmyLoadershow(false);
        });
  };

  return (
    <TouchableWithoutFeedback
    onPress={Keyboard.dismiss}>

    <View style={styles.container}>
      <Image source={require('../../../assets/Images/Splash/1.jpg')} style={styles.logo} />

      <View style={styles.fieds}>
        <View>
          <AuthTextField value={email} onchange={setEmail} placeholder="Email" correctData={wrongEmail}
          changeOnFoucs={()=>{setwrongEmail(false);
                setwrongPassword(false);
                setMyError(null);
            }} />
          {
            myerror === 'auth/email-already-in-use' ? <Text style={styles.wrongText}>User Already Exist</Text> : null
          }
          {
            myerror === 'auth/invalid-email' ? <Text style={styles.wrongText}>Enter Valid Email</Text> : null
          }
        </View>
        <View>
          <AuthTextField value={password} onchange={setPassword} placeholder="Password" correctData={wrongPassword}
          changeOnFoucs={()=>{setwrongEmail(false);
                setwrongPassword(false);
                setMyError(null);
            }} />
          {
            myerror === 'auth/weak-password' ? <Text style={styles.wrongText}>Password should be at least 6 characters </Text> : null
          }
        </View>
      </View>

      {
          password === '' || email === '' ?
            <View style={styles.buttonWidth}>
              <MyButton title="Sign Up" color="#7a7746" onpress={() => setmodal(true)} btnwidth={'90%'}/>
            </View>
            :
            <View style={styles.buttonWidth}>
              <MyButton title="Sign Up" color={wrongPassword ? 'red' : '#7a7746'} onpress={createUser} btnwidth={'90%'} />
            </View>

        }
      <TouchableOpacity
        onPress={() => navigation.replace(screens.Login)}>
        <Text>SignIn with email & email</Text>
      </TouchableOpacity>
      <MyModal visiblility={modal} setVisibility={setmodal} />
      <Myloader visible={myLoadershow} />
    </View>
    </TouchableWithoutFeedback>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     gap: 20,
//     alignItems: 'center',

//   },
//   logo: {
//     height: 100,
//     width: 100,
//   },
//   btnwidth: {
//     width: '80%',
//   },
// });

export default SignUpScreen;
