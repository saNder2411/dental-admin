import React, { FC } from 'react';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { useLocalization } from '@progress/kendo-react-intl';

import { locales } from '../resources/locales';
// Images
import headerBg from '../../assets/header-bg.png';

interface Props {
  page: string;
  onMenuClick: () => void;
}

export const Header: FC<Props> = ({ onMenuClick, page }): JSX.Element => {
  const localizationService = useLocalization();
  return (
    <header className="header" style={{ backgroundImage: `url(${headerBg})` }}>
      <div className="nav-container">
        <div className="menu-button">
          <span className={'k-icon hamburger-icon'} onClick={onMenuClick} />
        </div>

        <div className="title">
          <h1>{localizationService.toLanguageString('Silver Agenda', `Silver Agenda`)}</h1>
          <span className="vl"></span>
          <h2>{page}</h2>
        </div>

        <div className="settings">
          <span>{localizationService.toLanguageString('Language', 'Language')}</span>
          <DropDownList
            textField={'locale'}
            dataItemKey={'localeId'}
            data={locales}
            value={{
              locale: 'English',
              localeId: 'en-US',
            }}
            onChange={(evt) => console.log(evt.value.localeId)}
          />
        </div>
      </div>
    </header>
  );
};
