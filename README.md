<img src="https://socialify.git.ci/Ntombenhle2004/weather-and-news-dashbord/image?language=1&owner=1&name=1&stargazers=1&theme=Light" alt="weather-and-news-dashbord" width="640" height="320" />

# 🌦️ Weather and News Dashboard

This project is a **Node.js + TypeScript** application that combines real-time **weather updates** and **news headlines** into one dashboard.  
It demonstrates asynchronous programming concepts, including **callbacks**, **promises**, and **async/await**, depending on the version you run.

---

## 🚀 Overview

The **Weather and News Dashboard** fetches data from external APIs to display:
- Current weather information for a selected city  
- The latest top news headlines  
- Real-time updates through asynchronous functions  

It is a great example of learning and practicing asynchronous JavaScript concepts in TypeScript.

---

## 🧩 Tech Stack

- **Node.js** – JavaScript runtime environment  
- **TypeScript** – Adds strong typing and modern JS features  
- **Nodemon** – Automatically restarts the server on changes  
- **ts-node** – Runs TypeScript files without manual compilation  

---

## ⚙️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ntombenhle2004/weather-and-news-dashbord.git
   ```

2. Navigate to the project directory:
   ```bash
   cd weather-and-news-dashbord
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

---

## 🏃‍♀️ Running the Application

### Run in development mode:
```bash
npm run dev
```
This command compiles TypeScript in watch mode and runs the app using **Nodemon** for live reloading.

### Run directly with ts-node:
```bash
npm start
```
This executes the main file (`src/callbackVersion.ts`) directly using **ts-node**.

### Build the project:
```bash
npm run build
```
This compiles all TypeScript files into JavaScript in the **dist/** directory.

---

## 🧠 Core Functionality

The application includes logic for:

- **Fetching Weather Data**: Uses an API to retrieve temperature, humidity, and condition details for a given city.  
- **Fetching News Headlines**: Retrieves the latest trending or top headlines from a news API.  
- **Displaying Combined Data**: Presents both weather and news updates in one console-friendly interface.  
- **Asynchronous Execution**: Demonstrates callback-based async handling through the main file (`callbackVersion.ts`).  

---

## 📁 Project Structure

```
weather-and-news-dashbord/
├── src/
│   ├── callbackVersion.ts     # Main entry demonstrating callbacks
│   ├── promiseVersion.ts      # (Optional) Demonstrates Promises
│   ├── asyncAwaitVersion.ts   # (Optional) Demonstrates async/await
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📜 License

This project is licensed under the **ISC License**.

---

