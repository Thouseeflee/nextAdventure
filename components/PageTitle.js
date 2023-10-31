const { View, Text, Pressable, StyleSheet, StatusBar, TouchableOpacity } = require("react-native");
import { Ionicons} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Color from '../constants/color';
import Fonts from '../constants/font';


const PageTitle = ({children,onBackPress, backBtnStyle, containerStyle, backBtn}) => {
    const navigation = useNavigation();
  return (
    <View style={[styles.container, containerStyle]}>
        <TouchableOpacity onPress={onBackPress} style={[styles.iconConatiner,backBtnStyle,]} >
            <View>
                {backBtn && <Ionicons name="chevron-back" size={24} color={Color.grey} />}
            </View>       
        </TouchableOpacity>
        <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{children}</Text>
        </View>
        
        
        <Pressable>
            <Ionicons name='options-outline' size={32} />
        </Pressable>
        
    </View>
    
  )
}

export default PageTitle;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
       
        alignItems: 'center',
        marginTop:16,
        marginBottom:18,
        marginHorizontal: 12,
    },
    iconConatiner:{
        // padding: 24,
        marginLeft:4,
        
    },
    titleContainer:{
        flex: 1,
        alignItems:'center',
        
    },
    titleText:{
        fontWeight: 'bold',
        fontSize: Fonts.fontSize20
    }
})