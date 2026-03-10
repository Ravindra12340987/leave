# Quick Start Guide

Get your leave management system running in 3 simple steps!

## Step 1: Install Dependencies

Open your terminal in VS Code and run:

```bash
npm install
```

This will install all required packages (React, TypeScript, Tailwind CSS, Supabase, etc.)

## Step 2: Start the Development Server

Run:

```bash
npm run dev
```

You should see output like:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
```

## Step 3: Open in Browser

Open your browser and go to:
```
http://localhost:5173
```

## What You'll See

You'll land on a beautiful login/signup page with a gradient background.

### Create Your First Employee Account

1. Click "Sign Up"
2. Enter:
   - Full Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
   - Role: Select "Employee"
3. Click "Create Account"
4. You'll be automatically logged in to the Employee Dashboard

### Create an Employer Account (New Incognito Window)

1. Open a new incognito/private window
2. Go to `http://localhost:5173`
3. Click "Sign Up"
4. Enter:
   - Full Name: "Jane Smith"
   - Email: "jane@example.com"
   - Password: "password123"
   - Role: Select "Employer"
5. Click "Create Account"
6. You'll be automatically logged in to the Employer Dashboard

### Test the Flow

**As Employee (first window):**
1. Click "New Request"
2. Fill in leave details:
   - Leave Type: "Sick Leave"
   - Start Date: Pick any future date
   - End Date: Pick a date after start date
   - Reason: "Doctor's appointment"
3. Click "Submit Request"
4. You'll see your request in the list with "Pending" status

**As Employer (second window):**
1. Refresh the page to see the new request
2. You'll see the employee's request
3. Click "Approve" to approve it (or "Reject" to reject)
4. The status updates immediately

**Back to Employee (first window):**
1. Refresh the page
2. You'll see your request status changed to "Approved"!

## Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

## Building for Production

When you're ready to deploy:

```bash
npm run build
```

This creates optimized production files in the `dist` folder.

## Common Issues

### Port Already in Use
If port 5173 is already in use, Vite will automatically use the next available port (5174, 5175, etc.)

### Module Not Found
Make sure you ran `npm install` first.

### Database Connection Error
The Supabase database is already configured and hosted. No additional setup needed!

## Need Help?

Check the main README.md for detailed documentation.

Enjoy your leave management system! 🎉
