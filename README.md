# 🧠 Arziki – AI-Powered Predictive Inventory Intelligence

Arziki is a web-based analytics platform that helps supermarkets and retail businesses make data-driven decisions using AI-powered demand forecasting, sales insights, and natural-language queries. Built for **GCP Community Hackathon 2025** under the theme:  
**AI-Driven Enterprise Operations: Enhancing Security, Accelerating DevOps, and Scaling Infrastructure Across Cloud and Hybrid Environments.**

---

## 🚀 Overview
Most small and mid-size retail stores in West Africa struggle with:  
- Overstocking or stockouts due to poor demand prediction  
- Limited visibility into sales performance  
- Manual, error-prone data reporting  

**Arziki** solves this by analyzing sales and inventory data, predicting when items will run out, suggesting restock quantities, and providing intelligent insights through a simple dashboard.

---

## 🧩 Core Features

- **📊 Data Upload** – Upload your supermarket’s CSV/Excel data directly from the dashboard.  
- **🧠 AI Analysis** – Runs predictive models using **Vertex AI**.  
- **💬 Natural Language Query** – Query your sales data in plain English using **BigQuery ML + Natural Language API**.  
- **📈 Visual Insights** – Auto-generated charts showing trends, best-selling items, and low-stock alerts.  
- **📥 PDF Reports** – Instantly download AI-generated insights as a PDF summary.

---

## 🏗️ Tech Stack

**Frontend**  
- React + TypeScript  
- TailwindCSS  
- React Hot Toast (for notifications)  
- Deployed via **Firebase Hosting / Render**  

**Backend**  
- Node.js (Express)  
- **Google Cloud Storage** for file storage  
- **Vertex AI** for predictions  
- **BigQuery ML + Natural Language API** for conversational insights  
- Deployed on **Render / Cloud Run**

---

## 🔌 API Integration

**Endpoint**  
https://arziki-gcp.onrender.com/docs

**Request Body** (`multipart/form-data`)

| Field       | Type   | Description                        |
|------------|--------|------------------------------------|
| file       | binary | Sales or inventory CSV file         |
| store_name | string | Name of the store/supermarket      |
| email      | string | User’s email address (for identification) |

**Response**  
A downloadable PDF report containing visual insights, recommendations, and forecasts.

---

## 🧾 Example Workflow

1. Fill in your store details (name, location, email).  
2. Upload your sales and inventory data files.  
3. Wait for processing (approx. 3–5 seconds).  
4. The system auto-downloads your AI-generated **report.pdf**.  

---

## 🧪 Local Development Setup

```bash
# Clone the repo
git clone https://github.com/dabirax/arziki.git
cd arziki

# Install dependencies
npm install

# Run frontend
npm run dev

🧠 Architecture (Simplified)
[User Upload] → [Frontend Dashboard] → [Render API /analyze] → [Google Cloud Storage]
         → [AI Analysis: Vertex AI] → [Generate Insights + PDF]
         → [Response: PDF Download]


🏅 Hackathon Impact

By giving supermarket managers real-time foresight, Arziki helps prevent losses, optimize inventory, and reduce waste — using the power of AI, without requiring any data-science background.

👥 Team

Project Arziki 
Built by a small team of engineers passionate about AI, retail, and scalable cloud solutions.
