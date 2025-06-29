# 🏗️ Architecture Documentation - Globeflight Kenya

This document provides a comprehensive overview of the Globeflight Kenya website architecture, design patterns, and technical decisions.

## 📋 Table of Contents

- [Overview](#overview)
- [System Architecture](#system-architecture)
- [Frontend Architecture](#frontend-architecture)
- [Component Architecture](#component-architecture)
- [State Management](#state-management)
- [Routing Architecture](#routing-architecture)
- [Data Flow](#data-flow)
- [Performance Architecture](#performance-architecture)
- [Security Architecture](#security-architecture)
- [Deployment Architecture](#deployment-architecture)
- [Technology Decisions](#technology-decisions)

## 🌟 Overview

The Globeflight Kenya website is a modern, responsive Single Page Application (SPA) built with React and Vite. It follows a component-based architecture with a focus on performance, accessibility, and maintainability.

### Key Architectural Principles

- **Component-Based**: Modular, reusable components
- **Performance-First**: Optimized loading and rendering
- **Accessibility**: WCAG compliant design
- **Responsive**: Mobile-first approach
- **Scalable**: Easy to extend and maintain

## 🏛️ System Architecture

### High-Level Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Client Side   │    │   External      │    │   Deployment    │
│   (Browser)     │    │   Services      │    │   Platform      │
├─────────────────┤    ├─────────────────┤    ├─────────────────┤
│ • React App     │    │ • Tawk.to       │    │ • Vercel        │
│ • Vite Build    │    │ • Resend Email  │    │ • Netlify       │
│ • Tailwind CSS  │    │ • Google Maps   │    │ • GitHub Pages  │
│ • PWA Features  │    │ • Analytics     │    │ • Custom Server │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Technology Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend Framework** | React 18.2.0 | UI library with hooks |
| **Build Tool** | Vite 5.4.10 | Fast development and build |
| **Styling** | Tailwind CSS 3.4.1 | Utility-first CSS framework |
| **Routing** | React Router 6.27.0 | Client-side routing |
| **State Management** | React Hooks | Local and global state |
| **UI Components** | Radix UI | Accessible primitives |
| **Animations** | Framer Motion 11.18.2 | Smooth transitions |
| **Forms** | React Hook Form 7.50.1 | Form handling |
| **Validation** | Zod 3.22.4 | Schema validation |
| **Maps** | Leaflet 1.9.4 | Interactive maps |
| **Chat** | Tawk.to | Live customer support |
| **Email** | Resend | Contact form processing |

## 🎨 Frontend Architecture

### Application Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Radix)
│   ├── Container.jsx   # Layout wrapper
│   ├── TawkToComponent.jsx # Live chat
│   └── ...
├── constants/          # Application constants
│   ├── global.js       # Global settings
│   ├── homepage.js     # Homepage content
│   ├── layout.js       # Layout configuration
│   └── ...
├── config/            # Configuration files
│   └── tawkTo.js      # Tawk.to settings
├── hooks/             # Custom React hooks
├── layout/            # Layout components
│   ├── components/    # Layout-specific components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ...
│   └── MainLayout.jsx
├── lib/               # Utility libraries
│   ├── utils.js       # Helper functions
│   └── validations/   # Form validation schemas
├── pages/             # Page components
│   ├── Home/          # Homepage
│   ├── About/         # About page
│   ├── Services/      # Services pages
│   ├── Contact/       # Contact page
│   ├── Track/         # Tracking page
│   └── Blog/          # Blog pages
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles
```

### Design Patterns

#### 1. Component Composition
```jsx
// Parent component composes child components
const HomePage = () => (
  <div>
    <Hero />
    <Services />
    <Testimonials />
    <ContactForm />
  </div>
);
```

#### 2. Custom Hooks
```jsx
// Reusable logic extraction
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};
```

#### 3. Higher-Order Components
```jsx
// Component enhancement
const withLoading = (Component) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      // Simulate loading
      setTimeout(() => setLoading(false), 1000);
    }, []);

    if (loading) return <LoadingSpinner />;
    return <Component {...props} />;
  };
};
```

## 🧩 Component Architecture

### Component Hierarchy

```
App
├── MainLayout
│   ├── Navbar
│   │   ├── Logo
│   │   ├── Navigation
│   │   └── MobileMenu
│   ├── Outlet (Page Content)
│   │   ├── Home
│   │   ├── Services
│   │   ├── About
│   │   ├── Contact
│   │   └── Track
│   ├── Footer
│   │   ├── CompanyInfo
│   │   ├── QuickLinks
│   │   └── SocialMedia
│   └── TawkToComponent
└── GlobalProviders
```

### Component Categories

#### 1. Layout Components
- **MainLayout**: Overall page structure
- **Container**: Content width management
- **Grid**: Responsive grid system

#### 2. UI Components
- **Button**: Interactive elements
- **Card**: Content containers
- **Modal**: Overlay dialogs
- **Form**: Input components

#### 3. Feature Components
- **TawkToComponent**: Live chat integration
- **TrackingForm**: Shipment tracking
- **ContactForm**: Customer inquiries
- **ServiceCard**: Service showcase

#### 4. Page Components
- **Home**: Landing page
- **Services**: Service listings
- **About**: Company information
- **Contact**: Contact information

### Component Design Principles

#### 1. Single Responsibility
```jsx
// ✅ Good: Single responsibility
const ServiceCard = ({ service }) => (
  <Card>
    <ServiceIcon icon={service.icon} />
    <ServiceTitle title={service.title} />
    <ServiceDescription description={service.description} />
  </Card>
);

// ❌ Bad: Multiple responsibilities
const ServiceCard = ({ service }) => (
  <Card>
    {/* Icon, title, description, pricing, booking, etc. */}
  </Card>
);
```

#### 2. Props Interface
```jsx
// Clear props interface
const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  price, 
  onBook 
}) => {
  // Component implementation
};
```

#### 3. Default Props
```jsx
ServiceCard.defaultProps = {
  price: 'Contact for pricing',
  onBook: () => console.log('Booking not implemented')
};
```

## 🔄 State Management

### State Architecture

```
Global State (Context)
├── User Preferences
│   ├── Theme (dark/light)
│   ├── Language
│   └── Notifications
├── Application State
│   ├── Loading states
│   ├── Error states
│   └── Navigation state
└── Feature State
    ├── Form data
    ├── Search results
    └── Tracking data
```

### State Management Patterns

#### 1. React Context
```jsx
// Global state management
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState(null);

  const value = {
    theme,
    setTheme,
    user,
    setUser
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};
```

#### 2. Custom Hooks
```jsx
// State logic encapsulation
const useForm = (initialState) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (callback) => {
    // Validation and submission logic
  };

  return { values, errors, handleChange, handleSubmit };
};
```

#### 3. Local State
```jsx
// Component-specific state
const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Component logic
};
```

## 🛣️ Routing Architecture

### Route Structure

```
/ (Home)
├── /services (Services Overview)
│   └── /services/:slug (Service Detail)
├── /about-us (About Page)
├── /contact-us (Contact Page)
├── /track (Tracking Page)
├── /blog (Blog Overview)
│   ├── /blog/:slug (Blog Post)
│   └── /blog/category/:slug (Category)
└── /jobs (Job Listings)
    └── /jobs/:slug (Job Detail)
```

### Routing Implementation

```jsx
// Nested routing with layout
<BrowserRouter>
  <Routes>
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Home />} />
      <Route path="services" element={<Services />} />
      <Route path="services/:slug" element={<ServiceDetail />} />
      <Route path="about-us" element={<About />} />
      <Route path="contact-us" element={<Contact />} />
      <Route path="track" element={<Track />} />
      <Route path="blog" element={<BlogHome />}>
        <Route index element={<BlogPage />} />
        <Route path=":slug" element={<BlogDetail />} />
        <Route path="category/:slug" element={<BlogCategoryPage />} />
      </Route>
      <Route path="jobs" element={<JobPage />} />
      <Route path="jobs/:slug" element={<JobDetail />} />
    </Route>
  </Routes>
</BrowserRouter>
```

### Route Guards

```jsx
// Protected routes
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};
```

## 📊 Data Flow

### Data Flow Architecture

```
User Action → Component → Hook → Service → API → Response → State Update → UI Update
```

### Data Flow Examples

#### 1. Contact Form Submission
```jsx
// User fills form → Component handles submit → Service sends email → UI shows success
const ContactForm = () => {
  const { handleSubmit, loading } = useContactForm();

  const onSubmit = async (data) => {
    try {
      await sendContactEmail(data);
      showSuccessMessage();
    } catch (error) {
      showErrorMessage(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}
    </form>
  );
};
```

#### 2. Service Data Loading
```jsx
// Component mounts → Hook fetches data → State updates → UI renders
const ServicesPage = () => {
  const { services, loading, error } = useServices();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  );
};
```

## ⚡ Performance Architecture

### Performance Optimization Strategies

#### 1. Code Splitting
```jsx
// Lazy loading for route-based code splitting
const BlogDetail = lazy(() => import('./pages/Blog/BlogDetail'));
const ServiceDetail = lazy(() => import('./pages/Services/ServiceDetail'));

// Component-based code splitting
const HeavyComponent = lazy(() => import('./components/HeavyComponent'));
```

#### 2. Image Optimization
```jsx
// Responsive images with WebP support
<img 
  srcSet="image-300.webp 300w, image-600.webp 600w, image-900.webp 900w"
  sizes="(max-width: 600px) 300px, (max-width: 900px) 600px, 900px"
  src="image-600.webp"
  alt="Description"
  loading="lazy"
/>
```

#### 3. Bundle Optimization
```javascript
// Vite configuration for bundle splitting
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
          utils: ['lodash', 'date-fns']
        }
      }
    }
  }
});
```

#### 4. Caching Strategy
```javascript
// Service worker for offline support
const CACHE_NAME = 'globeflight-cache-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});
```

### Performance Monitoring

#### 1. Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

#### 2. Bundle Analysis
```bash
# Analyze bundle size
npm run build -- --analyze
```

#### 3. Performance Budgets
```javascript
// Performance budgets in package.json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    }
  ]
}
```

## 🔒 Security Architecture

### Security Measures

#### 1. Content Security Policy
```html
<!-- CSP headers -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self' 'unsafe-inline' https://www.tawk.to; style-src 'self' 'unsafe-inline';">
```

#### 2. Environment Variables
```javascript
// Secure API key handling
const apiKey = import.meta.env.VITE_EMAIL_API_KEY;
```

#### 3. Input Validation
```javascript
// Zod schema validation
const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(1000)
});
```

#### 4. XSS Prevention
```jsx
// Safe content rendering
const SafeContent = ({ content }) => (
  <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(content) }} />
);
```

### Security Headers

```nginx
# Nginx security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

## 🚀 Deployment Architecture

### Deployment Options

#### 1. Vercel (Recommended)
```
GitHub Repository → Vercel → CDN → Global Users
```

#### 2. Netlify
```
GitHub Repository → Netlify → CDN → Global Users
```

#### 3. Custom Server
```
GitHub Repository → CI/CD → Server → Nginx → Users
```

### CI/CD Pipeline

```yaml
# GitHub Actions workflow
name: Deploy to Production
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
```

### Environment Management

```bash
# Environment-specific configurations
.env.development    # Development settings
.env.production     # Production settings
.env.local          # Local overrides
```

## 🤔 Technology Decisions

### Why React 18?
- **Concurrent Features**: Better performance and user experience
- **Automatic Batching**: Improved performance
- **Suspense**: Better loading states
- **Hooks**: Cleaner component logic

### Why Vite?
- **Fast Development**: Instant hot module replacement
- **Optimized Builds**: Rollup-based bundling
- **Modern Tooling**: ES modules and modern browser features
- **Plugin Ecosystem**: Rich plugin support

### Why Tailwind CSS?
- **Utility-First**: Rapid development
- **Responsive Design**: Built-in responsive utilities
- **Customization**: Easy theme customization
- **Performance**: Small bundle size

### Why Radix UI?
- **Accessibility**: WCAG compliant components
- **Unstyled**: Complete styling control
- **Composable**: Flexible component composition
- **TypeScript**: Full TypeScript support

### Why Tawk.to?
- **Easy Integration**: Simple setup
- **Customization**: Branded chat widget
- **Analytics**: Visitor tracking
- **Mobile Support**: Responsive design

---

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Radix UI Documentation](https://www.radix-ui.com/)

---

**This architecture documentation is maintained by the Globeflight Kenya development team.** 