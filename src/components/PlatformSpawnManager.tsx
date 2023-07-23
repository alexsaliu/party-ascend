import {useEffect, useState, useCallback} from "react";
import Platform from "./Platform";

export default function PlatformSpawnManager() {
    const [platforms, setPlatforms] = useState([<Platform position={[0,0,0]} />, <Platform position={[.5,0,0]} />]);
    const platformWidth = .5;
  
    const spawnPlatform = useCallback(() => {
      setPlatforms(prevPlatforms => {
        const newPlatforms = [...prevPlatforms];
        const lastPlatform = newPlatforms[newPlatforms.length - 1];
        const lastPlatformPosition = lastPlatform.props.position;
        const nextPlatform =  <Platform position={[lastPlatformPosition[0] + platformWidth, lastPlatformPosition[1], lastPlatformPosition[2]]} />;
        return [...newPlatforms, nextPlatform];
      });
    }, [platformWidth]);
  
    useEffect(() => {
      // function to be run when the spacebar key is pressed
      const handleSpacebarPress = (event: KeyboardEvent) => {
        if (event.code === 'Space') {
          spawnPlatform();
        }
      };
  
      // attach the event listener
      window.addEventListener('keydown', handleSpacebarPress);
  
      // clean up on unmount
      return () => {
        // remove the event listener
        window.removeEventListener('keydown', handleSpacebarPress);
      };
    }, [spawnPlatform]);  // add spawnPlatform as a dependency, so it's always the latest version when the event fires
  
  
    return (
      <>
        {platforms.map((platform, index) => (
          <group key={index}>
            {platform}
          </group>
        ))}
      </>
    );
  }
  
  