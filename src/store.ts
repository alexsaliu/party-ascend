import { create } from "zustand"

export const gameStates = {
  MENU: "MENU",
  GAME: "GAME",
  GAME_OVER: "GAME_OVER"
}

const colorMap = {
  green: "#a2f4c1",
  blue: "#a6e7f0",
  yellow: "#fce177",
  red: "#f26c73"
}

type Color = keyof typeof colorMap

export const useStore = create((set, get) => ({
  color: colorMap.red,
  colorName: "red",
  setColor: (color: Color) => set({ color: colorMap[color], colorName: color }),
  gameState: gameStates.MENU,
  startGame: () => set({ gameState: gameStates.GAME }),
  endGame: () => set({ gameState: gameStates.GAME_OVER })
}))
