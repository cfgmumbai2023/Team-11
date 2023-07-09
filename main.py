from fastapi import FastAPI
from script import transcribeAudio

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello Team 11"}

@app.get("/video")
async def getTranscribe(link: str = ""):
    return transcribeAudio(link)
