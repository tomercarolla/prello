import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import {store} from './store/store';
import {App} from './App.jsx';
import {I18nextProvider} from "react-i18next";
import {i18n} from "./utils/i18n.jsx";
import './assets/styles/main.scss';

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <App/>
        </I18nextProvider>
    </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
