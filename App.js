import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';

export default function App() {
  const [pais, setPais] = useState('')
  const [info, setInfo] = useState({})

  const onSubmit = async () => {
    const paisAPI = await fetch('https://restcountries.com/v3.1/name/' + pais)
                         .then((response) => response.json())

    setInfo(paisAPI[0]);
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.paisInfo}>
        <Text style={styles.txtInfo}>População: {info?.population}</Text>
        <Text style={styles.txtInfo}>Capital:   {info?.capital}</Text>
        <Text style={styles.txtInfo}>Região:    {info?.region}</Text>
        <Text style={styles.txtInfo}>Area:      {info?.area}</Text>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.inputContainer}>
        <TextInput value={pais} onChangeText={(txt) => {setPais(txt), console.log(pais)} } placeholder='Buscar país em inglês...' style={styles.input}></TextInput>
        <TouchableOpacity onPress={ () => onSubmit() } style={styles.btn}>
          <Text style={styles.txt}>Buscar</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    flexDirection:'row', 
    marginBottom: 50,
    marginHorizontal: 10 
  },
  input:{
    backgroundColor:'#d9d9d9',
    height: 55,
    flex: 1
  },
  btn:{
    backgroundColor: '#e574bc',
    alignItems: 'center',
    justifyContent: 'center',

  },
  txt:{
    color:'white',
    padding: 13
  },
  paisInfo: {
    flex:1,
    width: '100%',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  txtInfo: {
    fontSize: 24,
    marginLeft: 15
  }
});
