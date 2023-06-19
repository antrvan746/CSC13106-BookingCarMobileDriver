/* eslint-disable prettier/prettier */
/* eslint-disable react/react-in-jsx-scope */
import {NavigationContainer} from '@react-navigation/native';

const Stack = createStackNavigator();

const TestScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MyComponent} />
        <Stack.Screen name="AnotherScreen" component={AnotherScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default TestScreen;
