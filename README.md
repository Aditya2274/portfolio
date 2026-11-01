# Modern React Portfolio

A sleek, modern portfolio website built with React, Three.js, and GSAP animations.

## Features

✨ **Modern Design**
- Cyber/neon aesthetic with cyan and purple accents
- Smooth animations using GSAP and Framer Motion
- Interactive particle effects background
- Custom cursor trail effects

🎨 **Interactive Components**
- Animated Hero section with gradient text
- Skills showcase with hover effects
- Projects gallery with detailed cards
- Timeline with education/experience
- Contact form with validation
- Responsive design for all devices

🚀 **Tech Stack**
- **React 18** - UI Framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **GSAP 3** - Advanced animations
- **Framer Motion** - Component animations
- **Three.js** - 3D graphics (extensible)

## Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation with scroll progress
│   ├── Hero.jsx             # Landing hero section
│   ├── About.jsx            # About me section
│   ├── Skills.jsx           # Skills showcase
│   ├── Projects.jsx         # Projects gallery
│   ├── Timeline.jsx         # Experience timeline
│   ├── Contact.jsx          # Contact form
│   ├── Footer.jsx           # Footer
│   ├── Background.jsx       # Animated background
│   └── CursorTrail.jsx      # Custom cursor
├── App.jsx                  # Main app component
├── main.jsx                 # React entry point
└── index.css                # Global styles
```

## Customization

### Colors
Edit the color scheme in `tailwind.config.js`:
```javascript
colors: {
  'cyber-dark': '#0a0a0f',
  'cyber-accent': '#00f5ff',  // Cyan
  'cyber-purple': '#7b2fff',  // Purple
}
```

### Content
Update personal information in:
- `Hero.jsx` - Main heading and description
- `About.jsx` - About section
- `Projects.jsx` - Your projects
- `Timeline.jsx` - Experience/education
- `Contact.jsx` - Contact information

### Adding Features
The portfolio is built with extensibility in mind:
- Add new sections as React components
- Use Framer Motion for animations
- Use GSAP for complex timeline animations
- Integrate Three.js for 3D elements

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Push to GitHub and connect to Vercel
```

### GitHub Pages
```bash
npm run build
# Deploy dist folder to GitHub Pages
```

## License

This project is open source and available under the MIT License.

## Support

If you have questions or suggestions, feel free to reach out!

---

**Built with ❤️ by [Your Name]**
