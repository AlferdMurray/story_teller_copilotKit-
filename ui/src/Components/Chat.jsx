import React, { useEffect } from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { CopilotChat } from "@copilotkit/react-ui";
import { useCoAgent, useCopilotContext } from "@copilotkit/react-core";
import { useChatContext } from "@copilotkit/react-ui";
import Dummy from "./Dummy";
import { useCopilotChat } from "@copilotkit/react-core";
export function Chat() {
    const { state, setState,start } = useCoAgent({
        name: "story-teller_agent",
        initialState: {
            story_query: "Tell me a story",
            story: "",
            story_title: ""
        }
    })
    const { visibleMessages } = useCopilotChat();
    useEffect(() => {
        const timer = setTimeout(()=>{
            console.log(visibleMessages)
        },[3000])

        return () => clearTimeout(timer)
    },[state])

    


    return (
        <>
            <Box display="flex" height="100vh">
                {/* Left: Canvas for Stories */}
                <Box
                    width="66.66%"
                    bgcolor="white"
                    p={4}
                    sx={{ overflowY: "auto" }}
                >
                    <Card elevation={3} sx={{ borderRadius: 4, mb: 2 }}>
                        <CardContent>
                            <Typography variant="h4" fontWeight="bold" gutterBottom>
                                {state.story_title || "Story Title comes Here"} 
                            </Typography>
                            <Typography variant="body1">
                                {state.story || "Story comes here"}
                            </Typography>
                        </CardContent>
                    </Card>
                </Box>
                <Box
                    width="33.33%"
                    display="flex"
                    flexDirection="column"
                    bgcolor="#f5f5f5"
                    p={2}
                >
                    <CopilotChat
                        // RenderActionExecutionMessage=}
                        // RenderTextMessage={(message)=>{
                        //     console.log(message,"message in chat");
                            
                        // }}

                        RenderAgentStateMessage={(message)=>{
                            console.log("state in chat",message);
                            return(
                                <p>{state.story}</p>
                            )
                            
                        }}
                        instructions={"You are assisting the user as best as you can. Answer in the best way possible given the data you have."}
                        labels={{
                            title: "My Assistant",
                            initial: "Hi! 👋 How can I assist you today?",
                        }}
                        
                        onInProgress={(state) => {
                            console.log(state, "in progress:");
                        }}
                        onSubmitMessage={(message) => {
                            setState({...state, story_query: message})
                        }}
                    />

                </Box>
            </Box>
        </>
    )
}