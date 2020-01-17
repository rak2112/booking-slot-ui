import React from 'react';
import {AppProvider, Page, Card, Button} from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';
import { SlotBooker, ToastBooker } from './pages';
import './App.css';

const App: React.FC = () => {
  return (
    <AppProvider i18n={enTranslations}>
      <SlotBooker/>
      <ToastBooker/>
    </AppProvider>
  );
}

export default App;
