import { RootState } from "app/store";
import { IImageItem, IItem } from "interfaces";
import { KonvaEventObject } from "konva/lib/Node";
import React, { useRef, useState } from "react";
import { Layer, Stage } from "react-konva";
import { useSelector } from "react-redux";
import Image from "./Image";

const CanvasContainer: React.FC<any> = () => {
  const stageRef = useRef(null);
  const [items, updateItems] = useState<IItem[]>([]);
  const [selectedItem, selectItem] = useState<IItem>();
  const currentOption = useSelector((state: RootState) => state.menu.currentOption)

  const checkDeselect = (
    e: KonvaEventObject<MouseEvent> | KonvaEventObject<TouchEvent>
  ) => {
    try {
      // deselect when clicked on empty area
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        selectItem(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const updateItem = (item: IItem) => {
    const currentItems = [...items].filter((i) => i.id !== item.id);
    updateItems([...currentItems, item]);
  };

  return (
    <div
      onDrop={(e) => {
        e.preventDefault();
        // register event position
        if (stageRef?.current !== null) {
          (stageRef.current as any).setPointersPositions(e);
          // add image
          updateItems(
            items.concat([
              {
                ...(stageRef.current as any).getPointerPosition(),
                src: currentOption?.src,
                id: Math.random() * 10000000,
              },
            ])
          );
        }
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        style={{ border: "1px solid grey" }}
        ref={stageRef}
      >
        <Layer>
          {items.map((item) => {
            return (
              <Image
                key={item.id}
                image={item as IImageItem}
                selectItem={selectItem}
                selectedItem={selectedItem}
                updateItem={updateItem}
              />
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default CanvasContainer;
