
<div align="center">

# 🏙️ Awareon  
### *Crowdsourced Civic Issue Reporting & Resolution System*  

📱 A **Web + Mobile platform** that empowers citizens to report civic issues with **photos, voice, or text**, while governments track, prioritize, and resolve them transparently.  
Gamified engagement + real-time dashboards → **Smarter, cleaner, greener cities**.  

<img width="300" height="300" alt="image" src="https://github.com/user-attachments/assets/51f4b7c6-dd7b-4aec-9138-c8394556c13f" />


</div>

---

## 📖 Overview  

**Awareon** is a **digital-first civic engagement system** that bridges citizens and municipalities.  
Citizens can easily **report potholes, garbage, traffic, or drainage issues** via mobile/web apps, while authorities access **interactive dashboards** with automated routing, geotagging, and verification.  

Key Highlights:  
- 🚨 **SOS Alerts** → Urgent issues sent directly to municipal departments  
- 🏅 **Gamification** → Points, badges, leaderboards for citizens  
- 🌍 **Community Engagement** → Open & tier-based civic communities  
- 📊 **Data Dashboard** → Progress trackers, analytics, & heatmaps  

---

## 🏗️ System Architecture  

```mermaid
graph TD
    A[👥 Users] --> B[💻 Web + Mobile App]
    J[🏛️ Government Bodies] --> B

    B --> C[📂 Categorical Problem Hotspots]
    B --> D[⬆️ Upload Civic Issue - Image/Text/Voice]

    D --> E[🔍 Verify Authenticity via Image Metadata]
    E --> F[🧠 Identify Problem in Image/Text/Voice]
    F --> G[(🗄️ Problem Repository)]

    G --> H[🚨 SOS to Concerned Dept in Real-Time]
    G --> I[👨‍💼 Govt Body Picks & Resolves]
    G --> J1[📋 Progress Reports & Actionable Insights]
    G --> J2[📍 Location View of Problem]

    B --> K[📊 Data Dashboard]
    K --> L[📈 Real-time Progress Tracker]
    K --> M[📑 Dept-wise Visualization]

    B --> N[🏅 Gamified Engagement Modules]
    N --> O[🤝 Community Engagement]

    G --> P[🔺 Upvote Existing Issues]

````

---

## ✨ Core Features  

- 📷 **Multi-format Reporting** – Upload images, videos, voice, or text  
- 🔐 **Verification** – Metadata & AI check for authenticity  
- 🔀 **Automated Routing** – Issues sent to correct municipal department  
- 📊 **Dashboards** – Real-time issue tracking & resolution progress  
- 🏅 **Gamification** – Leaderboards, badges, streaks for active citizens  
- 🗺️ **Hotspot Mapping** – Category-wise civic issue visualization  
- 🔔 **Live Notifications** – Track your issue: *reported → acknowledged → resolved*  
- 👥 **Community Engagement** – Citizens join local civic groups  

---

## ⚙️ Tech Stack  

- Frontend 🖥️
    - React, React Native (Expo), React Webcam
    - Cloudinary (media storage)

- Backend ⚡
    - Node.js + Express, FastAPI (ML serving)
    - MongoDB, PostgreSQL, Redis
    - Twilio (alerts), Stripe (CSR/payments)

- AI/ML 🤖
    - NumPy (image/video preprocessing)
    - CNN Ensemble (image/video classification)
    - Whisper (speech-to-text)
    - HuggingFace Transformers / BERT (text intent classification)

---

## 📊 Workflow  

1. Users & Government Bodies access the system via Web + Mobile App.
2. Citizens upload issues (Image / Text / Voice).
3. System performs authenticity verification (metadata checks).
4. AI/ML models identify the problem category (pothole, garbage, light, etc.).
5. Verified issues are stored in a central Problem Repository.
6. From the repository:
   - 🚨 SOS alerts → sent to relevant municipal departments
    - 👨‍💼 Govt. bodies → pick up & resolve issues
    - 📋 Reports → generated for insights & accountability
    - 📍 Location-based hotspot visualization
    - 🔺 Citizens can upvote existing issues
7. Meanwhile, a Data Dashboard provides:
   - 📈 Real-time progress tracker
    - 🗂 Dept-wise visualization
8. Gamified Engagement modules → reward citizens with points, badges, leaderboards
9. Community Engagement → citizens join local or tier-based groups

---

## 🎮 Gamification  

```mermaid
graph TD
    A[🧑 Citizen Reports Issue] --> B[➕ Earn Points]
    B --> C[🏅 Badges & Levels]
    B --> D[📊 Leaderboards]
    B --> E[🤝 Community Challenges]
    B --> F[🎁 Rewards & Recognition]

```

- 🏆 *First Responder* – First 5 reports  
- 🌍 *Neighborhood Guardian* – 20+ verified issues  
- 🚀 *Speedy Reporter* – Issue reported within 1 hour  
- 🎖 *Problem Solver* – Consistent streak of verified issues  

---

## 🌱 Feasibility & Viability  

- **Economic** → Low-cost, scalable, potential CSR & municipal contracts  
- **Operational** → Real-time reporting, mobile-first, gamification for adoption  
- **Technical** → AI classifiers, scalable cloud infra, multilingual interface  
- **Social** → Citizen empowerment, trust, transparency  

---

## 🌍 Impact & Benefits  

**Environmental**  
- Rapid reporting reduces delays in waste management, road repair  
- Heatmaps optimize resource allocation  

**Social**  
- Citizens influence change directly  
- Multi-language + voice for inclusivity  

**Institutional**  
- Automated routing reduces admin load  
- Analytics for policy & planning  
- Audit logs ensure accountability  

---

## 🚀 Roadmap  

- [x] Citizen Mobile/Web App  
- [x] Gamified Reporting System  
- [x] Municipal Dashboard with Heatmaps  
- [ ] AI-Powered Issue Prioritization (severity detection)  
- [ ] ERP & GIS Integration with municipal systems  
- [ ] Multi-language + offline-first support  
- [ ] SMS/WhatsApp citizen notifications  

---

## 📚 Research & References  

- [Civic Sense in India – Reflections](https://reflections.live/articles/5446/civic-sense-in-india-overview-and-challenges-article-by-muhammed-shibili-tp-23326-mcnma8e4.html)  
- [AI-Driven Digital Governance – IJSAT](https://www.ijsat.org/research-paper.php?id=2732)  
- [Data.gov.in – Population of Kolkata](https://www.data.gov.in/resource/final-population-totals-kolkata-district-west-bengal-2001)  
- [Data.gov.in – Traffic Congestion (Delhi)](https://www.data.gov.in/resource/details-areas-prone-congestiontraffic-jam-and-facing-encroachment-problems-delhi-answered)  
- [Kaggle – Civic Issue Severity Dataset](https://www.kaggle.com/datasets/sayan995/civic-issue-severity-1)  

---

## 👥 Team Awareon  

* 👨‍💻 [Tamojit Das](https://github.com/Tamoziit)
* 👨‍💻 [Atif Ali Sardar](https://github.com/atif0911)
* 👨‍💻 [Aranya Basu](https://github.com/Aranya5)
* 👨‍💻 [Tiasha Ganguly](https://github.com/Tiasha-code)
* 👨‍💻 [Aryan Ghosh](https://github.com/Aryan-Ghosh-Code)
* 👨‍💻 [Diya Gupta](https://github.com/diya019-git)

---

<div align="center">

⭐ If you believe in **cleaner, smarter cities**, support us with a **star** on GitHub!  

🏙️ Together, let’s make civic engagement **transparent, inclusive & gamified** 🚀  

**Awareon – Because every report matters.**  

</div>
