# 🚀 Deployment Guide - Globeflight Kenya

This guide covers deploying the Globeflight Kenya website to various platforms.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Setup](#environment-setup)
- [Vercel Deployment](#vercel-deployment)
- [Netlify Deployment](#netlify-deployment)
- [GitHub Pages](#github-pages)
- [Custom Server](#custom-server)
- [Environment Variables](#environment-variables)
- [Domain Configuration](#domain-configuration)
- [SSL Certificate](#ssl-certificate)
- [Performance Optimization](#performance-optimization)

## 🔧 Prerequisites

Before deployment, ensure you have:

- Node.js 18+ installed
- Git repository set up
- Domain name (optional)
- API keys for services (Tawk.to, Resend, etc.)

## ⚙️ Environment Setup

### 1. Create Environment File

Create a `.env` file in the root directory:

```bash
# Copy example file
cp .env.example .env
```

### 2. Configure Environment Variables

```env
# Email Service (Resend)
VITE_EMAIL_API_KEY=re_your_resend_api_key_here

# Live Chat (Tawk.to)
VITE_TAWK_TO_WIDGET_ID=your_tawk_to_widget_id

# Google Maps (Optional)
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Analytics (Optional)
VITE_GA_TRACKING_ID=your_google_analytics_id

# Base URL
VITE_BASE_URL=https://globeflight.co.ke
```

### 3. Build the Project

```bash
# Install dependencies
npm install

# Build for production
npm run build
```

The build output will be in the `dist/` directory.

## 🚀 Vercel Deployment

### Automatic Deployment

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel --prod
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings > Environment Variables
   - Add all variables from your `.env` file

### Manual Deployment

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

### Vercel Configuration

The project includes `vercel.json` for SPA routing:

```json
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

## 🌐 Netlify Deployment

### Automatic Deployment

1. **Connect GitHub Repository**
   - Go to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Configure Environment Variables**
   - Go to Site Settings > Environment Variables
   - Add all variables from your `.env` file

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `dist` folder to Netlify
   - Or use Netlify CLI:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

### Netlify Configuration

The project includes `public/netlify.toml`:

```toml
[[redirects]]
  from = "/*"
  to = "/"
  status = 200
```

## 📄 GitHub Pages

### Setup GitHub Pages

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add scripts to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

4. **Configure GitHub Pages**
   - Go to repository Settings > Pages
   - Select source: "Deploy from a branch"
   - Select branch: "gh-pages"
   - Save

## 🖥️ Custom Server

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name globeflight.co.ke www.globeflight.co.ke;
    root /var/www/globeflight/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Handle SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security for sensitive files
    location ~ /\. {
        deny all;
    }
}
```

### Apache Configuration

```apache
<VirtualHost *:80>
    ServerName globeflight.co.ke
    ServerAlias www.globeflight.co.ke
    DocumentRoot /var/www/globeflight/dist

    # Enable compression
    LoadModule deflate_module modules/mod_deflate.so
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/plain
        AddOutputFilterByType DEFLATE text/html
        AddOutputFilterByType DEFLATE text/xml
        AddOutputFilterByType DEFLATE text/css
        AddOutputFilterByType DEFLATE application/xml
        AddOutputFilterByType DEFLATE application/xhtml+xml
        AddOutputFilterByType DEFLATE application/rss+xml
        AddOutputFilterByType DEFLATE application/javascript
        AddOutputFilterByType DEFLATE application/x-javascript
    </IfModule>

    # SPA routing
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]

    # Cache static assets
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
        Header set Cache-Control "public, immutable"
    </FilesMatch>
</VirtualHost>
```

## 🔐 Environment Variables

### Production Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_EMAIL_API_KEY` | Resend API key for contact forms | Yes |
| `VITE_TAWK_TO_WIDGET_ID` | Tawk.to widget ID for live chat | Yes |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | No |
| `VITE_GA_TRACKING_ID` | Google Analytics tracking ID | No |
| `VITE_BASE_URL` | Base URL for the application | Yes |

### Setting Environment Variables

#### Vercel
```bash
vercel env add VITE_EMAIL_API_KEY
vercel env add VITE_TAWK_TO_WIDGET_ID
```

#### Netlify
- Go to Site Settings > Environment Variables
- Add each variable with its value

#### Custom Server
```bash
# Add to .env file or system environment
export VITE_EMAIL_API_KEY=your_key_here
export VITE_TAWK_TO_WIDGET_ID=your_widget_id
```

## 🌍 Domain Configuration

### DNS Configuration

1. **A Record**
   ```
   globeflight.co.ke → [Your Server IP]
   ```

2. **CNAME Record**
   ```
   www.globeflight.co.ke → globeflight.co.ke
   ```

3. **Additional Records**
   ```
   # For email (if using custom email)
   MX → mail.globeflight.co.ke
   TXT → v=spf1 include:_spf.google.com ~all
   ```

### Platform-Specific Domain Setup

#### Vercel
1. Go to Project Settings > Domains
2. Add custom domain: `globeflight.co.ke`
3. Update DNS records as instructed

#### Netlify
1. Go to Site Settings > Domain Management
2. Add custom domain: `globeflight.co.ke`
3. Update DNS records as instructed

## 🔒 SSL Certificate

### Let's Encrypt (Recommended)

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Obtain certificate
sudo certbot --nginx -d globeflight.co.ke -d www.globeflight.co.ke

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Platform SSL

#### Vercel
- SSL certificates are automatically provisioned
- No additional configuration needed

#### Netlify
- SSL certificates are automatically provisioned
- Force HTTPS in Site Settings > Domain Management

## ⚡ Performance Optimization

### Build Optimization

1. **Enable compression**
   ```bash
   # Add to vite.config.js
   export default defineConfig({
     build: {
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ['react', 'react-dom'],
             ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu']
           }
         }
       }
     }
   })
   ```

2. **Image optimization**
   ```bash
   # Use WebP format
   # Optimize images before adding to public/
   ```

### Caching Strategy

1. **Static assets**: Cache for 1 year
2. **HTML files**: No cache (for SPA updates)
3. **API responses**: Cache based on content type

### Monitoring

1. **Google Analytics**
   - Track page views and user behavior
   - Monitor performance metrics

2. **Vercel Analytics** (if using Vercel)
   - Real-time performance monitoring
   - Core Web Vitals tracking

## 🔍 Troubleshooting

### Common Issues

1. **404 errors on refresh**
   - Ensure SPA routing is configured
   - Check server configuration

2. **Environment variables not working**
   - Verify variable names start with `VITE_`
   - Check platform-specific configuration

3. **Build failures**
   - Check Node.js version (18+)
   - Clear node_modules and reinstall
   - Check for TypeScript errors

### Debug Commands

```bash
# Check build output
npm run build

# Preview production build
npm run preview

# Check for linting errors
npm run lint

# Analyze bundle size
npm run build -- --analyze
```

## 📞 Support

For deployment issues:

- **Vercel**: [Vercel Documentation](https://vercel.com/docs)
- **Netlify**: [Netlify Documentation](https://docs.netlify.com)
- **GitHub Pages**: [GitHub Pages Documentation](https://pages.github.com)

---

**Happy Deploying! 🚀** 