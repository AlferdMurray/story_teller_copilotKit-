import logo from './logo.svg';
import './App.css';
// import {Cop} from "copilotkit"
// import {Copilot} from "copilotkit"
import { CopilotKit } from "@copilotkit/react-core";
import { CopilotChat, CopilotSidebar } from '@copilotkit/react-ui';
import "@copilotkit/react-ui/styles.css";
import { Chat } from './Components/Chat';

function App() {
  return (
    <>
      <CopilotKit showDevConsole runtimeUrl="http://localhost:4000/copilotkit">
        <Chat/>
        {/* <CopilotChat /> */}
        
      </CopilotKit>
    </>
  );
}

export default App;
