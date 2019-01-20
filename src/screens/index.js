import React from 'react'
import { Navigation } from 'react-native-navigation'

import HomeScreen from './HomeScreen'
import TopScreen from './TopScreen';

import Provider from '../Provider';
import ListedAnime from './ListedAnimeScreen';

function WrappedComponent(Component) {
    return function inject(props) {
      const EnhancedComponent = () => (
        <Provider>
          <Component
            {...props}
          />
        </Provider>
      );
  
      return <EnhancedComponent />;
    };
  }

export default () => {
    Navigation.registerComponent('Home', () => WrappedComponent(HomeScreen))
    Navigation.registerComponent('ListedAnime', () => WrappedComponent(ListedAnime))
    Navigation.registerComponent('Top', () => WrappedComponent(TopScreen))
}