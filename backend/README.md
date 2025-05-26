# Image Generation Backend

This FastAPI backend handles image generation using FLUX models via Hugging Face Spaces.

## Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

The server will start on `http://localhost:8000`

## Deployment Options

### Option 1: Local Development
Run locally and use ngrok or similar to expose the endpoint.

### Option 2: Deploy to Render/Railway/Heroku
These platforms offer free tiers for Python apps.

### Option 3: Deploy to Replit
Create a new Python repl and upload the files.

## API Endpoints

- `GET /` - Health check
- `POST /generate` - Generate an image with the specified parameters