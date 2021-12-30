import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PRODUCT_LIST} from '../helper/constants.helper';
import Toast from 'react-native-toast-message';
import auth from '../models/auth.model';
import { showMessage, hideMessage } from "react-native-flash-message";
import { useLinkProps } from '@react-navigation/native';

const Otp = (props) => {
  const [state, setState] = useState({
    phone: '',
  });
  const otp = useSelector(state => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: PRODUCT_LIST,
      payload: 'prakash',
    });
  }, []);

  const getOtp = async () => {
    try {
      const data = {
        phone: state.phone
      }
      if(state.phone.length === 0){
        ToastAndroid.showWithGravity(
          "Phone number is required",
          ToastAndroid.LONG,
          ToastAndroid.TOP
        );
      } else if(state.phone.length < 10){
        ToastAndroid.showWithGravity(
          "Phone number must be valid",
          ToastAndroid.LONG,
          ToastAndroid.TOP
        );
      } else {
        const otp = await auth.getOtp(data);
        console.log("result", otp);
        if(otp !== undefined){
          props.navigation.navigate("Register")
        }
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const onChangeNumber = text => {
    setState({...state, phone: text});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textWrapper}>OTP</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={state.phone}
        placeholder="useless placeholder"
        keyboardType="numeric"
        maxLength={10}
      />
      <TouchableOpacity style={styles.button} onPress={() => getOtp()}>
        <Text style={styles.text}>Send Otp</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingLeft: 20,
    paddingRight: 20,
  },
  textWrapper: {
    fontSize: 25,
    color: 'black',
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 50,
    width: '60%',
    borderRadius: 30,
    borderWidth: 2,
    color: 'black',
    fontSize: 20,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 50,
    borderRadius: 10,
    backgroundColor: 'black',
    marginTop: 30,
  },
  text: {
    fontSize: 20,
    color: 'white',
  },
});

export default Otp;
