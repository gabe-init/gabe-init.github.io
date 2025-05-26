#!/bin/bash

echo "Setting up Image Generation Backend..."

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate || . venv/Scripts/activate

# Install dependencies
pip install -r requirements.txt

echo "Setup complete! To run the server:"
echo "1. Activate venv: source venv/bin/activate"
echo "2. Run server: python main.py"
echo ""
echo "The server will start at http://localhost:8000"