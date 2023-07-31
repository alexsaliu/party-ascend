import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware";
export const gameStates = {
  MENU: "MENU",
  BOTTLESPIN: "BOTTLESPIN",
  PLATFORMSPIN: "PLATFORMSPIN",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER"
}

const colorMap = {
  green1: "#a2f4c1",
  blue1: "#a6e7f0",
  yellow1: "#fce177",
  red1: "#f26c73",
  green2: "#a2f4c1",
  blue2: "#a6e7f0",
  yellow2: "#fce177",
  red2: "#f26c73",
}

type Color = keyof typeof colorMap

export const useStore = create(
  subscribeWithSelector((set, get) => ({
  color: colorMap.red1,
  colorName: "red",
  setColor: (color: Color) => set({ color: colorMap[color], colorName: color }),
  gameState: gameStates.MENU,
  goToMenu: () => set({ gameState: gameStates.MENU }),
  startBottleSpin: () => set({ gameState: gameStates.BOTTLESPIN }),
  startPlatformSpin: () => set({ gameState: gameStates.PLATFORMSPIN }),
  startGame: () => set({ gameState: gameStates.GAME }),
  endGame: () => set({ gameState: gameStates.GAME_OVER }),
  colorHovered: "",
  setColorHovered: (color: Color) => set({ colorHovered: color }),
  checkColorMatch: (): boolean => {
    console.log(get().colorName, get().colorHovered, 'match?')
    return get().colorName === get().colorHovered
  } 
})))
