import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safe Store</Text>
      <Image
        source={require('../assets/safe_random.png')}
        style={styles.logo}
      />

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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EDE7F6',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#512DA8',
    marginBottom: 90,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#512DA8',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  loginButton: {
    backgroundColor: '#512DA8',
    borderRadius: 10,
    padding: 10,
    width: '50%',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    // marginTop: 200,
  },
});

export default LoginScreen;
