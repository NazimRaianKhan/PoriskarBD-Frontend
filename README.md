# PoriskarBD – A Smart Waste Management System (Frontend)

🔗 **Live Demo:** https://your-vercel-app.vercel.app

A modern, responsive frontend for a Smart Waste Management System that allows citizens to report waste issues, collectors to manage operations, and admins to monitor the entire system efficiently.

---

##  Features

###  Citizen
- Register & Login
- Report waste using **interactive map selection**
- Auto-fetch address from map (reverse geocoding)
- Track report status
- View collection schedules
- Update profile

###  Collector
- View assigned reports
- Mark reports as collected
- View **collection history**
- View waste locations on map

###  Admin
- Dashboard with real-time statistics
- Manage users (citizen, collector, admin)
- Assign & reassign collectors
- Manage zones
- Manage schedules
- Create staff accounts
- View reports with map locations

---

##  Map-Based Location System

This system uses map integration for accurate reporting:

- Click on map to select waste location
- Convert coordinates → human-readable address
- Store as:
Address || latitude,longitude
- Admin & collector can **view exact location on map**

---

##  Tech Stack

-  React (Vite)
-  Tailwind CSS
-  Leaflet (OpenStreetMap)
-  Axios
-  JWT Authentication
-  React Hot Toast

---

##  Project Structure

src/  
│  
├── components/  
│   ├── common/  
│   ├── dashboard/  
│   ├── forms/  
│   └── maps/  
│  
├── pages/  
│   ├── admin/  
│   ├── collector/  
│   └── citizen/  
│  
├── services/  
├── utils/  
├── context/  
├── App.jsx  
└── main.jsx  

---

##  Local Setup

### 1. Clone the repository

git clone https://github.com/NazimRaianKhan/poriskar-frontend.git  
cd poriskar-frontend

### 2. Install dependencies

npm install

### 3. Install map dependencies

npm install leaflet react-leaflet@4.2.1

### 4. Run development server

npm run dev

App runs at:
http://localhost:5173

---

## 🔗 Backend Connection

For local development:

VITE_API_BASE_URL=https://localhost:7012/api

For production:

VITE_API_BASE_URL=https://your-backend-domain.com/api

Update this in:
src/services/api.js

---

## ▲ Deployment (Vercel)

This project is deployed on Vercel.

🔗 **Live URL:** https://your-vercel-app.vercel.app



---


##  Authentication

- JWT-based authentication
- Token stored in localStorage
- Role-based access:
  - Admin
  - Collector
  - Citizen

---


## 📸 Screenshots (Add Later)

/screenshots/home.png
/screenshots/dashboard.png
/screenshots/map.png

![Dashboard](./screenshots/dashboard.png)

---

## 🚧 Future Improvements

- Store latitude & longitude separately in backend
- Google Maps integration
- Real-time tracking
- Push notifications
- Mobile app version

---

## 👨‍💻 Author

Your Name

- GitHub: https://github.com/NazimRaianKhan
- Email: nazimraiank@gmail.com

---

## 📄 License

This project is developed for academic purposes.
