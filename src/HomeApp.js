import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

function HomeApp({navigation}){
    return(
        <View style={styles.container}>
            <Text>Teste</Text>
            <TouchableOpacity style={styles.buttonHome} onPress={() => navigation.navigate("ScreenCam")}>
                <Text style={{fontSize: 14, color: "white", textAlign: 'center', cursor: 'pointer'}}>Ir para Câmera</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    buttonHome: {
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 40,
        borderRadius: 15,
        backgroundColor: '#590232',
        marginTop: 150,
    }
})

export default HomeApp;