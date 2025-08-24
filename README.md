# Inspiria Email Signature Generator

A professional email signature generator for Inspiria employees, supporting both Hebrew and English signatures with company branding.

## Features

- **Bilingual Support**: Hebrew and English interface and signature generation
- **Professional Design**: Clean, modern interface with Inspiria branding
- **Mobile-First**: Fully responsive design optimized for mobile devices
- **Dark/Light Themes**: System-aware theming with manual override options
- **Auto-Save**: All form data automatically saves to localStorage
- **Export/Import**: Save and load signature settings as JSON files
- **vCard Download**: Generate contact cards for your phone
- **Sharable Links**: Generate shareable URLs with your settings
- **Keyboard Shortcuts**: 
  - `Ctrl+Enter` = Copy signature
  - `Ctrl+S` = Export settings
- **Smart Notifications**: Beautiful success messages
- **URL Presets**: Load settings from URL parameters

## Technical Features

- **React.js**: Modern functional components with hooks
- **CSS Variables**: Theme system with CSS custom properties
- **Mobile-First**: Responsive design with touch-optimized controls
- **Accessibility**: WCAG AA compliant with proper focus states
- **Performance**: Debounced preview rendering and memoized components
- **Cross-Browser**: Works on all modern browsers and email clients

## How Theming Works

The application uses a CSS variable-based theming system:

### Theme Classes
- **Light Theme**: Applied via `document.documentElement.classList.add('light')`
- **Dark Theme**: Applied via `document.documentElement.classList.add('dark')`
- **System Theme**: No class applied, follows `prefers-color-scheme` media query

### CSS Variables
The theme system uses CSS custom properties defined in `src/styles/theme.css`:

```css
:root {
  --bg: #f7f9fc;           /* Background color */
  --fg: #111827;           /* Foreground/text color */
  --muted: #6b7280;        /* Muted text color */
  --panel: #ffffff;        /* Panel background */
  --border: #e5e7eb;       /* Border color */
  --primary: #2563eb;      /* Primary brand color */
  --primary-contrast: #ffffff; /* Primary text color */
  --shadow: 0 4px 12px rgba(0,0,0,.06); /* Shadow */
}
```

### Theme Persistence
- Theme preference is stored in `localStorage` as `'color-mode'`
- System theme is detected via `window.matchMedia('(prefers-color-scheme: dark)')`
- Theme changes are applied immediately to `document.documentElement`

## How to Add a New Field

To add a new field to the signature generator:

### 1. Add State Management
In `src/components/SignatureGenerator/SignatureGenerator.jsx`:

```javascript
const [newField, setNewField] = useLocalStorage("signature-newField", "");
```

### 2. Add to Form Data
Update the `formData` object:

```javascript
const formData = useMemo(() => ({
  // ... existing fields
  newField,
  // ... rest of fields
}), [/* ... existing dependencies */, newField]);
```

### 3. Add Form Input
Add the input field to the JSX:

```javascript
<div className="form-row cols-2">
  <div>
    <TextField
      id="newField"
      label="New Field Label"
      value={newField}
      onChange={e => setNewField(e.target.value)}
      error={errors.newField}
    />
  </div>
  {/* ... other fields */}
</div>
```

### 4. Update Signature HTML
In `src/utils/buildSignatureHtml.js`, add the field to the signature generation:

```javascript
export function buildSignatureHtml({ /* ... existing params */, newField }) {
  // Add the field to the HTML generation logic
  if (newField) {
    // Include in signature
  }
}
```

### 5. Add Validation (Optional)
In `src/utils/validation.js`:

```javascript
export function validateForm(data, language) {
  const errors = {};
  
  if (!data.newField) {
    errors.newField = language === "he" ? "שדה חדש הוא שדה חובה" : "New field is required";
  }
  
  return errors;
}
```

### 6. Update Import/Export
The field will automatically be included in import/export functionality since it's part of the `formData` object.

## Email Client Support

The generated signatures use table-based HTML with inline styles for maximum compatibility across email clients:

- **Outlook** (Desktop & Web)
- **Gmail** (Web & Mobile)
- **Apple Mail**
- **Thunderbird**
- **Yahoo Mail**
- **Mobile email apps**

## Development

### Prerequisites
- Node.js 14+ 
- npm or yarn

### Setup
```bash
npm install
npm start
```

### Build
```bash
npm run build
```

### Testing
The application includes comprehensive mobile testing and accessibility validation.

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is proprietary to Inspiria and is not open source.
