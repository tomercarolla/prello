import {createRoot} from 'react-dom/client'
import {Provider} from 'react-redux'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import {store} from './store/store'
import {App} from './App.jsx'
import './assets/styles/main.scss'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App/>
    </Provider>
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
