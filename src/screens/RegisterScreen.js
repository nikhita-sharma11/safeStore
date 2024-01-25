import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import {format} from 'date-fns';

const RegisterScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDOB] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');

  const [usernameTouched, setUsernameTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [dobTouched, setDOBTouched] = useState(false);
  const [mobileNumberTouched, setMobileNumberTouched] = useState(false);

  const handleRegister = () => {
    if (!username || !password || !dob || !mobileNumber) {
      Alert.alert('Registration Failed', 'All fields are mandatory.');

      setUsernameTouched(true);
      setPasswordTouched(true);
      setDOBTouched(true);
      setMobileNumberTouched(true);
      return;
    }

    const formattedDOB = format(new Date(dob), 'dd MMMM yyyy');
    Alert.alert(
      'Registration Completed',
      `You have successfully registered!\nDOB: ${formattedDOB}`,
    );
    navigation.navigate('Login');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={require('../assets/backg.png')}
      style={styles.background}>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <Image source={require('../assets/7835563.png')} style={styles.logo} />

        <TextInput
          style={[
            styles.input,
            !username && usernameTouched && styles.errorInput,
          ]}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
          onBlur={() => setUsernameTouched(true)}
        />
        <TextInput
          style={[
            styles.input,
            !password && passwordTouched && styles.errorInput,
          ]}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
          onBlur={() => setPasswordTouched(true)}
        />
        <TextInput
          style={[styles.input, !dob && dobTouched && styles.errorInput]}
          placeholder="Date of Birth (dd/mm/yyyy)"
          value={dob}
          onChangeText={text => setDOB(text)}
          onBlur={() => setDOBTouched(true)}
        />
        <TextInput
          style={[
            styles.input,
            !mobileNumber && mobileNumberTouched && styles.errorInput,
          ]}
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={text => setMobileNumber(text)}
          onBlur={() => setMobileNumberTouched(true)}
        />
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.buttonTextreg}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'fill',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 255, 0.2)',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
  },
  input: {
    height: 50,
    width: '90%',
    borderColor: '#007BFF',
    borderWidth: 2,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    color: '#000',
  },
  errorInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  registerButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    width: '50%',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 10,
    width: '50%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonTextreg: {
    color: '#007BFF',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default RegisterScreen;
