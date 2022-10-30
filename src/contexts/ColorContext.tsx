import React, {
  useReducer,
  createContext,
  FunctionComponent,
  ReactNode,
  useContext,
} from "react";

export interface Color {
  name: string;
  value: string;
}

export interface ColorState {
  color: Color[];
  activeColor: Color;
}

export interface ColorContextProps {
  state: ColorState;
  setState: React.Dispatch<Partial<ColorState>>;
}

export const ColorContext = createContext<ColorContextProps>(
  {} as ColorContextProps
);

function stateReducer(state: ColorState, newState: Partial<ColorState>) {
  return { ...state, ...newState };
}

export const ColorContextProvider: FunctionComponent<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, setState] = useReducer(stateReducer, defaultColor);

  return (
    <ColorContext.Provider value={{ state, setState }}>
      {children}
    </ColorContext.Provider>
  );
};

const defaultColor: ColorState = {
  color: [
    { name: "Black", value: "hsl(0, 100%, 0%)" },
    { name: "Red", value: "hsl(0, 100%, 50%)" },
    { name: "Green", value: "hsl(90, 100%, 50%)" },
    { name: "Blue", value: "hsl(230, 100%, 50%)" },
    { name: "Yellow", value: "hsl(50, 100%, 50%)" },
    { name: "Purple", value: "hsl(280, 100%, 50%)" },
    { name: "Brown", value: "hsl(30, 100%, 35%)" },
  ],
  activeColor: { name: "Outline", value: "hsl(0, 100%, 0%)" },
};

export const useActiveColor = (): Color => {
  const context = useContext(ColorContext);

  if (!context) {
    throw new Error("Missing ColorContextProvider in tree");
  }

  return context.state.activeColor;
};

export const useAvailableColors = (): Color[] => {
  const context = useContext(ColorContext);

  if (!context) {
    throw new Error("Missing ColorContextProvider in tree");
  }

  return context.state.color;
};

export const useColor = (): [
  state: ColorContextProps["state"],
  setState: ColorContextProps["setState"]
] => {
  const context = useContext(ColorContext);

  if (!context) {
    throw new Error("Missing ColorContextProvider in tree");
  }

  return [context.state, context.setState];
};
