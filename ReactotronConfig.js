import Reactotron from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron.configure() // Ініціалізуємо Reactotron
  .useReactNative() // Додаткова конфігурація для React Native
  .use(reactotronRedux()) // Підключаємо Reactotron до Redux
  .connect();
