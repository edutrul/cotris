import { Module } from "vuex";
import { rootState } from ".";
import { Tetramino } from "@/engine/entities/Tetramino";
import { Board } from "@/engine/entities/Board";

const gameState = () => ({
  score: 0,
  level: 0,
  currentGoal: 0,
  currentXSelection: 3,
  currentYSelection: 0,
  currentTetramino: Tetramino.getRandomTetramino(),
  nextTetramino: Tetramino.getRandomTetramino(),
  board: (null as unknown) as Board
});

export const game: Module<
  ReturnType<typeof gameState>,
  ReturnType<typeof rootState>
> = {
  namespaced: true,
  state: gameState,
  mutations: {
    increaseScore(state, by: number) {
      state.score += by;
    },
    moveX(state, squares: 1 | -1) {
      state.currentXSelection += squares;
    },
    dropY(state) {
      state.currentYSelection++;
    },
    setBoard(state, board: Board) {
      state.board = board;
    }
  },
  actions: {
    getNextTetramino({ state, commit }) {
      state.currentYSelection = 0;
      const [boardWidth] = state.board.options.numberOfBlocks;
      const boardNumOfPositions = boardWidth - 1
      const highestX = state.nextTetramino.getHighestX();
      const lowestX = state.nextTetramino.getLowestX()
      // Moving x when reach bounds and next tetramino exceeds board bounds
      if (highestX + state.currentXSelection > boardNumOfPositions) {
        commit("moveX", -highestX);
      } else if (state.currentXSelection + lowestX < 0) {
        commit("moveX", -lowestX)
      }
      state.currentTetramino = state.nextTetramino;
      state.nextTetramino = Tetramino.getRandomTetramino();
    }
  }
};
