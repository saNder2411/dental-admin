import React, { FC, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, NavLink } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerItem, DrawerItemProps } from '@progress/kendo-react-layout';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { AppHeader } from './AppHeader';
// SC
import * as SC from './AppItemsStyled/CustomDrawerItemStyled';
// Selectors
import { selectIsExpandedSidebar } from './AppSelectors';
// Actions
import { setIsExpendedSidebarAC } from './AppActions';
// Images
import bodyBg from '../_assets/body-bg.jpeg';
// App-Config
import AppConfig from '../../public/app-config.json';

const Items = [
  { name: 'agenda', iconSvg: 'k-i-bell', selected: true, route: `${AppConfig.prefixUrl}${AppConfig.indexFileName}/` },
  { name: 'calendar', iconSvg: 'k-i-calendar', selected: false, route: `${AppConfig.prefixUrl}${AppConfig.indexFileName}/calendar` },
  { name: 'teamStaff', iconSvg: 'profile-icon', selected: false, route: `${AppConfig.prefixUrl}${AppConfig.indexFileName}/team-staff` },
  { name: 'customers', iconSvg: 'k-i-tell-a-friend', selected: false, route: `${AppConfig.prefixUrl}${AppConfig.indexFileName}/customers` },
  { name: 'services', iconSvg: 'k-i-ungroup', selected: false, route: `${AppConfig.prefixUrl}${AppConfig.indexFileName}/services` },
  { name: 'dashboard', iconSvg: 'dashboard-icon', selected: false, route: `${AppConfig.prefixUrl}${AppConfig.indexFileName}/dashboard` },
];

const getSelectedItemName = (pathname: string): string => {
  const currentItem = Items.find((item) => item.route === pathname);
  if (currentItem) {
    return currentItem.name;
  }
  return ``;
};

export const CustomDrawerItem: FC<DrawerItemProps> = ({ iconSvg, text, route, ...others }): JSX.Element => (
  <SC.CustomDrawerItem>
    <NavLink to={route}>
      <DrawerItem {...others}>
        <span className={`k-icon ${iconSvg}`} />
        <span className="k-item-text">{text}</span>
      </DrawerItem>
    </NavLink>
  </SC.CustomDrawerItem>
);

interface Props {
  children: JSX.Element | JSX.Element[] | [];
}

export const AppDrawerRouterContainer: FC<Props> = ({ children }): JSX.Element => {
  const dispatch = useDispatch();
  const isExpended = useSelector(selectIsExpandedSidebar);
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
        onBurgerMenuClick={() => dispatch(setIsExpendedSidebarAC(!isExpended))}
        page={localizationService.toLanguageString(`custom.${selectedItemName}`, `${selectedItemName}`)}
      />
      <Drawer
        expanded={isExpended}
        items={Items.map((item) => ({
          ...item,
          text: localizationService.toLanguageString(`custom.${item.name}`, `${item.name}`),
          selected: item.name === selectedItemName,
        }))}
        item={CustomDrawerItem}
        position="start"
        mode={isSmallerScreen ? 'overlay' : 'push'}
        mini={!isSmallerScreen}
        onOverlayClick={() => dispatch(setIsExpendedSidebarAC(!isExpended))}
        onSelect={() => dispatch(setIsExpendedSidebarAC(false))}
        style={{ backgroundImage: `url(${bodyBg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </>
  );
};
