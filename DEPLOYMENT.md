# Deployment Guide

This guide explains how to deploy your LeaveFlow application to various free cloud platforms.

## Prerequisites

Before deploying:
1. Build the project locally to ensure everything works: `npm run build`
2. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

## Option 1: Vercel (Recommended)

Vercel offers excellent support for Vite/React applications with zero configuration.

### Steps:

1. **Sign up for Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with your GitHub account

2. **Import Your Project**
   - Click "Add New Project"
   - Select your repository
   - Vercel automatically detects Vite configuration

3. **Deploy**
   - Click "Deploy"
   - Wait 1-2 minutes
   - Your app will be live at `https://your-project.vercel.app`

4. **Custom Domain (Optional)**
   - Go to project settings
   - Add your custom domain
   - Follow DNS configuration instructions

### Automatic Deployments
Every push to your main branch automatically deploys to production!

---

## Option 2: Netlify

Netlify is another excellent option with a generous free tier.

### Steps:

1. **Sign up for Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Sign up with your GitHub account

2. **Create New Site**
   - Click "Add new site" → "Import an existing project"
   - Connect to your Git provider
   - Select your repository

3. **Configure Build Settings**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Click "Deploy site"

4. **Your Site is Live**
   - Netlify provides a URL like `https://random-name.netlify.app`
   - You can customize this in site settings

### Automatic Deployments
Netlify automatically deploys on every push to your main branch.

---

## Option 3: AWS Amplify

AWS offers a free tier for hosting static websites.

### Steps:

1. **Sign up for AWS**
   - Go to [aws.amazon.com](https://aws.amazon.com)
   - Create a free tier account

2. **Open AWS Amplify Console**
   - Search for "Amplify" in AWS Console
   - Click "Get Started" under "Deliver"

3. **Connect Repository**
   - Select your Git provider
   - Authorize AWS to access your repository
   - Select your repository and branch

4. **Configure Build Settings**
   - Amplify auto-detects Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Click "Save and Deploy"

5. **Access Your App**
   - AWS provides a URL like `https://main.d123456.amplifyapp.com`

---

## Option 4: Google Cloud Platform (Firebase Hosting)

Firebase Hosting is part of Google Cloud's free tier.

### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   firebase init hosting
   ```
   - Select "Use an existing project" or create new
   - Public directory: `dist`
   - Single-page app: Yes
   - Automatic builds with GitHub: Optional

4. **Build Your App**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy
   ```

6. **Access Your App**
   - Firebase provides a URL like `https://your-project.web.app`

---

## Option 5: Microsoft Azure Static Web Apps

Azure offers free hosting for static web apps.

### Steps:

1. **Sign up for Azure**
   - Go to [azure.microsoft.com](https://azure.microsoft.com)
   - Create a free account

2. **Create Static Web App**
   - In Azure Portal, search "Static Web Apps"
   - Click "Create"
   - Connect to your Git repository

3. **Configure Build**
   - App location: `/`
   - Output location: `dist`
   - Build command: `npm run build`

4. **Deploy**
   - Azure automatically deploys your app
   - URL: `https://your-app.azurestaticapps.net`

---

## Post-Deployment Checklist

After deploying to any platform:

- ✅ Test employee signup and login
- ✅ Test employer signup and login
- ✅ Test leave request submission
- ✅ Test leave approval/rejection
- ✅ Test on mobile devices
- ✅ Test in different browsers
- ✅ Share the live URL

## Custom Domain Setup

All platforms above support custom domains. General steps:

1. Purchase a domain (Namecheap, GoDaddy, Google Domains)
2. Add domain in your hosting platform settings
3. Update DNS records as instructed
4. Wait for DNS propagation (up to 48 hours)
5. SSL certificate is automatically provisioned

## Environment Variables

The Supabase environment variables are already configured in the application. No additional configuration needed for deployment!

## Performance Tips

1. **Enable Compression**
   - Most platforms enable this automatically

2. **CDN Distribution**
   - Vercel, Netlify, and others use global CDNs automatically

3. **Caching**
   - Static assets are automatically cached

4. **Analytics**
   - Add Vercel Analytics, Netlify Analytics, or Google Analytics

## Monitoring

### Free Monitoring Tools:
- **Vercel Analytics** - Built-in performance monitoring
- **Netlify Analytics** - Traffic and performance stats
- **Google Analytics** - User behavior tracking
- **Sentry** - Error tracking (free tier available)

## Costs

All platforms mentioned offer free tiers that are sufficient for:
- Small to medium projects
- Personal projects
- Internship assignments
- Portfolio projects

### Free Tier Limits (Approximate):
- **Vercel**: 100 GB bandwidth/month
- **Netlify**: 100 GB bandwidth/month
- **AWS Amplify**: 5 GB storage, 15 GB bandwidth/month
- **Firebase**: 10 GB storage, 360 MB/day downloads
- **Azure**: 100 GB bandwidth/month

## Recommended for This Project

**For Internship/Demo**: Vercel or Netlify
- Easiest setup
- Fastest deployment
- Best developer experience
- Automatic HTTPS
- Global CDN

## Troubleshooting

### Build Fails
- Ensure `npm run build` works locally first
- Check Node.js version compatibility
- Verify all dependencies are in package.json

### 404 on Refresh
- Configure SPA redirect rules
- Most platforms handle this automatically
- For Netlify: create `_redirects` file
- For Vercel: `vercel.json` config (auto-generated)

### Environment Variables Not Working
- For this project, no additional env vars needed
- Supabase credentials are already configured

## Support

If you encounter issues:
1. Check platform-specific documentation
2. Review build logs in the platform dashboard
3. Search platform community forums
4. Contact platform support (most have free tier support)

## Conclusion

Your LeaveFlow application is now live and accessible worldwide! Share the URL with your team, instructors, or potential employers.

Good luck with your internship! 🚀
