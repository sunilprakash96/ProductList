import React, { useState, useEffect } from 'react';
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { PRODUCT_LIST } from "../helper/constants.helper";

const Otp = () => {
  const [state, setState] = useState({
    phone: '',
  });
  const product = useSelector((state) => state);
  console.log("product", product);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: PRODUCT_LIST,
      payload: "prakash"
    })
  },[])
   
  

  const onChangeNumber = (text) => {
    setState({ ...state, phone: text})
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
      <TouchableOpacity style={styles.button}>
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
    paddingRight: 20
  },
  textWrapper: {
    fontSize: 25,
    color: 'black',
    marginBottom: 20,
  },
  input: {
    paddingHorizontal: 50,
    width: "60%",
    borderRadius: 30,
    borderWidth: 2,
    color: "black",
    fontSize: 20
  },
  button: {
    justifyContent: "center",
    alignItems: 'center',
    width: "50%",
    height: 50,
    borderRadius: 10,
    backgroundColor: 'red',
    marginTop: 30
  },
  text:{
    fontSize: 20,
    color: "black"
  }
});

export default Otp;
