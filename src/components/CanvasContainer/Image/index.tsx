import { IImageItem, IItem } from 'interfaces';
import React, { useEffect, useState } from 'react';
import { Group, Text, Transformer, Image } from 'react-konva';
import useImage from 'use-image';


interface URLImageProp {
    image: IImageItem;
    selectedItem?: IItem;
    selectItem: (item: IItem) => void;
    updateItem: (item: IItem) => void
  }
  

const ImageContainer: React.FC<URLImageProp> = ({ image, selectItem, selectedItem, updateItem }) => {
    const shapeRef = React.useRef<any>();
    const trRef = React.useRef<any>();
    
    const [isDragging, setDraggingStatus] = useState(false);
    const [img] = useImage(image.src);
    const onSelect = () => {
      selectItem(image);
    };
    useEffect(() => {
      if (!updateItem) return
      if (img) {
        updateItem({
          ...image,
          width: img.width,
          height: img.height
        })
      }
    }, [img])
    React.useEffect(() => {
      const isSelected = selectedItem?.id === image.id;
      if (isSelected) {
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [selectedItem]);
    if (!img) return null
    return (
      <>
        <Group
          ref={shapeRef}
          x={image.x}
          y={image.y}
          width={image.width}
          height={image.height}
          draggable
          onDragStart={() => {
            setDraggingStatus(true);
          }}
          onDragEnd={(e) => {
            setDraggingStatus(false);
            updateItem({
              ...image,
              x: e.target.x(),
              y: e.target.y(),
            });
          }}
          onClick={onSelect}
          onTap={onSelect}
          onTransformEnd={(e) => {
            // transformer is changing scale of the node
            // and NOT its width or height
            // but in the store we have only width and height
            // to match the data better we will reset scale on transform end
            const node = shapeRef.current as any;
            if (!node) return;
            const scaleX = node.scaleX();
            const scaleY = node.scaleY();
            updateItem({
              ...image,
              x: node.x(),
              y: node.y(),
              // set minimal value
              width: Math.max(5, node.width() * scaleX),
              height: Math.max(node.height() * scaleY),
            });
            // we will reset it back
            // node.scaleX(1);
            // node.scaleY(1);
            
          }}
        >
          <Image
            image={img}          
            // I will use offset to set origin to the center of the image
            offsetX={img ? img.width / 2 : 0}
            offsetY={img ? img.height / 2 : 0}
            fill={isDragging ? "green" : "transparent"}
          />
          <Text
            name="text"
            fontSize={16}
            fontFamily="Calibri"
            fill="#555"
            padding={15}
            text="Lion"
            align="center"
            // width={"100%"}
            // x={image.x}
            // y={image.y}
            // offsetX={image.width ? image.width / 2 : 0}
            // offsetY={image.height ? image.y + image.height : 0}
            offsetY={img ? -img.height / 2 : 0}
          />
        </Group>
        {selectedItem?.id === image.id && <Transformer
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />}
      </>
    );
  };

  export default ImageContainer;