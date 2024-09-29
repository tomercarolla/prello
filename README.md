# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

#########

How to use useTranslation();

Example:
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<p>{t('BOARD')}</p>

also you can use keyPrefix if you have an object in en.json:

EN.JSON EXAMPLE:

"MENU": {
"TITLE" : "My Menu",
"MY_BOARDS": "My Boards"
}

how to use?

import { useTranslation } from 'react-i18next';

const { t } = useTranslation('', {
keyPrefix: 'MENU',
});

<p>{t('TITLE')}</p>

OR

const { t } = useTranslation();

<p>{t('MENU.TITLE')}</p>
