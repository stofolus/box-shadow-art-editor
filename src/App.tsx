import { ColorContextProvider } from "./contexts/ColorContext";
import { PixelContextProvider } from "./contexts/PixelContext";
import { Creator } from "./pages/creator/Creator";

function App() {
  return (
    <ColorContextProvider>
      <PixelContextProvider>
        <Creator />
      </PixelContextProvider>
    </ColorContextProvider>
  );
}

export default App;
