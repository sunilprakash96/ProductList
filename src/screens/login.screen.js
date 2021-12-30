import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
  KeyboardAvoidingView
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {PRODUCT_LIST} from '../helper/constants.helper';
import Toast from 'react-native-toast-message';
import auth from '../models/auth.model';
import arrowBack from "../assets/icons/arrow_back.png";
import {showMessage, hideMessage} from 'react-native-flash-message';

const Login = (props) => {
  const [state, setState] = useState({
    name: "",
    phone: "",
    otp: "",
    dob: "",
    address: "",
    referralCode: "",
    deviceName: ""
  });
  const otp = useSelector(state => state.auth);
  console.log("otp", otp);
  const otpDetails = otp.otpDetails;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: PRODUCT_LIST,
      payload: 'prakash',
    });
  }, []);

  const onChange = (name) => (value) => {
    setState({...state, [name]: value});
  };

  const handleLogin = async () => {
    try {
      const data = {
        name: state.name,
        phone: Object.keys(otpDetails).length !==0 ? otpDetails.data.phone : state.phone,
        otp: Object.keys(otpDetails).length !==0 ? parseInt(otpDetails.data.code) : state.otp,
        dob: state.dob,
        address: state.address,
        referral_code: state.referralCode,
        device_name: state.deviceName
      }
      const login = await auth.login(data, otpDetails.data.id);
    } catch(err){
      console.log("Error", err?.data);
      if(err?.data){
        ToastAndroid.showWithGravity(
          err.data.message,
          ToastAndroid.LONG,
          ToastAndroid.TOP
        );
      }
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity styles={{  backgroundColor: 'red' }} onPress={() => props.navigation.navigate("Register")}>
            <Image
              style={styles.tinyLogo}
              source={arrowBack}
            />
        </TouchableOpacity>
        <View style={{ width: "90%", alignItems: "center"}}>
          <Text style={styles.textWrapper}>Login</Text>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChange("name")}
          value={state.name}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>phone</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChange('phone')}
          value={Object.keys(otpDetails).length !==0 ? otpDetails.data.phone : state.phone}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>otp</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChange('otp')}
          value={Object.keys(otpDetails).length !==0 ? otpDetails.data.code : state.otp}
          keyboardType="numeric"
          maxLength={4}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>dob</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChange('dob')}
          value={state.dob}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>address</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChange("address")}
          value={state.address}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>referral_code</Text>
        <TextInput
          style={styles.input}
          // autoCapitalize={"characters"}

          onChangeText={onChange("referralCode")}
          value={state.referralCode.toUpperCase()}
        />
      </View>
      <View style={styles.inputWrapper}>
        <Text style={styles.text}>device name</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChange("deviceName")}
          value={state.deviceName}
        />
      </View>
      <View>
        <Text style={{ textDecorationStyle: "solid", color: "black"}}> New user? <Text style={{ fontSize: 20, textDecorationStyle: "solid", textDecorationLine: "underline", color: "black"}} onPress={() => props.navigation.navigate("Register")}>Register</Text></Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    // justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textWrapper: {
    fontSize: 25,
    color: 'black',
    marginBottom: 20,
  },
  textWrapper: {
    fontSize: 20,
    color: 'black',
  },
  input: {
    paddingHorizontal: 20,
    width: '100%',
    borderRadius: 30,
    borderWidth: 2,
    color: 'black',
    fontSize: 20,
    backgroundColor: "white"
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
    color: 'black',
  },
 inputWrapper:{
   width: "100%",
  marginBottom: 10
 },
 buttonText:{
  fontSize: 20,
  color: 'white',
 }
});

export default Login;
