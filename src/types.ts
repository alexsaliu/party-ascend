import { Vector3, Euler, Color as ThreeColor } from "three";

export type Position = Vector3 | [x: number, y: number, z: number];
export type Rotation = Euler | [x: number, y: number, z: number];
export type Color = ThreeColor | string | 0xffffff;
