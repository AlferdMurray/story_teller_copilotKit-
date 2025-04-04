import { useChatContext } from "@copilotkit/react-ui";


export default function Dummy() {
    const {messages} = useChatContext();
    console.log(messages,"messages in dummy component");
    
    return (
        <div style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "8px" }}>
            <h2 style={{ color: "#333" }}>Dummy Component</h2>
            <p style={{ color: "#555" }}>
                This is a dummy component to demonstrate styling and structure.
            </p>
        </div>
    );
}