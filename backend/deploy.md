# Deployment Instructions

## Quick Start (Local Testing)

1. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

2. Run the server:
```bash
python main.py
```

3. Test locally by updating script.js to use `http://localhost:8000`

## Free Deployment Options

### Option 1: Render.com (Recommended)
1. Create account at https://render.com
2. Connect GitHub repository
3. Create new Web Service
4. Set build command: `pip install -r requirements.txt`
5. Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Deploy and get your URL

### Option 2: Railway.app
1. Create account at https://railway.app
2. Deploy from GitHub
3. Set start command in railway.json:
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT"
  }
}
```

### Option 3: Replit
1. Create new Python repl at https://replit.com
2. Upload backend files
3. Run the repl
4. Use the provided URL

### Option 4: Google Cloud Run (Free tier)
1. Install gcloud CLI
2. Create Dockerfile:
```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8080"]
```
3. Deploy:
```bash
gcloud run deploy image-gen-backend --source .
```

## Update Frontend

After deployment, update the BACKEND_URL in script.js:
```javascript
const BACKEND_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:8000'
    : 'https://your-deployed-backend-url.com';
```