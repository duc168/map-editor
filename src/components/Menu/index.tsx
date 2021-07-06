import { useAppSelector } from 'app/hooks';
import { RootState } from 'app/store';
import { updateCurrentOptionAction } from 'features/menu/menuSlice';
import React from 'react';
const Menu: React.FC<any> = () => {
    const currentOption = useAppSelector((state: RootState) => state.menu.currentOption)
    console.log('current Option in Menu', currentOption)
    return <>
    Select Image
      <br />
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        // draggable="true"
        onClick={(e) => {
            console.log('click')
            updateCurrentOptionAction({
                name: 'lion',
                type: 'image',
                src: (e.target as any).src
            });
        }}
        // onDragStart={(e) => {
        //   dragUrl.current = (e.target as any).src;
        // }}
      />
    </>
}

export default Menu;