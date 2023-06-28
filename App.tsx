import React,{useState} from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,TouchableOpacity, TextInput,
} from 'react-native';

import * as Yup from 'yup';
// schema passord validation
import BouncyCheckbox from 'react-native-bouncy-checkbox'
// ui part for checkbox
import {Formik} from 'formik'
// basic ui / view

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number().min(4,'Should be min of 4 characters').max(16,'should be max of 16 characters').required('Length is required')
})


function App(){
  const [Password,SetPassword] = useState('')
  const [isPasswordGen,SetisPasswordGen] = useState(false)
  const [lowercase,SetLowerCase] = useState(true)
  const [Uppercase,SetUpperCase] = useState(false)
  const [numbers,UseNumbers] = useState(false)
  const [symbols,UseSymbols] = useState(false)
  
  const generatePasswordString = (passwordLength : number) => {
    //giving to the user , thorugh componenets
    let characterList = ''

    const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '1234567890'
    const specialLetters = '!@#$%^&*()_+'

    if (uppercaseLetters) {
      characterList += uppercaseLetters
    }
    if (lowercaseLetters) {
      characterList += lowercaseLetters
    }
    if (numbers) {
      characterList += numbers
    }
    if(specialLetters){
      characterList += specialLetters
    }

    const passwordResult = createPassword(characterList,passwordLength) 

    SetPassword(passwordResult)
    SetisPasswordGen(true)
  }

  const createPassword = (characters : string, passwordLength : number) => {
    //the actual logic of generating password, based on given string and length
    let result = ''
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }

  const resetPasswordState = () => {
    //
    SetPassword('')
    SetisPasswordGen(false)
    SetLowerCase(true)
    SetUpperCase(false)
    UseNumbers(false)
    UseSymbols(false)

  }

  return(
    <ScrollView keyboardShouldPersistTaps='handled'>
      <SafeAreaView style={styles.appContainer} ></SafeAreaView>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Password Generator</Text>
        <Formik
       initialValues={{ passwordLength:''}}
       validationSchema={PasswordSchema}
       onSubmit={values => {
        console.log(values);
        generatePasswordString(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
         /* and other goodies */
       }) => (
         <>
            <View style={styles.inputWrapper}>
              <View style={styles.inputColumn}>
                <Text style={styles.heading}>Password Length:</Text>
                { touched.passwordLength && errors.passwordLength && <Text style={styles.errorText}>
                  { errors.passwordLength}
                </Text> }
              </View>
              <TextInput
                style={styles.inputStyle}
                value={values.passwordLength}
                onChangeText={handleChange('passwordLength')}
                placeholder='Ex. 8'
                keyboardType='numeric'
                />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.heading}>Include Lowercase</Text>
              <BouncyCheckbox
              disableBuiltInState
              isChecked={lowercase}
              onPress={ () => SetLowerCase(!lowercase)}
              fillColor='#29ab87'
              />
            </View>
            <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Uppercase</Text>
              <BouncyCheckbox
              disableBuiltInState
              isChecked={Uppercase}
              onPress={ () => SetUpperCase(!Uppercase)}
              fillColor='#29ab87'
              />
            </View>
            <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Numbers</Text>
              <BouncyCheckbox
              disableBuiltInState
              isChecked={numbers}
              onPress={ () => UseNumbers(!numbers)}
              fillColor='#29ab87'
              />
            </View>
            <View style={styles.inputWrapper}>
            <Text style={styles.heading}>Include Symbols</Text>
              <BouncyCheckbox
              disableBuiltInState
              isChecked={symbols}
              onPress={ () => UseSymbols(!symbols)}
              fillColor='#29ab87'
              />
            </View>

            <View style={styles.formAction}>
              <TouchableOpacity
              disabled={!isValid}
              style={styles.primarybtn}
              onPress={handleSubmit}
              ><Text style={styles.primarybtnText}>Generate Password</Text></TouchableOpacity>
              <TouchableOpacity
              style={styles.secondarybtn}
              onPress={ () => {
                handleReset();
                resetPasswordState()
              }}
              ><Text>Reset</Text></TouchableOpacity>
            </View>
         </>
       )}</Formik>
      </View>
      {isPasswordGen ? (
        <View>
          <Text selectable style={styles.finalresult}>{Password}</Text>
        </View>
        // handle errors for inputting characters and other studd
      ) : null}

    </ScrollView>
  )
}

export default App;

const styles = StyleSheet.create({
  appContainer:{

  },
  formContainer:{},
  title:{
    fontSize:30,
    fontWeight:'bold'
  },
  heading:{
  },
  inputWrapper:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    
    alignItems:'center'
  },
  inputColumn:{},
  inputStyle:{},
  errorText:{},
  formAction:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-evenly',
    paddingTop:30,
  },
  primarybtn:{},
  primarybtnText:{},
  secondarybtn:{},
  finalresult:{
    paddingHorizontal:150,
    paddingTop:30,
  },

})

