/** @format */
import { Navigation } from "react-native-navigation";
import App from './App';
import Plus from './src/screens/CounterPlus'
import Minus from './src/screens/CounterMinus';

import Stores from './src/stores'
import Provider from './src/utils/MobxRNNProvider';
//import {name as appName} from './app.json';

Navigation.registerComponent(`WelcomeScreen`, () => App);
Navigation.registerComponent(`PlusScreen`, () => Plus, Stores, Provider);
Navigation.registerComponent(`MinusScreen`, () => Minus, Stores, Provider);

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            stack: {
                id: 'AppStack',
                children: [{
                    component: {
                        name: "WelcomeScreen"
                    }
                }]
            }
        }
    });
});