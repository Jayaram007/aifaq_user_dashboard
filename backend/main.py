from fastapi import FastAPI, File, UploadFile, WebSocket, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from jwt import PyJWTError
from typing import List
import os
import asyncio
import subprocess
import yaml
from pathlib import Path
import logging

# Ensure the logs directory exists
log_dir = "logs"
os.makedirs(log_dir, exist_ok=True)

logging.basicConfig(
    filename=os.path.join(log_dir, 'backend.log'),  # Use a local logs directory
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI()
security = HTTPBearer()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        jwks_url = f"https://{os.getenv('AUTH0_DOMAIN')}/.well-known/jwks.json"
        payload = jwt.decode(
            token,
            jwks_url,
            algorithms=["RS256"],
            audience=os.getenv('AUTH0_AUDIENCE'),
            issuer=f"https://{os.getenv('AUTH0_DOMAIN')}/"
        )
        return payload
    except PyJWTError as e:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...), token: dict = Depends(verify_token)):
    upload_dir = Path("uploaded_files")
    upload_dir.mkdir(exist_ok=True)
    
    for file in files:
        if not file.filename.lower().endswith((".pdf", ".txt")):
            raise HTTPException(status_code=400, detail=f"Invalid file type: {file.filename}")
        
        file_path = upload_dir / file.filename
        content = await file.read()
        file_path.write_bytes(content)
    
    return {"message": "Files uploaded successfully"}

@app.post("/knowledge-base/build")
async def build_knowledge_base(token: dict = Depends(verify_token)):
    try:
        process = await asyncio.create_subprocess_exec(
            "python", "ingest.py",
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
        stdout, stderr = await process.communicate()
        
        if process.returncode != 0:
            logger.error(f"Error building knowledge base: {stderr.decode()}")
            raise HTTPException(status_code=500, detail="Failed to build knowledge base")
        
        return {"message": "Knowledge base built successfully"}
    except Exception as e:
        logger.error(f"Error building knowledge base: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.websocket("/ws/logs")
async def websocket_logs(websocket: WebSocket):
    await websocket.accept()
    
    try:
        log_file = Path(os.path.join(log_dir, 'backend.log'))
        with log_file.open() as f:
            f.seek(0, 2)  # Seek to end
            while True:
                line = f.readline()
                if line:
                    await websocket.send_text(line)
                await asyncio.sleep(0.1)
    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
    finally:
        await websocket.close()

@app.post("/settings")
async def update_settings(settings: dict, token: dict = Depends(verify_token)):
    try:
        with open("config.yaml", "w") as f:
            yaml.dump(settings, f)
        return {"message": "Settings updated successfully"}
    except Exception as e:
        logger.error(f"Error updating settings: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))
