from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.resume_router import resume_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],                    
    allow_headers=["*"],                      
)

@app.get("/")
def index():
    return {"message": "Welcome to Resume.AI"}

app.include_router(resume_router, prefix="/api")
