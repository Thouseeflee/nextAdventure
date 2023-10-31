import { View, Text, Pressable, StyleSheet } from "react-native";

const PrimaryButton = ({children, onPress, containerStyle,textStyle,innerContainerStyle,isEnabled=()=>true}) => {
  
  return (
    <View style={[styles.outerContainer, containerStyle, !isEnabled?.() &&{backgroundColor:"#d4d4d4"}]}>
      <Pressable  style={({pressed}) => [styles.innerContainer, innerContainerStyle, pressed && styles.pressed,]} onPress={onPress} android_ripple={{color: "#d4d4d4"}}>
        <Text style={[styles.buttonText, textStyle, !isEnabled?.() &&{color:"white"}]}>{children}</Text>
      </Pressable>
    </View>
  )
}

export default PrimaryButton;

const styles = StyleSheet.create({
  outerContainer:{
    borderRadius: 8,
    backgroundColor: "#F26523",
    marginVertical:10
  },
  innerContainer:{
    
    paddingVertical: 11,
    paddingHorizontal:16,
    elevation: 2,
  },
  buttonText:{
    color: '#fff',
    textAlign: 'center',
    fontSize: 18
  },
  pressed: {
    opacity: .7
  }
  
})