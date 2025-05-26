from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gradio_client import Client
import requests
import base64
import re
import os
from typing import Optional

app = FastAPI()

# Enable CORS for GitHub Pages
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with your GitHub Pages URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    prompt: str
    model: str = "flux-dev"  # flux-dev or flux-schnell
    seed: int = 0
    randomize_seed: bool = True
    width: int = 1024
    height: int = 1024
    guidance_scale: Optional[float] = 3.5
    num_inference_steps: int = 28

@app.get("/")
def read_root():
    return {"status": "Image Generation API is running"}

@app.post("/generate")
async def generate_image(request: GenerateRequest):
    try:
        # Select the appropriate Hugging Face Space
        if request.model == "flux-schnell":
            client = Client("black-forest-labs/FLUX.1-schnell")
            # Schnell doesn't use guidance_scale
            result = client.predict(
                prompt=request.prompt,
                seed=request.seed,
                randomize_seed=request.randomize_seed,
                width=request.width,
                height=request.height,
                num_inference_steps=request.num_inference_steps,
                api_name="/infer"
            )
        else:  # flux-dev
            client = Client("black-forest-labs/FLUX.1-dev")
            result = client.predict(
                prompt=request.prompt,
                seed=request.seed,
                randomize_seed=request.randomize_seed,
                width=request.width,
                height=request.height,
                guidance_scale=request.guidance_scale,
                num_inference_steps=request.num_inference_steps,
                api_name="/infer"
            )
        
        img_data, returned_seed = result
        
        # Handle possible return types
        img_url = None
        
        if isinstance(img_data, str):
            img_url = img_data
        elif isinstance(img_data, dict):
            img_url = img_data.get("url") or img_data.get("path")
        else:
            raise ValueError("Unexpected image data format")
        
        # Process the image data
        if img_url.startswith("data:image/"):
            # Already base64-encoded
            return {
                "success": True,
                "image": img_url,
                "seed": returned_seed,
                "model": request.model
            }
        elif img_url.startswith("http://") or img_url.startswith("https://"):
            # Download and convert to base64
            resp = requests.get(img_url)
            resp.raise_for_status()
            img_base64 = base64.b64encode(resp.content).decode('utf-8')
            return {
                "success": True,
                "image": f"data:image/png;base64,{img_base64}",
                "seed": returned_seed,
                "model": request.model
            }
        elif os.path.exists(img_url):
            # Local file path
            with open(img_url, "rb") as f:
                img_base64 = base64.b64encode(f.read()).decode('utf-8')
            return {
                "success": True,
                "image": f"data:image/png;base64,{img_base64}",
                "seed": returned_seed,
                "model": request.model
            }
        else:
            raise ValueError(f"Unsupported image reference: {img_url}")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)