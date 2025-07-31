# Installation Instructions

## Option 1: Simple HTML Version (No Dependencies Required)

If you don't have Node.js installed, you can use the simple HTML version that's already in your project:

1. **Open the HTML version directly:**
   - Navigate to your project folder
   - Double-click on `index.html` to open it in your browser
   - Or right-click and select "Open with" → Choose your preferred browser

2. **Or serve it with Python (if you have Python installed):**
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your browser

## Option 2: React Version (Requires Node.js)

### Prerequisites
1. **Install Node.js:**
   - Go to [https://nodejs.org/](https://nodejs.org/)
   - Download and install the LTS version (18.x or higher)
   - Verify installation by running: `node --version` and `npm --version`

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Option 3: Using Yarn (Alternative to npm)

If you prefer Yarn:

1. **Install Yarn:**
   ```bash
   npm install -g yarn
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   yarn dev
   ```

## Troubleshooting

### Node.js not found
- Download and install Node.js from [https://nodejs.org/](https://nodejs.org/)
- Restart your terminal/command prompt after installation

### Port already in use
- Try a different port: `npm run dev -- -p 3001`
- Or kill the process using the port

### Permission errors
- On Windows: Run Command Prompt as Administrator
- On Mac/Linux: Use `sudo` if necessary

## File Structure

Your project contains both versions:

```
funnel/
├── index.html              # Simple HTML version (ready to use)
├── styles.css              # CSS for HTML version
├── script.js               # JavaScript for HTML version
├── app/                    # React version (Next.js)
├── components/             # React components
├── data/                   # Quiz data
├── types/                  # TypeScript types
├── package.json            # React dependencies
├── tailwind.config.js      # Tailwind configuration
├── next.config.js          # Next.js configuration
├── README.md               # Main documentation
└── INSTALLATION.md         # This file
```

## Quick Start

**For immediate use (no setup required):**
1. Open `index.html` in your browser
2. Start using the quiz immediately

**For the full React experience:**
1. Install Node.js
2. Run `npm install`
3. Run `npm run dev`
4. Open `http://localhost:3000`

Both versions provide the same functionality - the React version offers better performance, animations, and maintainability, while the HTML version works immediately without any setup. 