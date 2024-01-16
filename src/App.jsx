import { Viewer } from "resium";
import EntityCreator from "./EntityCreator";



function App() {
  return (
    <Viewer full sceneModePicker={false} sceneMode={2}>
      <EntityCreator />
    </Viewer>
  );
}

export default App;