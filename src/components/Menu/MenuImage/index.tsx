import { useAppDispatch } from 'app/hooks';
import { updateCurrentOptionAction } from 'features/menu/menuSlice';
import React from 'react';
import styles from './styles.module.scss';
interface Props {
    isSelected: boolean
    src: string
}
const MenuImage: React.FC<Props> = ({ isSelected, src }) => {
  const dispatch = useAppDispatch();
  const onMenuImageClick = (e: React.MouseEvent) => {
    console.log('click')
    if (isSelected) {
      dispatch(updateCurrentOptionAction());
        return
    }
    dispatch(updateCurrentOptionAction({
        name: 'lion',
        type: 'image',
        src: (e.target as any).src
    }));
}
    return <img
    className={isSelected ? styles.selected : styles.unselected}
    alt="lion"
    src={src}
    onClick={onMenuImageClick}       
  />
}

export default MenuImage;