import { AppRegistry } from "react-native";
import App from "./src/app";
import { I18nextProvider } from "react-i18next";
import i18n from "./src/locale/i18n";
import { name as appName } from './app.json';

export default function Root() {
  return (
    <I18nextProvider i18n={i18n}>
        <App />
    </I18nextProvider>
  );
}

AppRegistry.registerComponent(appName, () => Root);
