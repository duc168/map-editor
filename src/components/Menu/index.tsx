import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import React from 'react';
import MenuImage from './MenuImage';
import styles from './styles.module.scss';
const Menu: React.FC<any> = () => {
    const currentOption = useAppSelector((state: RootState) => state.menu.currentOption)
    const thisImageSrc = "https://konvajs.org/assets/lion.png";
    return <div className={styles.container}>
      Select Image
      <br />
      <MenuImage isSelected={thisImageSrc === currentOption?.src} src={thisImageSrc}  />
    </div>
}

export default Menu;