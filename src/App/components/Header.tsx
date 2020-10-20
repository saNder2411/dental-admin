import React, { FC, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DropDownList, DropDownListChangeEvent } from '@progress/kendo-react-dropdowns';
import { useLocalization } from '@progress/kendo-react-intl';
// Selectors
import { selectLocaleState } from '../AppSelectors';
// Images
import headerBg from '../../_assets/header-bg.png';

interface Props {
  page: string;
  onBurgerMenuClick: () => void;
}

export const Header: FC<Props> = ({ onBurgerMenuClick, page }): JSX.Element => {
  const localizationService = useLocalization();
  const { currentLocaleId, locales, onLocaleChange } = useSelector(selectLocaleState);
  const dispatch = useDispatch();

  const currentLanguage = locales.find((item) => item.localeId === currentLocaleId);

  const onLanguageChange = useCallback(({ value }: DropDownListChangeEvent) => onLocaleChange(dispatch, value.localeId), [
    onLocaleChange,
    dispatch,
  ]);

  return (
    <header className="header" style={{ backgroundImage: `url(${headerBg})` }}>
      <div className="nav-container">
        <div className="menu-button">
          <span className={'k-icon hamburger-icon'} onClick={onBurgerMenuClick} />
        </div>

        <div className="title">
          <h1>{localizationService.toLanguageString('custom.silverAgenda', `Silver Agenda`)}</h1>
          <span className="vl"></span>
          <h2>{page}</h2>
        </div>

        <div className="settings">
          <span>{localizationService.toLanguageString('custom.language', 'Language')}</span>
          <DropDownList textField={'locale'} dataItemKey={'localeId'} data={locales} value={currentLanguage} onChange={onLanguageChange} />
        </div>
      </div>
    </header>
  );
};
