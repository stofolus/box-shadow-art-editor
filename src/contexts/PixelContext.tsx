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
  pixels: Pixels[];
  grid: Grid;
  activeFrame: number;
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
    pixels: [[]],
    grid: { height: 10, width: 10 },
    activeFrame: 0,
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
  setPixels: (pixels: Pixels) => void,
  frames: Pixels[]
] => {
  const context = useContext(PixelContext);

  if (!context) {
    throw new Error("Missing PixelContextProvider in tree");
  }

  const setPixels = useCallback(
    (pixels: Pixels) => {
      const pixelsCopy = [...context.state.pixels];
      pixelsCopy[context.state.activeFrame] = pixels;
      context.setState({ pixels: pixelsCopy });
    },
    [context]
  );

  return [
    context.state.pixels[context.state.activeFrame],
    setPixels,
    context.state.pixels,
  ];
};

export const useGif = (): [
  activeFrame: number,
  addFrame: () => void,
  removeFrame: () => void,
  setActiveFrame: (frameNumber: number) => void
] => {
  const context = useContext(PixelContext);

  const addFrame = () => {
    const pixelsCopy = [...context.state.pixels];
    pixelsCopy.push([]);
    context.setState({
      pixels: pixelsCopy,
    });
  };

  const removeFrame = () => {
    const pixelsCopy = [...context.state.pixels];
    context.setState({
      pixels: pixelsCopy.slice(0, pixelsCopy.length - 1),
    });
  };

  const setActiveFrame = (frameNumber: number) => {
    context.setState({ activeFrame: frameNumber });
  };

  return [context.state.activeFrame, addFrame, removeFrame, setActiveFrame];
};
