# CAD-MK8 Tactical Icon Studio

A professional-grade SVG icon design and customization web application with a military-inspired interface. Create, modify, and export tactical vector icons with precision controls and real-time preview.

## Features

### Core Capabilities

**Interactive Canvas Workspace**
- Real-time SVG rendering with live preview
- Interactive CAD node editing with drag-and-drop vertex manipulation
- Zoom and pan controls for detailed work
- Grid snapping system (1.0x, 0.5x, or free positioning)
- Live coordinate tracking with crosshair cursor
- Multiple canvas backgrounds (Metric grid, Blueprint, Crossdots, Monolith)

**Visual Customization**
- Icon size range: 24-140 pixels
- Stroke width control: 0.5-4.0 pixels
- Stroke styles: Round, Square, or Butt caps
- Line patterns: Solid, Dashed, or Dotted
- Fill modes: None, Solid, or Tint
- Six tactical color palettes
- Dual-color mode with accent colors
- Glow effects with adjustable intensity

**Transform Controls**
- 90-degree rotation increments
- Horizontal and vertical flip
- Animation modes: Pulse, Spin, Glitch
- Optics modes: Standard, Night Vision (NVG), Thermal (FLIR)

**AI-Powered Generation**
- Google Gemini AI integration for text-to-SVG generation
- Four-way style morph generator
- Image-to-SVG vectorization
- Quick prompt templates for common tactical icons

**Code Editor**
- Live SVG code editor with syntax validation
- Auto-repair feature for malformed code
- Eight preset tactical icons included
- Four snapshot vault slots for saving configurations

**Multi-Format Export**
- React JSX component with props
- React Native SVG format
- SVG sprite sheets
- TypeScript barrel file exports
- Figma-ready SVG
- CSS animated wrappers
- PNG export at 512px and 1024px

### Advanced Features

**History Management**
- 25-step undo/redo system
- Non-destructive editing workflow

**Testing Tools**
- Optical scale matrix (16px to 96px)
- Vector telemetry display
- Element composition breakdown
- Hardware deployment simulator

**User Experience**
- Dark and light theme toggle
- Tactical audio feedback system
- Haptic feedback for mobile devices
- Toast notification system
- Touch-optimized interface
- PWA-ready for installation

## Technology Stack

- React 18.3
- Vite 6.0
- Tailwind CSS 3.4
- Custom masculine-icons library
- Google Gemini AI API
- Web Audio API
- Canvas API

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd tactical-icon-studio
npm install
```

## Configuration

### AI Features Setup

To enable AI vector synthesis features, you need to configure your Google Gemini API key:

1. Obtain an API key from Google AI Studio
2. Open `src/App.jsx`
3. Locate the following functions and add your API key:
   - `handleGenerateIconWithAI` (around line 690)
   - `handleImageUpload` (around line 910)
   - `handleGenerate4Variations` (around line 1160)

Replace the empty string with your API key:
```javascript
const apiKey = "YOUR_GEMINI_API_KEY_HERE";
```

Note: Without an API key, all manual editing and export features will work normally, but AI generation features will be disabled.

## Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Build

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Usage Guide

### Getting Started

1. Launch the application and select the Canvas tab
2. Choose a preset icon from the Buffer tab or paste your own SVG code
3. Customize using the control panels:
   - Adjust aperture (size) and caliber (stroke width)
   - Select colors from the tactical palette
   - Apply transforms (rotation, flip)
   - Enable glow effects or animations

### Interactive Editing

1. Click the NODE button to enable CAD vertex editing
2. Drag red vertex points to modify the icon shape
3. Use SNAP button to enable grid snapping for precision
4. Zoom and pan controls are available in the bottom-right corner

### AI Generation

1. Click the AI SYNTH button in the header
2. Enter a description or select a quick prompt
3. Wait for the AI to generate your icon
4. Use the 4x MORPH feature to create style variations

### Exporting

Navigate to the Export tab to access:
- Direct SVG download
- PNG export at multiple resolutions
- Framework-specific code formats
- Sprite sheet generation

### Snapshot System

Save your work in progress:
1. Go to the Buffer tab
2. Click SAVE on any of the four vault slots
3. Click LOAD to restore a saved configuration

## Keyboard Shortcuts

- Ctrl+Z: Undo
- Ctrl+Y: Redo
- Ctrl+Shift+R: Hard refresh (clears cache)

## Browser Support

Modern browsers with ES6+ support:
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Known Limitations

- AI features require an active internet connection
- Some icons may require manual adjustment after AI generation
- Mobile browsers may have limited haptic feedback support

## Project Structure

```
tactical-icon-studio/
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Troubleshooting

### Icons not appearing
- Ensure the masculine-icons package is properly installed
- Clear the Vite cache: `npm run dev -- --force`
- Delete `node_modules/.vite` directory

### AI features not working
- Verify your Gemini API key is correctly configured
- Check your internet connection
- Review browser console for error messages

### Build errors
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 16.0 or higher

## Contributing

Contributions are welcome. Please follow these guidelines:
- Follow the existing code style
- Test all changes thoroughly
- Update documentation as needed
- Submit pull requests with clear descriptions

## License

MIT License - See LICENSE file for details

## Credits

Built with React, Vite, and Tailwind CSS. Icons powered by the masculine-icons library. AI features powered by Google Gemini.

## Support

For issues, questions, or feature requests, please open an issue on the repository.
