import * as React from 'react';
import { Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import {Header}  from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {TextInput} from 'react-native'

export default class App extends React.Component {
    constructor(){
      super();
      this.state={
        text:'',
        displayText:'',
        isSearchPressed: false,
        isLoading: false,
        word: 'Loading...', 
        lexicalCategory: '',
         definition: '',
      }
    }
    getWord =(word) =>{
      var searchKeyword = word.toLowerCase();
      var url = 'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json';
      return fetch(url)
      .then((data)=>{
        if(data.status === 200) {
          return data.json();
        }else{
          return null;
        }
      })
      .then((response)=>{
        var responseObject = response;
        if (responseObject) {
          var wordData = responseObject.definitions[0];
          var definition = wordData.description;
          var lexicalCategory = wordData.wordType;

          this.setState({
            word: this.state.text,
            definition: definition,
            lexicalCategory: lexicalCategory,
          });
        }else{
          this.setState({
            word:this.state.text,
            definition:'NOT FOUND THE WORD'
          });
        }
      });
    }
  render() {
    return (
      <SafeAreaProvider>
      <View style={styles.container}>
        <Header
          backgroundColor={'#4B878BFF'}
          leftComponent={{ icon: 'menu', color: '#D01C1FFF',size:30 }}
          centerComponent={{text:'DICTIONARY APP', style:{color:'#D01C1FFF',fontSize:30}}}
          rightComponent={{ icon: 'home', color: '#D01C1FFF',size:30 }}
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.goButton}
        onPress={()=>{
          this.setState({
            displayText:this.state.text,
            isSearchPressed:true,
            isLoading: true,
          });
          this.getWord(this.state.text);
          }}>
           <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <Text>{this.state.displayText}</Text>

        <Text style={[styles.detailsTitle, {fontSize:25}]}>Word:{''}</Text>
        <Text style={{ fontSize: 25 }}>{this.state.word}</Text>

        <Text style={[styles.detailsTitle ,{fontSize:25}]}>Type:{''}</Text>
        <Text style={{ fontSize: 25 }}>{this.state.lexicalCategory}</Text>

        <Text style={[styles.detailsTitle,{fontSize:25}]}>Definition:{''}</Text>
        <Text style={{ fontSize: 25 }}>{this.state.definition}</Text>
        

      </View>
      </SafeAreaProvider>
    );
  }
}
const styles  = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
  inputBox: {
    marginTop: 200,
    width: '80%',
    textAlign: 'center',
    height: 40,
    alignSelf: 'center',
    borderWidth: 4,
    borderRadius:50,
    backgroundColor:'#F5766AFF',
    color:'#184A45FF',
    fontSize:30,
  },
  goButton:{
    marginTop: 50,
    textAlign: 'center',
    alignSelf: 'center',
    borderWidth: 4,
    borderRadius:50,
    width:150,
    height:50,
    backgroundColor:'#2D2926FF',
    borderColor:'#118DF0'
   
  },
  buttonText: {
    marginTop: -1,
    textAlign: 'center',
    alignSelf: 'center',
    color:'#E94B3CFF',
    fontSize:30
  },
})