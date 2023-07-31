import { create } from "zustand"
import { subscribeWithSelector } from "zustand/middleware";
export const gameStates = {
  MENU: "MENU",
  BOTTLESPIN: "BOTTLESPIN",
  PLATFORMSPIN: "PLATFORMSPIN",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER"
}

// - press play/menu
// - bottle spins
// - pie platform spin animation
// - spawn character

// -counter counts down from 5
// - check function(are colors a match?)
// - game over /win state

const colorMap = {
  green: "#a2f4c1",
  blue: "#a6e7f0",
  yellow: "#fce177",
  red: "#f26c73"
}

type Color = keyof typeof colorMap

export const useStore = create(
  subscribeWithSelector((set, get) => ({
  color: colorMap.red,
  colorName: "red",
  setColor: (color: Color) => set({ color: colorMap[color], colorName: color }),
  gameState: gameStates.MENU,
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
