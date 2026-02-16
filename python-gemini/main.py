from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import routes.chat



app = FastAPI()
app.include_router(router=routes.chat.router)
app.add_middleware(
    CORSMiddleware,
)
origins = [
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
)


@app.get("/")
def read_root():
    return {"msg": "Server is Up and Running"}
