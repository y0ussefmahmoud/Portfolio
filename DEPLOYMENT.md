# 🚀 Deployment Instructions for GitHub Pages

## 📋 Prerequisites
- GitHub account
- Git installed locally
- Node.js (v16+) installed

## 🔧 Setup Steps

### 1. Push to GitHub Repository
```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "🚀 Initial commit: React.js Portfolio"

# Add remote repository
git remote add origin https://github.com/Y0ussefMahmoud/Portfolio.git

# Push to GitHub
git push -u origin main
```

### 2. Enable GitHub Pages
1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. The workflow will automatically deploy your site

### 3. Alternative: Manual Deployment with gh-pages
```bash
# Install dependencies
npm install

# Deploy to GitHub Pages
npm run deploy
```

## 🌐 Your Live Site
After deployment, your portfolio will be available at:
**https://y0ussefmahmoud.github.io/Portfolio/**

## 🔄 Automatic Deployment
- Every push to `main` branch will automatically trigger deployment
- GitHub Actions workflow handles the build and deployment process
- No manual intervention required after initial setup

## 📁 Files Added for GitHub Pages
- `.github/workflows/deploy.yml` - GitHub Actions workflow
- `public/.nojekyll` - Prevents Jekyll processing
- `public/404.html` - Handles SPA routing
- `package.json` - Updated with homepage and deploy scripts

## ✅ Verification
1. Check GitHub Actions tab for deployment status
2. Visit the live URL to verify the site works
3. Test on different devices and browsers

## 🛠️ Troubleshooting
- If images don't load, check the paths are correct
- If the site shows README instead of the app, ensure GitHub Pages source is set to GitHub Actions
- Check the Actions tab for any build errors

## 📞 Support
If you encounter issues, check:
1. GitHub Actions logs
2. Browser console for errors
3. Ensure all dependencies are properly installed
