# Interactive CV - Simon Cottier

A modern, interactive CV built with React, featuring animations, dark mode, and a beautiful UI.

## Features

- 🌙 Dark/Light mode toggle
- 📊 Interactive skills radar chart
- 🔍 Search functionality for experiences
- 📱 Responsive design
- ✨ Smooth animations with Framer Motion
- 🎨 Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your system. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended)

## Technologies Used

- React 18
- Framer Motion (animations)
- Recharts (data visualization)
- Lucide React (icons)
- Tailwind CSS (styling)

## Project Structure

```
src/
├── components/
│   └── InteractiveCV.jsx    # Main CV component
├── App.js                   # App wrapper
├── index.js                 # Entry point
└── index.css               # Global styles
```

## Customization

You can easily customize the CV by editing the data in `src/components/InteractiveCV.jsx`:

- `skills` array - Update your skills and proficiency levels
- `experiences` array - Modify your work experience
- `projects` array - Add or update your projects

## Deployment

To deploy to GitHub Pages or any other hosting service:

1. Build the project:
```bash
npm run build
```

2. Deploy the contents of the `build` folder to your hosting service.

## License

This project is open source and available under the [MIT License](LICENSE).

