import React, {
  useReducer,
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
  useCallback,
} from "react";
import { Color } from "./ColorContext";

export type Pixels = (Color[] | undefined)[];

export interface Grid {
  height: number;
  width: number;
}

export interface PixelState {
  pixels: Pixels;
  grid: Grid;
}

export interface PixelContextProps {
  state: PixelState;
  setState: React.Dispatch<Partial<PixelState>>;
}

export const PixelContext = createContext<PixelContextProps>(
  {} as PixelContextProps
);

function stateReducer(state: PixelState, newState: Partial<PixelState>) {
  return { ...state, ...newState };
}

export const PixelContextProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, setState] = useReducer(stateReducer, {
    pixels: [],
    grid: { height: 10, width: 10 },
  });

  return (
    <PixelContext.Provider value={{ state, setState }}>
      {children}
    </PixelContext.Provider>
  );
};

export const useGrid = (): [grid: Grid, setGrid: (grid: Grid) => void] => {
  const context = useContext(PixelContext);

  if (!context) {
    throw new Error("Missing PixelContextProvider in tree");
  }

  const setGrid = useCallback(
    (grid: Grid) => {
      context.setState({ grid });
    },
    [context]
  );

  return [context.state.grid, setGrid];
};

export const usePixels = (): [
  pixels: Pixels,
  setPixels: (pixels: Pixels) => void
] => {
  const context = useContext(PixelContext);

  if (!context) {
    throw new Error("Missing PixelContextProvider in tree");
  }

  const setPixels = useCallback(
    (pixels: Pixels) => {
      context.setState({ pixels });
    },
    [context]
  );

  return [context.state.pixels, setPixels];
};
