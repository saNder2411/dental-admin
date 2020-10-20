import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';
// Locale
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';

import usNumbers from 'cldr-numbers-full/main/en/numbers.json';
import usLocalCurrency from 'cldr-numbers-full/main/en/currencies.json';
import usCaGregorian from 'cldr-dates-full/main/en/ca-gregorian.json';
import usDateFields from 'cldr-dates-full/main/en/dateFields.json';

import deNumbers from 'cldr-numbers-full/main/de/numbers.json';
import deLocalCurrency from 'cldr-numbers-full/main/de/currencies.json';
import deCaGregorian from 'cldr-dates-full/main/de/ca-gregorian.json';
import deDateFields from 'cldr-dates-full/main/de/dateFields.json';

import frNumbers from 'cldr-numbers-full/main/fr/numbers.json';
import frLocalCurrency from 'cldr-numbers-full/main/fr/currencies.json';
import frCaGregorian from 'cldr-dates-full/main/fr/ca-gregorian.json';
import frDateFields from 'cldr-dates-full/main/fr/dateFields.json';

import esNumbers from 'cldr-numbers-full/main/es/numbers.json';
import esLocalCurrency from 'cldr-numbers-full/main/es/currencies.json';
import esCaGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import esDateFields from 'cldr-dates-full/main/es/dateFields.json';

import itNumbers from 'cldr-numbers-full/main/it/numbers.json';
import itLocalCurrency from 'cldr-numbers-full/main/it/currencies.json';
import itCaGregorian from 'cldr-dates-full/main/it/ca-gregorian.json';
import itDateFields from 'cldr-dates-full/main/it/dateFields.json';
// Messages
import { enMessages, deMessages, frMessages, esMessages, itMessages } from './messages';

// Components
import { DrawerRouterContainer } from './components';
// Pages
import { Home } from '../Home';
import { Stylists } from '../Stylists';
import { Customers } from '../Customers';
// Styles
import './AppStyles.scss';
// Selectors
import { selectLocaleId } from './AppSelectors';

load(
  likelySubtags,
  currencyData,
  weekData,
  frNumbers,
  frLocalCurrency,
  frCaGregorian,
  frDateFields,
  usNumbers,
  usLocalCurrency,
  usCaGregorian,
  usDateFields,
  esNumbers,
  esLocalCurrency,
  esCaGregorian,
  esDateFields,
  deNumbers,
  deLocalCurrency,
  deCaGregorian,
  deDateFields,
  itNumbers,
  itLocalCurrency,
  itCaGregorian,
  itDateFields
);

loadMessages(enMessages, 'en-US');
loadMessages(deMessages, 'de');
loadMessages(esMessages, 'es');
loadMessages(frMessages, 'fr');
loadMessages(itMessages, 'it');

export const App: FC = (): JSX.Element => {
  const currentLocaleId = useSelector(selectLocaleId);

  return (
    <div className="App">
      <LocalizationProvider language={currentLocaleId}>
        <IntlProvider locale={currentLocaleId}>
          <Router>
            <DrawerRouterContainer>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/agenda">
                  <h1>Agenda</h1>
                </Route>
                <Route exact path="/stylists">
                  <Stylists />
                </Route>
                <Route exact path="/customers">
                  <Customers />
                </Route>
                <Route exact path="/services">
                  <h1>Services</h1>
                </Route>
                <Route exact path="/dashboard">
                  <h1>Dashboard</h1>
                </Route>
              </Switch>
            </DrawerRouterContainer>
          </Router>
        </IntlProvider>
      </LocalizationProvider>
    </div>
  );
};
