from fastapi import FastAPI
from pydantic import BaseModel
from copilotkit import CopilotKitRemoteEndpoint, LangGraphAgent
from copilotkit.integrations.fastapi import add_fastapi_endpoint
from langgraph.graph import MessagesState
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import AIMessage, ToolMessage, SystemMessage
from copilotkit.langgraph import copilotkit_emit_state, copilotkit_customize_config
from langchain_core.runnables import RunnableConfig
from typing import cast
from langgraph.graph import StateGraph, END
from langgraph.checkpoint.memory import MemorySaver
from fastapi.middleware.cors import CORSMiddleware
from langchain_openai import ChatOpenAI

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins (unsafe for production)
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Allows all headers
)

class AgentState(MessagesState):
    model : str
    story_query: str 
    story : str
    story_title : str

async def story_teller(state : AgentState, config : RunnableConfig):

    model = ChatOpenAI(
        temperature=0,
        model="gpt-4o-mini",
        api_key="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"
    )
    print(model,"MOdel logged")
    response = await model.ainvoke([
        SystemMessage(
            content="You are an AI assitant who is going to generate stories based on the user's query"
        )
    ])
    await copilotkit_emit_state(config, state)
    ai_message_response = cast(AIMessage, response)
    state["story"] = ai_message_response
    print(state)
    return state["story"]

workflow = StateGraph(AgentState)
workflow.add_node("story_teller", story_teller)

memory = MemorySaver()
workflow.set_entry_point("story_teller")
workflow.add_edge("story_teller",END)
graph = workflow.compile(checkpointer=memory)


class task(BaseModel):
    title: str
    isDone: bool = False


# from
# port = 8080
# host = "http://localhost:8080"
items = []

sdk = CopilotKitRemoteEndpoint(
    agents=[
        LangGraphAgent(
            name="story-teller_agent",
            description="Generate short stories with engaging content",
            graph=graph,
        )
    ]
)


add_fastapi_endpoint(app, sdk, '/copilotkit')


# @app.post("/copilotkit")
# async def fun(params):
#     print(params)
#     return ""

@app.get("/")
async def home():
    return {"message": "FastAPI is working!"}


@app.post("/add", response_model=list[task])
async def add_item(item: task):
    items.append(item)
    return items


@app.get("/items")
async def getItems():
    return items
