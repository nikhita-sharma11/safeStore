import React, {useState, useLayoutEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {authenticateUser} from '../utils/auth';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const isAuthenticated = authenticateUser(username, password);

    if (isAuthenticated) {
      navigation.navigate('Home');
    } else {
      alert('Authentication failed. Please check your credentials.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
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
        <Text style={styles.title}>Safe Store</Text>
        <Image source={require('../assets/7835563.png')} style={styles.logo} />

        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text style={styles.buttonTextReg}>Register</Text>
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
  loginButton: {
    backgroundColor: '#007BFF',
    borderRadius: 10,
    padding: 10,
    width: '50%',
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: '#fff',
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
  buttonTextReg: {
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

export default LoginScreen;
