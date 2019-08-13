import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Image, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ navigation }) {
    useEffect(() => { 
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('Main', {user})
            }
        });
    }, []);
    const [user, setUser] = useState('');

    async function handleLogin() {
        const response = await api.post('/devs', {
            username: user
        });

        const { _id } = response.data;
        await AsyncStorage.setItem('user', _id);
        navigation.navigate('Main', { user: _id });
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            enabled={Platform.OS === 'ios'}
            style={styles.container}
            style={styles.container}
        >
            <Image source={logo} />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#999"
                value={user}
                onChangeText={setUser}
                placeholder="Digite seu usuário do Github"
                style={styles.input}
            />
            <TouchableOpacity onPress={handleLogin} style={styles.button}>
                <Text style={styles.textButton}>Enviar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30
    },
    input: {
        height: 46,
        alignSelf: 'stretch',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 4,
        marginTop: 20,
        paddingHorizontal: 15,
    },
    button: {
        alignSelf: 'stretch',
        backgroundColor: '#DF4723',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        marginTop: 10,
        borderRadius: 4
    },
    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
})