import React, { FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IntlProvider, load, LocalizationProvider, loadMessages } from '@progress/kendo-react-intl';

// Locale
import likelySubtags from 'cldr-core/supplemental/likelySubtags.json';
import currencyData from 'cldr-core/supplemental/currencyData.json';
import weekData from 'cldr-core/supplemental/weekData.json';

import frNumbers from 'cldr-numbers-full/main/fr/numbers.json';
import frLocalCurrency from 'cldr-numbers-full/main/fr/currencies.json';
import frCaGregorian from 'cldr-dates-full/main/fr/ca-gregorian.json';
import frDateFields from 'cldr-dates-full/main/fr/dateFields.json';

import usNumbers from 'cldr-numbers-full/main/en/numbers.json';
import usLocalCurrency from 'cldr-numbers-full/main/en/currencies.json';
import usCaGregorian from 'cldr-dates-full/main/en/ca-gregorian.json';
import usDateFields from 'cldr-dates-full/main/en/dateFields.json';

import esNumbers from 'cldr-numbers-full/main/es/numbers.json';
import esLocalCurrency from 'cldr-numbers-full/main/es/currencies.json';
import esCaGregorian from 'cldr-dates-full/main/es/ca-gregorian.json';
import esDateFields from 'cldr-dates-full/main/es/dateFields.json';
import { enMessages } from './messages/en-US';
// Components
import { DrawerRouterContainer } from './components';
// Styles
import './AppStyles.scss';

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
  esDateFields
);

loadMessages(enMessages, 'en-US');

export const App: FC = (): JSX.Element => {
  return (
    <div className="App">
      <LocalizationProvider language={'en-US'}>
        <IntlProvider locale={'en-US'}>
          <Router>
            <DrawerRouterContainer>
              <Switch>
                <Route exact path="/">
                  <h1>Home</h1>
                </Route>
                <Route exact path="/agenda">
                  <h1>Agenda</h1>
                </Route>
                <Route exact path="/stylists">
                  <h1>Stylists</h1>
                </Route>
                <Route exact path="/customers">
                  <h1>Customers</h1>
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
