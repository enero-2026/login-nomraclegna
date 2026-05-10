import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const iniciarSesion = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Sesión iniciada:', userCredential.user.email);
      })
      .catch((error) => {
        Alert.alert('Error al iniciar sesión', error.message);
      });
  };

  const registrarUsuario = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Por favor llena todos los campos');
      return;
    }
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        Alert.alert('Éxito', 'Cuenta creada correctamente. Ya puedes iniciar sesión.');
      })
      .catch((error) => {
        Alert.alert('Error al registrar', error.message);
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.formContainer}>
        <Text style={styles.title}>Bienvenido</Text>

        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.buttonContainer}>
          <Button title="Iniciar Sesión" onPress={iniciarSesion} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Crear Cuenta" onPress={registrarUsuario} color="#841584" />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    padding: 20,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fafafa',
  },
  buttonContainer: {
    marginTop: 10,
  }
});