import { Cartesian3, Entity, PolylineGraphics } from "cesium";
import { useCesium } from "resium";
import { useEffect } from "react";
import czml from './czml.json';

export default function EntityCreator() {
    const { viewer } = useCesium();
  
    useEffect(() => {
      if (viewer) {
        czml.forEach(item => {
          if (item.polyline && item.polyline.positions && item.polyline.positions.cartographicDegrees) {
            // Handle items with polyline
            const coordinates = item.polyline.positions.cartographicDegrees;
            const start = coordinates.slice(0, 3);
            const end = coordinates.slice(3, 6);
            const [startLongitude, startLatitude, startHeight] = start;
            const [endLongitude, endLatitude, endHeight] = end;
            try {
              const entity = new Entity({
                polyline: new PolylineGraphics({
                  positions: [
                    Cartesian3.fromDegrees(startLongitude, startLatitude, startHeight),
                    Cartesian3.fromDegrees(endLongitude, endLatitude, endHeight),
                  ],
                }),
                name: item.name,
              });
              viewer.entities.add(entity);
            } catch (error) {
              console.error('Error creating entity:', error); 
            }
          } else if (item.position && item.position.cartographicDegrees) {
            // Handle items with one set of coordinates
            const [longitude, latitude, height] = item.position.cartographicDegrees;
            const [red,green,blue,alpha] = item.cylinder.material.solidColor.color.rgba;
            try {
              const entity = new Entity({
                position: Cartesian3.fromDegrees(longitude, latitude, height),
                name: item.name,
                point: {
                  pixelSize: 10,
                  color: {
                    red: red,
                    blue: blue,
                    green: green,
                    alpha: alpha,
                  },
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