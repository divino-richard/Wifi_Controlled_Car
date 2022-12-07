
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function App() {
  const ws = new WebSocket('ws://192.168.1.182:5000/');


  ws.onopen = () => {
  }
 
  ws.onerror = (e) => {
    if(e.currentTarget.readyState === 3){
      alert('Connection Faild')
    }
  }

  ws.onmessage = (e) => {
    console.log("Recieved Message: " + e.data );
  }

  const connectToServer = () => {
    // setSate({connectStatus: 'Connecting to the server...'})
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden/>

      <View style={styles.setUpContainer}>
        <TouchableOpacity style={styles.connectBtn} onPress={() => connectToServer()}>
          <Text style={styles.connectBtnText}>{'CONNECT TO SERVER'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.startBtn} onPress={() => ws.send('START')}>
          <Text style={styles.startBtnText}>{'START'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.stopBtn} onPress={() => ws.send('STOP')}>
          <Text style={styles.stopBtnText}>{'STOP'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controllsContiner}>
        <TouchableOpacity style={styles.verticalControll} onPress={() => ws.send('FORWARD')}>
          <Image style={styles.controllerIcon} source={require('./assets/up-arrow.png')}/>
        </TouchableOpacity>

        <View style={styles.horizontalControllContainer} >
          <TouchableOpacity style={styles.horizontalControll} onPress={() => ws.send('LEFT')}>
            <Image style={styles.controllerIcon} source={require('./assets/left-arrow.png')}/>
          </TouchableOpacity>

          <TouchableOpacity style={styles.horizontalControll} onPress={() => ws.send('RIGHT')}>
            <Image style={styles.controllerIcon} source={require('./assets/right-arrow.png')}/>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.verticalControll} onPress={() => ws.send('REVERSE')}>
          <Image style={styles.controllerIcon} source={require('./assets/down-arrow.png')}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height:'100%',
    width: '100%',
    backgroundColor: '#000000',
    paddingHorizontal: 20
  },
  setUpContainer: {
    height: '100%',
    paddingVertical: 30,
    justifyContent: 'space-evenly'
  }, 
  connectBtn: {
    borderColor: 'blue',
    borderWidth: 2,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 50
  },
  connectBtnText: {
    color: 'blue'
  }, 
  startBtn: {
    width: 175,
    borderColor: 'green',
    borderWidth: 2,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center'
  },
  startBtnText: {
    color: 'green'
  }, 
  stopBtn: {
    width: 175,
    borderColor: 'red',
    borderWidth: 2,
    paddingHorizontal: 50,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center'
  },
  stopBtnText: {
    color: 'red'
  },  
  controllsContiner: {
    padding: 10,
    borderColor: '#FFF',
    borderWidth: 5,
    backgroundColor: '#3c726d',
    height: 210,
    width: 210,
    borderRadius: 210/2,
    alignItems: 'center'
  },
  verticalControll: {
    paddingVertical: 25,
    width: 40,
    backgroundColor: '#b7bddb',
    alignItems: 'center',
    borderRadius: 20
  },  
  horizontalControllContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },  
  horizontalControll: {
    paddingHorizontal: 25,
    height: 40,
    backgroundColor: '#b7bddb',
    justifyContent: 'center',
    borderRadius: 20
  },
  controllerIcon: {
    width: 20,
    height: 20
  }

})

export default App
