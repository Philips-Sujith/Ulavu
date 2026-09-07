# ULAVU
> **Direct Farmer–Retailer Produce Connection Platform**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-2d6a4f?style=for-the-badge)](https://philips-sujith.github.io/Ulavu/)
[![React](https://img.shields.io/badge/React-19-1b4332?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-d97706?style=for-the-badge&logo=vite)](https://vite.dev/)

---

## 🌾 Overview

**ULAVU** is an accessible agricultural technology platform designed to connect farmers who have produce available with commercial retailers looking to procure it.

Instead of forcing farmers to navigate complicated enterprise marketplaces, ULAVU focuses on one essential workflow:
$$\text{Farmer lists produce} \longrightarrow \text{Retailer discovers produce} \longrightarrow \text{Retailer contacts farmer directly}$$

---

## 🚀 Live Demo

- **Production Deployment**: [https://philips-sujith.github.io/Ulavu/](https://philips-sujith.github.io/Ulavu/)
- **Documentation**: [ULAVU_PROJECT_DOCUMENTATION.md](./ULAVU_PROJECT_DOCUMENTATION.md)
- **Printable Documentation (HTML)**: [ULAVU_PROJECT_DOCUMENTATION.html](./ULAVU_PROJECT_DOCUMENTATION.html)

---

## ✨ Key Features

- **Minimalist Farmer Onboarding**: Only requests **Name**, **Mobile Number**, and **Location**.
- **Streamlined Produce Posting**: Prompts strictly for the **Vegetable/Fruit name**, **Quantity**, **Unit** (strictly `kg` or `bag`), and **Location**.
- **Real-Time Retailer Discovery**: Displays all active farm batches across regional districts in a searchable, filterable live feed.
- **Direct Phone Contact**: One-click **Call Farmer** (`tel:`) action connecting buyers directly to growers for natural verbal price negotiation.
- **Responsive Agricultural Design System**: Built with modern Vanilla CSS, clean typography (Outfit & Plus Jakarta Sans), and an organic palette (deep forest green, leaf green, harvest amber, and warm cream).
- **Persistent Local State**: Data is preserved across sessions using the browser's Web Storage API.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 (`19.2.8`)
- **Build Tool & Bundler**: Vite 8 (`8.2.2`)
- **Styling**: Vanilla CSS (CSS3 custom properties, CSS Grid, Flexbox)
- **Iconography**: Lucide React (`^1.42.0`)
- **Telephony**: Native RFC 3966 `tel:` protocol
- **Data Persistence**: Web Storage API (`localStorage`)
- **Deployment**: GitHub Pages via GitHub Actions

---

## 💻 Local Development

### Prerequisites
- Node.js (v18+)
- npm (v9+)

### Installation & Run

```bash
# Clone repository
git clone https://github.com/Philips-Sujith/Ulavu.git
cd Ulavu

# Install dependencies
npm install

# Run local development server
npm run dev
```

The application will be available at `http://localhost:5173/`.

### Production Build

```bash
npm run build
```

The output bundle will be generated in the `dist/` directory.

---

## 👤 Developer Information

- **Developer**: Sujith B
- **Roll Number**: 2025503560
- **Department**: Computer Science and Engineering (CSE)
- **Institution**: Anna University - MIT Campus

---

## 📄 License

This project is developed for academic presentation and evaluation at Anna University - MIT Campus.
