/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component, Fragment} from 'react';import LinearGradient from 'react-native-linear-gradient';
 import {Header, Colors} from 'react-native/Libraries/NewAppScreen';
 import Sound from 'react-native-sound';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TouchableOpacity,
   Image,
   Button
 } from 'react-native';
 
 function setTestState(testInfo, component, status) {
   component.setState({tests: {...component.state.tests, [testInfo.title]: status}});
 }
 
 /**
  * Generic play function for majority of tests
  */
 function playSound(testInfo, component) {
   setTestState(testInfo, component, 'pending');
 
   const callback = (error, sound) => {
     if (error) {
       Alert.alert('error', error.message);
       setTestState(testInfo, component, 'fail');
       return;
     }
     setTestState(testInfo, component, 'playing');
     // Run optional pre-play callback
     testInfo.onPrepared && testInfo.onPrepared(sound, component);
     sound.play(() => {
       // Success counts as getting to the end
       setTestState(testInfo, component, 'win');
       // Release when it's done so we're not using up resources
       sound.release();
     });
   };
 
   // If the audio is a 'require' then the second parameter must be the callback.
   if (testInfo.isRequire) {
     const sound = new Sound(testInfo.url, error => callback(error, sound));
   } else {
     const sound = new Sound(testInfo.url, testInfo.basePath, error => callback(error, sound));
   }
 }
 
 //sonido
 const audioTests = [
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
 
 
 class App extends Component{
   constructor(props) {
     super(props);
 
     Sound.setCategory('Playback', true); // true = mixWithOthers
 
     // Special case for stopping
     this.stopSoundLooped = () => {
       if (!this.state.loopingSound) {
         return;
       }
 
       this.state.loopingSound.stop().release();
       this.setState({loopingSound: null, tests: {...this.state.tests, ['mp3 in bundle (looped)']: 'win'}});
     };
 
     this.state = {
       count: 0,
       press: 0,
       colorTop: '#9400D3',
       colorBottom: '#fcfcfc',
       loopingSound: undefined,
       tests: {},
     };
     
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
                 {/* {audioTests.map(testInfo => {
             return ( */}
               <TouchableOpacity
                 onPress={() => { 
                   this.setState({ press: this.state.press + 1 }),
                   (audioTests.filter ( testInfo =>{ return playSound(testInfo, this)}))
                 }}
               >
                 <Text style={styles.buttonText}>Me encantas pequeña: {this.state.press} </Text>
                 <Image style={styles.image} source={require('./src/assets/img/icons/unicornio.png')} />
               </TouchableOpacity>
           { /*  );
           })} */}
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