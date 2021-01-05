import React, { FC, useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerItem, DrawerItemProps } from '@progress/kendo-react-layout';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { AppHeader } from '.';
// SC
import * as SC from './AppItemsStyled/CustomDrawerItemStyled';
// Action Creators
import { changeDataNameAC } from '../_sections/Grid/GridAC';
// Types
import { GridDataName } from '../_sections/Grid/GridTypes';
// Images
import bodyBg from '../_assets/body-bg.jpeg';

const items = [
  { name: 'agenda', iconSvg: 'home-icon', selected: true, route: '/' },
  { name: 'calendar', iconSvg: 'k-i-calendar-date', selected: false, route: '/calendar' },
  { name: 'teamStaff', iconSvg: 'profile-icon', selected: false, route: '/team-staff' },
  { name: 'customers', iconSvg: 'k-i-tell-a-friend', selected: false, route: '/customers' },
  { name: 'services', iconSvg: 'k-i-currency', selected: false, route: '/services' },
  { name: 'dashboard', iconSvg: 'dashboard-icon', selected: false, route: '/dashboard' },
];

const getSelectedItemName = (pathname: string): string => {
  const currentItem = items.find((item) => item.route === pathname);
  if (currentItem) {
    return currentItem.name;
  }
  return ``;
};

export const CustomDrawerItem: FC<DrawerItemProps> = ({ iconSvg, text, route, ...others }): JSX.Element => {
  const isCalendar = route === '/calendar';
  const dispatch = useDispatch();
  const onClick = useCallback(() => isCalendar && dispatch(changeDataNameAC(GridDataName.Default)), [dispatch, isCalendar]);

  return (
    <SC.CustomDrawerItem>
      <NavLink to={route} onClick={onClick}>
        <DrawerItem {...others}>
          <span className={`k-icon ${iconSvg}`} />
          <span className="k-item-text">{text}</span>
        </DrawerItem>
      </NavLink>
    </SC.CustomDrawerItem>
  );
};

interface Props {
  children: JSX.Element | JSX.Element[] | [];
}

export const AppDrawerRouterContainer: FC<Props> = ({ children }): JSX.Element => {
  const [isExpended, setIsExpended] = useState(true);
  const [isSmallerScreen, setIsSmallerScreen] = useState(false);
  const localizationService = useLocalization();
  const { pathname } = useLocation();
  const selectedItemName = getSelectedItemName(pathname);

  useEffect(() => {
    const onResizeWindow = () => setIsSmallerScreen(window.innerWidth < 768);
    setIsSmallerScreen(window.innerWidth < 768);

    window.addEventListener('resize', onResizeWindow);

    return () => window.removeEventListener('resize', onResizeWindow);
  }, [setIsSmallerScreen]);

  return (
    <>
      <AppHeader
        onBurgerMenuClick={() => setIsExpended((prevState) => !prevState)}
        page={localizationService.toLanguageString(`custom.${selectedItemName}`, `${selectedItemName}`)}
      />
      <Drawer
        expanded={isExpended}
        items={items.map((item) => ({
          ...item,
          text: localizationService.toLanguageString(`custom.${item.name}`, `${item.name}`),
          selected: item.name === selectedItemName,
        }))}
        item={CustomDrawerItem}
        position="start"
        mode={isSmallerScreen ? 'overlay' : 'push'}
        mini={!isSmallerScreen}
        onOverlayClick={() => setIsExpended((prevState) => !prevState)}
        onSelect={() => setIsExpended(false)}
        style={{ backgroundImage: `url(${bodyBg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </>
  );
};
