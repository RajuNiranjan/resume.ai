from fastapi import APIRouter, UploadFile, File, Form
from app.contorllers.resume_controller import resume_precess

resume_router=APIRouter(
    prefix='/resume',
    tags=["RESUME"]
)

@resume_router.post('/analyze')
async def analyze_resume(
    resume: UploadFile=File(...),
    jd: str=Form(...)
):
    return await resume_precess(resume, jd)
