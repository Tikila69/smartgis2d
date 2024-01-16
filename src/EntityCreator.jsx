import { Cartesian3, Entity } from "cesium";
import { useCesium } from "resium";
import { useEffect } from "react";
import czml from './czml.json';

export default function EntityCreator() {
    const { viewer } = useCesium();
  
    useEffect(() => {
      if (viewer) {
        czml.forEach(item => {
          if (item.position && item.position.cartographicDegrees && item.position.cartographicDegrees.length >= 3) {
            const [longitude, latitude, height] = item.position.cartographicDegrees;
            try {
              const entity = new Entity({
                position: Cartesian3.fromDegrees(longitude, latitude, height),
                name: item.name,
                point: {
                  pixelSize: 10,
                },
              });
              viewer.entities.add(entity);
            } catch (error) {
              console.error('Error creating entity:', error); 
            }
          } else {
            console.error('Item does not have a valid position:', item);
          }
        });
      }
    }, [viewer]);
  
    return null;
  }