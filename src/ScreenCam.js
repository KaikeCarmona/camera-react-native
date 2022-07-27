import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons'; 


export default function ScreenCam() {
  const camRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [galeria, setGaleria] = useState(null);
  const [open, setOpen] = useState(false);


  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>Acesso Negado</Text>;
  }

  async function tirarFoto(){
    if(camRef){
        const data = await camRef.current.tirarFotoAsync();
        setGaleria(data.uri);
        setOpen(true);
        console.log(data);
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={camRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setType(type === CameraType.back ? CameraType.front : CameraType.back);
            }}>
            <Text style={styles.text}> Flip </Text>
          </TouchableOpacity>
        </View>
      </Camera>
      <TouchableOpacity style={styles.buttons}>
         <MaterialIcons name="motion-photos-on" size={24} color="black" />
      </TouchableOpacity>

      { galeria && 
        <Modal
            animationType='slide'
            transparent={false}
            visible={open}
        >
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20}}>
                <TouchableOpacity style={{margin: 10}}>
                    <Text style={{fontSize: 16}}>Teste</Text>
                </TouchableOpacity>

                <Image style={{width: '100%', height: 300, borderRadius: 20}}
                source={{ uri: galeria}}/>


            </View>
        </Modal>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
  buttons:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 30,
    borderRadius: 10,
    margin: 5,

  }
});
