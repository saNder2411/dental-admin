import React, { FC, useCallback, useMemo, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { useLocalization } from '@progress/kendo-react-intl';
// Selectors
import { selectLocaleState } from './AppSelectors';
import { selectMemoAuthData } from '../_sections/Grid/GridSelectors';
import { IndividualRights } from '../_sections/Grid/GridTypes';
// Images
import headerBg from '../_assets/header-bg.png';

interface Props {
  page: string;
  onBurgerMenuClick: () => void;
}

export const AppHeader: FC<Props> = ({ onBurgerMenuClick, page }): JSX.Element => {
  const localizationService = useLocalization();
  const { currentLocaleID, locales, onLocaleChange } = useSelector(selectLocaleState);
  const dispatch = useDispatch();
  const selectAuth = useMemo(() => selectMemoAuthData(), []);
  const auth = useSelector(selectAuth);
  const showSupportStylist =
    (auth && auth.IndividualRights === IndividualRights.Designer) ||
    (auth && auth.IndividualRights === IndividualRights.FullControl) ||
    (auth && auth.MembershipGroupId === 10);

  const currentLanguage = locales.find((item) => item.localeID === currentLocaleID);

  const onLanguageChange = useCallback(({ value }: DropDownListChangeEvent) => onLocaleChange(dispatch, value.localeID), [onLocaleChange, dispatch]);

  return (
    <header className="header" style={{ backgroundImage: `url(${headerBg})` }}>
      <ul className="nav justify-content-end" style={{ minHeight: '40px' }}>
        <li className="nav-item">
          {showSupportStylist && (
            <a
              className="nav-link d-flex d-flex justify-content-between align-items-center"
              href="https://sa-toniguy01.metroapps.online/_layouts/15/viewlsts.aspx"
              target="_blank"
              rel="noopener noreferrer">
              <span className={`k-icon k-i-gear`} />
              &nbsp;<span className="k-item-text">StyCal-Admin</span>
            </a>
          )}
        </li>
      </ul>
      <div className="nav-container">
        <div className="menu-button">
          <span className="k-icon hamburger-icon" onClick={onBurgerMenuClick} />
        </div>

        <div className="title">
          <h1>{localizationService.toLanguageString('custom.silverAgenda', `Silver Agenda`)}</h1>
          <span className="vl"></span>
          <h2>{page}</h2>
        </div>

        <div className="settings">
          <span>{localizationService.toLanguageString('custom.language', 'Language')}</span>
          <DropDownList textField={'locale'} dataItemKey={'localeID'} data={locales} value={currentLanguage} onChange={onLanguageChange} />
        </div>
      </div>
    </header>
  );
};
