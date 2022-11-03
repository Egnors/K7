/**
  * Sample React Native App
  * https://github.com/facebook/react-native
  *
  * @format
  * @flow strict-local
  */

import React, {Component} from 'react';import LinearGradient from 'react-native-linear-gradient';
import Sound from 'react-native-sound';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
  
class App extends Component{
  constructor(props) {
    super(props);
    Sound.setCategory('Playback', true); // true = mixWithOthers
    this.state = {
      count: 0,
      press: 0,
      colorTop: '#9400D3',
      colorBottom: '#fcfcfc',
      loopingSound: undefined,
      tests: {},
      audioTests: [
        {
          title: 'Te extraño mi S,s,T INE T ∞',
          isRequire: true,
          id:1,
          url: require('./hi.m4a'),
        },
        {
          title: 'Te amo mi niña',
          isRequire: true,
          id:2,
          url: require('./hi2.m4a'),
        },
      ]

      };
      this.whoosh = new Sound(require('./hi.m4a'), (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + this.whoosh.getDuration() + 'number of channels: ' + this.whoosh.getNumberOfChannels());
      });
      
      this.whoosh2 = new Sound(require('./hi2.m4a'), (error) => {
        if (error) {
          console.log('failed to load the sound', error);
          return;
        }
        // loaded successfully
        console.log('duration in seconds: ' + this.whoosh2.getDuration() + 'number of channels: ' + this.whoosh2.getNumberOfChannels());
      });
    }

    async cancion() {
      if(this.state.press = 1){
        this.whoosh.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
        if(this.state.press = 2){
          this.whoosh2.play((success) => {
            if (success) {
              console.log('successfully finished playing');
            } else {
              console.log('playback failed due to audio decoding errors');
            }
          });
        }
      }
      else{
        this.state.press - 3
      }
    }
      
    //fondo
    incrementColor = (color, step) => {
      const intColor = parseInt(color.substr(1), 16);
      const newIntColor = (intColor + step).toString(16);
      return `#${'3.5'.repeat(6 - newIntColor.length)}${newIntColor}`;
    };  
    componentDidMount() {
      setInterval(() => {
          this.setState({
            count: this.state.count + 1,
            colorTop: this.incrementColor(this.state.colorTop, 1),
            colorBottom: this.incrementColor(this.state.colorBottom, 10),
          });
        }, 20);
      }
      
  
  render(){
    return (
      <LinearGradient
            colors={[this.state.colorTop, this.state.colorBottom]}
            style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
          }}>
            <TouchableOpacity
              onPress={() => { 
                this.setState({ press: this.state.press + 1})
                  this.cancion();
              }}
                >
                <Text style={styles.buttonText}>Me encantas pequeña: {this.state.press} </Text>
                <Image style={styles.image} source={require('./src/assets/img/icons/unicornio.png')} />
            </TouchableOpacity>
      </View>
      </LinearGradient>
      );
    };
  }
  
const styles = StyleSheet.create({
  buttonContainer: {
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontWeight:'bold',
    color:'#FFF',
    fontSize:15,
    padding: 15,
    marginLeft: 1,
    marginRight: 1,
    width: 198
  },
  image:{
  flex:0,
  width:100,
  height:100,
  marginLeft:50
  }
});
  
export default App;