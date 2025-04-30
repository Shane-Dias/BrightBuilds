# 💡 BrightBuilds – Empowering Creative Coders for a Sustainable Future

**BrightBuilds** is an innovative full-stack web platform designed to showcase student-led creative coding projects. These projects — including animations, games, websites, digital art, and documentaries — are all mapped to relevant **United Nations Sustainable Development Goals (SDGs)**.

The platform is built to engage students, faculty, employers, and the public with an interactive, collaborative environment that promotes mentorship, sustainability, and skill-based visibility.

---

## 📑 Table of Contents

- [💡 BrightBuilds – Empowering Creative Coders for a Sustainable Future](#-brightbuilds--empowering-creative-coders-for-a-sustainable-future)
- 🔗[Live Website](#-live-website)
- 🎯[Objective](#-objective)
- 🛠️[Tech Stack](#️-tech-stack)
- 👥[User Roles and Their Dashboards](#-user-roles-and-their-dashboards)
- 📸[Detailed Page Descriptions](#-detailed-page-descriptions)
- 🎥[Demo & Screenshots](#-demo--screenshots)
- 🛂[Project Setup Guide](#-project-setup-guide)
  - 🔧[Prerequisites](#-prerequisites)
  - 🚀[Getting Started](#-getting-started)
- 📢[Contribution Guidelines](#-contribution-guidelines)
- 🙏[Acknowledgements](#-acknowledgements)

## 🔗 Live Website

👉 **[BrightBuilds](https://bright-builds.vercel.app/)** (Only frontend is live for now. Full deployment coming soon.)

---

## 🎯 Objective

The primary goal of BrightBuilds is to:

- Provide a centralized platform to **upload**, **showcase**, and **evaluate** student projects.
- Highlight student contributions toward global goals using **SDG mapping**.
- Foster **peer learning**, **mentorship**, and **public engagement**.
- Empower students with a **digital portfolio** they can proudly share.

---

## 🛠️ Tech Stack

**Frontend:**

- [React.js](https://reactjs.org/)
- [React Router Dom](https://reactrouter.com/home)
- [Axios](https://axios-http.com/docs/intro)
- [React Toastify](https://www.npmjs.com/package/react-toastify)
- [Chart.js](https://www.chartjs.org/)
- [Vite](https://vite.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

**Backend:**

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [JWT Webtokens](https://jwt.io/libraries)
- [Multer](https://www.npmjs.com/package/multer)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
  

**Hosting:**

- Vercel – Frontend hosting
- MongoDB Atlas – Cloud MongoDB database service
- Git & GitHub – Version control and collaboration
- Postman – API testing during backend development

---

## 👥 User Roles and Their Dashboards

### 1. 🔍 Viewers (Public, Employers, Experts)

- Explore projects by category or SDG.
- Read detailed descriptions and view videos/media.
- Rate and comment on projects.
- Contact student teams for internships or collaboration.
- Access a leaderboard for top projects.

### 2. 🧑‍💻 Student Teams

- Upload project info, media, GitHub links.
- Map projects to relevant SDGs with justification.
- View ratings, comments, and performance stats.
- Request mentorship and track progress.
- Showcase their portfolio to public and recruiters.

### 3. 👨‍🏫 Faculty Coordinators

- Monitor student project submissions.
- Verify SDG alignment and offer suggestions.
- Provide structured feedback and technical mentorship.
- Track engagement metrics and team activity.

### 4. 🛡️ Admins

- Manage user roles and permissions.
- Approve or reject submitted projects.
- Organize content and ensure platform quality.
- Send platform-wide notifications.
- Generate analytics and SDG impact reports.

---

## 🧩 Core Functionalities

| Feature                         | Description                                                     |
| ------------------------------- | --------------------------------------------------------------- |
| 📁 Project Upload & SDG Mapping | Students upload detailed project info and choose relevant SDGs. |
| 🔍 Search & Filter              | Projects can be filtered by category, SDG, or rating.           |
| ⭐ Ratings & Feedback           | Users and faculty can rate and comment on projects.             |
| 🏆 Leaderboard                  | Projects are ranked based on popularity, ratings, and views.    |
| 🔔 Real-Time Notifications      | Alerts for new ratings, comments, feedback, and announcements.  |
| 🔐 Role-Based Access            | Secured access control for each user type.                      |

---

## 📸 Detailed Page Descriptions

### 🔷 Home Page

- Serves as the landing page for the website.
- Explains the objective of the platform.

### 🗃️ Project Gallery (Public View)

- Displays all student projects in a grid layout.
- Users can filter by:
  - 📂 Project Type: Animation, Game, Website, etc.
  - 🎯 SDGs: Climate Action, Quality Education, etc.
  - ⭐ Rating or Popularity
- Includes:
  - Thumbnail preview
  - Project title
  - Team name
  - Quick rating preview

### 📘 Project Details Page

- Detailed description of the selected project.
- Includes:
  - Project objective and working
  - Screenshots and/or video demo
  - SDGs supported with explanation
  - GitHub repo link
  - Uploaded media and assets
- Users can:
  - Rate the project
  - Leave comments or suggestions
  - Contact the team

### 🧑‍🎓 Student Dashboard

- Login-protected dashboard for student teams.
- Sections:
  - ➕ Add New Project: Upload project media, description, SDG mapping.
  - 🗂️ Manage Projects: Edit/delete/view all submissions.
  - 📬 Feedback Center: View all feedback and ratings.
  - 🏅 Leaderboard Tab: View performance among other teams.
  - 🔗 Link GitHub, YouTube, or external resources.

### 👩‍🏫 Faculty Dashboard

- Allows faculty to:
  - 📋 View all submitted projects
  - ✔️ Approve or suggest edits for SDG mappings
  - 🧠 Provide technical feedback and rate submissions
  - 📊 Monitor team progress and engagement levels
  - 📨 Message student teams for mentorship or reviews

### 🛠️ Admin Dashboard

- High-level control over the entire platform.
- Features include:
  - 👥 User Management: Add, remove, or update user roles
  - 📝 Project Moderation: Approve/reject submissions
  - 🧭 Organize by SDGs or project categories
  - 📢 Send global announcements or alerts
  - 📊 View analytics and platform reports
  - 🏆 Leaderboard and Badge Management

---

## 🎥 Demo & Screenshots

### [Click here to watch the full walkthrough demo](https://drive.google.com/file/d/147g674Ghl8Db4roQ2XncPpJjk9YWZMHm/view?usp=sharing)

| Title                 | Screenshot                                                      |
| --------------------- | --------------------------------------------------------------- |
| **Home Page**         | ![Home Page](/frontend/readmeimages/HomePage.png)               |
| **Student Dashboard** | ![Student](/frontend/readmeimages/StdDash.jpeg)                 |
| **Create Project**    | ![Create Project](/frontend/readmeimages/CreateProject.jpg)     |
| **View Details**      | ![View Details](/frontend/readmeimages/ViewDetails.jpg)         |
| **Explore Projects**  | ![Explore Projects](/frontend/readmeimages/ExploreProjects.jpg) |
| **Admin Panel 1**     | ![Admin Panel1](/frontend/readmeimages/AdminPanel.png)          |
| **Admin Panel 2**     | ![Admin Panel2](/frontend/readmeimages/AdminPanel2.jpg)         |
| **User Profile**      | ![User Profile](/frontend/readmeimages/UserProfile.png)         |

---

# Project Setup Guide

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download Node.js](https://nodejs.org/)
- **npm** or **yarn** (comes with Node.js)
- **MongoDB** (local installation or Atlas account) - [MongoDB Atlas](https://www.mongodb.com/atlas/database)
- **Git** - [Download Git](https://git-scm.com/)

---

## 🚀 Getting Started

### 1. Clone the Repository

Open your terminal and run the below snippet:

```bash
git clone https://github.com/Shane-Dias/BrightBuilds.git
cd BrightBuilds
```

### 2. Setup Frontend

```bash
  cd frontend
  npm install
  npm run dev
```

This runs your project on your local system at localhost:5173

### 3. Setup Backend

Now open another terminal in your main project directory and run:

```bash
  cd backend
  npm install
  node server.js
```

This starts your backend on localhost:5000

### 4. Configure Environment Variables

Create a .env file inside the backend folder with the following content:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Replace your_mongodb_connection_string with your actual MongoDB URI and your_jwt_secret_key with a strong secret string(32 characters long).

## 📢 Contribution Guidelines

We welcome contributions! Feel free to fork this repo and open pull requests for:

- UI improvements
- Bug fixes
- Feature suggestions

---

## 🙏 Acknowledgements

BrightBuilds is the result of dedicated teamwork, creative exploration, and countless hours of problem-solving by a team of three students: Shane Dias, Serene Dmello, and Jacell Jamble.

Built entirely through our own initiative, this platform reflects what’s possible when curiosity meets collaboration — without external mentorship or institutional guidance. We hope BrightBuilds stands as a testament to the spirit of self-driven learning and innovation.

Special thanks to everyone who inspires students to build boldly and think independently.
