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
      <CopilotKit runtimeUrl="http://localhost:4000/copilotkit">
        <Chat/>
        <div style={{width: "500px", float: "right",padding: "100px"}}>
          <CopilotChat />
        </div>
      </CopilotKit>
    </>
  );
}

export default App;
