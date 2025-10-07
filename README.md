🧠 Arziki – AI-Powered Predictive Inventory Intelligence

Arziki is a web-based analytics platform that helps supermarkets and retail businesses make data-driven decisions using AI-powered demand forecasting, sales insights, and natural-language queries. Built for AWS Community Day West Africa 2025 Hackathon under the theme
AI-Driven Enterprise Operations: Enhancing Security, Accelerating DevOps, and Scaling Infrastructure Across Cloud and Hybrid Environments.

🚀 Overview
Most small and mid-size retail stores in West Africa struggle with:
Overstocking or stockouts due to poor demand prediction
Limited visibility into sales performance
Manual, error-prone data reporting
Arziki solves this by analyzing sales and inventory data, predicting when items will run out, suggesting restock quantities, and providing intelligent insights through a simple dashboard.

🧩 Core Features

📊 Data Upload – Upload your supermarket’s CSV/Excel data directly from the dashboard.
🧠 AI Analysis – Runs predictive models using AWS Forecast and Bedrock.
💬 Natural Language Query – Query your sales data in plain English using Amazon Q.
📈 Visual Insights – Auto-generated charts showing trends, best-selling items, and low-stock alerts.
📥 PDF Reports – Instantly download AI-generated insights as a PDF summary.

🏗️ Tech Stack
Frontend
React + TypeScript
TailwindCSS
React Hot Toast (for notifications)
Deployed via AWS Amplify / Render

Backend
Node.js (Express)
AWS S3 for file storage
AWS Forecast / Bedrock for predictions
Amazon Q for conversational insights
Deployed on Render

🔌 API Integration
Endpoint
POST https://arziki.onrender.com/analyze

Request Body

multipart/form-data

Field	Type	Description
file	binary	Sales or inventory CSV file
store_name	string	Name of the store/supermarket
email	string	User’s email address (for identification)
Response

A downloadable PDF report containing visual insights, recommendations, and forecasts.

🧾 Example Workflow

Fill in your store details (name, location, email).

Upload your sales and inventory data files.

Wait for processing (approx. 3–5 seconds).

The system auto-downloads your AI-generated report.pdf.

🧪 Local Development Setup
# Clone the repo
git clone https://github.com/dabirax/arziki.git
cd arziki

# Install dependencies
npm install

# Run frontend
npm run dev


Ensure your backend (/analyze endpoint) is running and accessible.

🧠 Architecture (Simplified)
[User Upload] → [Frontend Dashboard] → [Render API /analyze] → [AWS S3 Storage]
         → [AI Analysis: Forecast + Bedrock] → [Generate Insights + PDF]
         → [Response: PDF Download]

🏅 Hackathon Impact

By giving supermarket managers real-time foresight, Arziki helps prevent losses, optimize inventory, and reduce waste — using the power of AI, without requiring any data-science background.

👥 Team

Project Arziki – AWS Community Day West Africa 2025
Built by a small team of engineers passionate about AI, retail, and scalable cloud solutions.
