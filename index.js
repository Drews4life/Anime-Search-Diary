/** @format */
import { Navigation } from "react-native-navigation";
import registerScreens from './src/screens'

import signIn from './assets/signIn.png'
import signUp from './assets/signUp.png'

import IconFeather from 'react-native-vector-icons/Feather' //list / search
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons' //favorite-border

registerScreens()

Promise.all([
    IconFeather.getImageSource('search', 25),
    IconFeather.getImageSource('list', 25),
    IconMaterialIcons.getImageSource('favorite-border', 25)
])
    .then(result => {

        Navigation.setRoot({
            root: {
              bottomTabs: {
                id: 'BottomTabsId',               
                children: [
                  {
                    component: {
                      name: 'Home',
                      options: {
                        bottomTab: {
                          fontSize: 12,
                          text: 'Anime List',
                          icon: result[0]
                        }
                      }
                    },
                  },
                  {
                    component: {
                      name: 'Top',
                      options: {
                        bottomTab: {
                          text: 'More',
                          fontSize: 12,
                          icon: result[1]
                        }
                      }
                    },
                  },
                  {
                    stack: {
                      children: [
                        {
                          component: {
                            name: 'ListedAnime',
                            options: {
                              bottomTab: {
                                text: 'To Watch',
                                fontSize: 12,
                                icon: result[2]
                              },
                              topBar: {
                                visible: false,
                                height: 0,
                              }
                            },
                            children: [
                              {
                                component: {
                                  name: 'CreateFavorite'
                                },                               
                              }
                            ]
                          },
                        },
                      ]
                    }
                  }
                ],
              }
            }
          });
        
    })
