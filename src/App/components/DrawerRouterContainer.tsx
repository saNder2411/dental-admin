import React, { FC, useState, useEffect } from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { Drawer, DrawerContent, DrawerItem } from '@progress/kendo-react-layout';
import { useLocalization } from '@progress/kendo-react-intl';
// Components
import { Header } from './Header';
// Images
import bodyBg from '../../assets/body-bg.jpeg';

const items = [
  { name: 'Home', iconSvg: 'home-icon', selected: true, route: '/' },
  { name: 'Agenda', iconSvg: 'k-i-calendar-date', selected: false, route: '/agenda' },
  { name: 'Stylists', iconSvg: 'profile-icon', selected: false, route: '/stylists' },
  { name: 'Customers', iconSvg: 'k-i-tell-a-friend', selected: false, route: '/customers' },
  { name: 'Services', iconSvg: 'k-i-currency', selected: false, route: '/services' },
  { name: 'Dashboard', iconSvg: 'dashboard-icon', selected: true, route: '/dashboard' },
];

const getSelectedItemName = (pathname: string): string => {
  const currentItem = items.find((item) => item.route === pathname);
  if (currentItem) {
    return currentItem.name;
  }
  return ``;
};

const CustomDrawerItem = (props: any) => {
  const { iconSvg, text, ...others } = props;
  return (
    <NavLink to={props.route}>
      <DrawerItem {...others}>
        <span className={`k-icon ${iconSvg}`} />
        <span className="k-item-text">{text}</span>
      </DrawerItem>
    </NavLink>
  );
};

interface Props {
  children: JSX.Element | JSX.Element[] | [];
}

export const DrawerRouterContainer: FC<Props> = ({ children }): JSX.Element => {
  const [isExpended, setIsExpended] = useState(true);
  const [isSmallerScreen, setIsSmallerScreen] = useState(window.innerWidth < 768);
  const localizationService = useLocalization();
  // const intl = useInternationalization();
  const { pathname } = useLocation();
  const selectedItemName = getSelectedItemName(pathname);

  useEffect(() => {
    const onResizeWindow = () => {
      setIsSmallerScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', onResizeWindow);
    onResizeWindow();

    return () => {
      window.removeEventListener('resize', onResizeWindow);
    };
  }, [setIsSmallerScreen]);

  return (
    <>
      <Header
        onMenuClick={() => setIsExpended((prevState) => !prevState)}
        page={localizationService.toLanguageString(`${selectedItemName}`, `${selectedItemName}`)}
      />
      <Drawer
        expanded={isExpended}
        items={items.map((item) => ({
          ...item,
          text: localizationService.toLanguageString(`${item.name}`, `${item.name}`),
          selected: item.name === selectedItemName,
        }))}
        item={CustomDrawerItem}
        position="start"
        mode={isSmallerScreen ? 'overlay' : 'push'}
        mini={isSmallerScreen ? false : true}
        onOverlayClick={() => setIsExpended((prevState) => !prevState)}
        onSelect={() => setIsExpended(true)}
        style={{ backgroundImage: `url(${bodyBg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    </>
  );
};
