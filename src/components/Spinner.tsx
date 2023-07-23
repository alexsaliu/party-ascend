import { Image } from '@react-three/drei'
import Bottle from './Bottle'

export default function Spinner() {
    return (
        <group >
            <Bottle position={[0,1,0]}/>
            <Image position={[0, 1, 0]} scale={[.3, .3]} url="/images/spin.png" transparent toneMapped={false}/>
        </group>
    )
}