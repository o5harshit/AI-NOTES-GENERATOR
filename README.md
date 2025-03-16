AI Notes Generator

AI Notes Generator is a web application that allows users to generate AI-powered notes based on their input prompts. 
It uses the Gemini 2.0 API for AI-based text generation, Supabase for authentication and database management, 
and Tailwind CSS for modern and responsive UI styling.

Features

✅ AI-Powered Note Generation - Generate notes instantly using the Gemini 2.0 API.
✅ User Authentication - Secure authentication using Supabase Auth.
✅ Responsive UI - Styled with Tailwind CSS for a modern, mobile-friendly experience

* Tech Stack

1) Frontend: React.js, Tailwind CSS

2) Backend: Supabase (Auth + Database)

3) AI Model: Gemini 2.0 API

4) Hosting: Render

* Installation

Prerequisites

Make sure you have the following installed:

1) Node.js (v16+ recommended)

2) npm 

3) Supabase Account

4) Gemini 2.0 API Key

1) Clone the repository:
git clone https://github.com/o5harshit/AI-NOTES-GENERATOR.git

2) Install dependencies:
   npm install
   
4) Create a .env file :
   
1) VITE_SUPABASE_URL=your_supabase_url
2) VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
3) VITE_GEMINI_API_KEY=your_gemini_api_key

6) Run Server :
   npm run dev
