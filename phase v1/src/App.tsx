import styled from "styled-components";
import LeftPanel from "./LeftPanel";
import Canvas from "./Canvas";
import RightPanel from "./RightPanel";

const AppWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 250px auto 220px;
  background: #232323;
  height: 100vh;
  color: white;
  overflow: hidden;
`;

const App = () => {
  return (
    <AppWrapper>
      <LeftPanel />
      <Canvas />
      <RightPanel />
    </AppWrapper>
  );
};

export default App;
