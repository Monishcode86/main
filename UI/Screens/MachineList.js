
import {
  StatusBar,
  StyleSheet,
  View
} from 'react-native';
import COLORS from '../constants/colors';
import OtherScreen from '../OthersScreen/others';

const MachineList = ({navigation}) => {
  console.log("Testingz");
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.black} />
    
      <OtherScreen params={navigation}/>
    </View>
  );
};
const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});
export default MachineList;
