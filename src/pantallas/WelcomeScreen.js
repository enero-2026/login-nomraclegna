import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

// Ahora recibimos el prop 'usuario' para saber quién inició sesión
export default function WelcomeScreen({ usuario }) {
    const [contador, setContador] = useState(0);

    useEffect(() => {
        cargarContador();
    }, []);

    useEffect(() => {
        guardarContador(contador);
    }, [contador]);

    const incrementar = () => {
        setContador(contador + 1);
    };

    const guardarContador = async (valor) => {
        try {
            await AsyncStorage.setItem("contador", JSON.stringify(valor));
        } catch (e) {
            console.log("Error guardando");
        }
    };

    const cargarContador = async () => {
        try {
            const data = await AsyncStorage.getItem("contador");
            if (data !== null) {
                setContador(JSON.parse(data));
            }
        } catch (e) {
            console.log("Error cargando");
        }
    };

    const pedirPermiso = async () => {
        await Notifications.requestPermissionsAsync();
    };

    const enviarNotificacion = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hola, mundo 🌍",
                body: "Esta es tu primera notificación",
            },
            trigger: null,
        });
    };

    const cerrarSesion = () => {
        signOut(auth)
            .then(() => console.log('Sesión cerrada correctamente'))
            .catch((error) => console.log('Error cerrando sesión', error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>¡Bienvenido, {usuario?.email}!</Text>

            <Text style={{ fontSize: 24, marginBottom: 10 }}>Notificaciones</Text>
            <Button title="Pedir permiso" onPress={pedirPermiso} />
            <View style={{ marginTop: 10 }}>
                <Button title="Enviar notificación" onPress={enviarNotificacion} />
            </View>

            <View style={{ marginTop: 50, alignItems: 'center' }}>
                <Text style={{ fontSize: 20, marginBottom: 10 }}>
                    Contador: {contador}
                </Text>
                <Button title="Incrementar" onPress={incrementar} />
            </View>

            <View style={{ marginTop: 50 }}>
                <Button title="Cerrar Sesión" onPress={cerrarSesion} color="#d9534f" />
            </View>

            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 40,
        color: '#333'
    }
});