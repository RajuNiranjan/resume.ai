from fastapi import FastAPI
from app.api.v1.resume_router import resume_router

app=FastAPI()

@app.get('/')
def index():
    return {"message":"Welcome to Resume.AI"}


app.include_router(resume_router, prefix='/api')