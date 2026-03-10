# LeaveFlow - Leave Management System

A modern, full-featured leave management application where employees can apply for leave and employers can approve or reject those requests. Built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

### Employee Features
- Sign up and log in with email/password authentication
- Apply for leave by providing:
  - Leave type (Sick Leave, Casual Leave, Vacation, Personal, Emergency)
  - Start date and end date
  - Reason for leave
- View all submitted leave requests
- Track status of leave requests (Pending, Approved, Rejected)
- Dashboard with statistics showing total, pending, and approved requests

### Employer Features
- Sign up and log in with email/password authentication
- View all employee leave requests
- Approve or reject leave requests
- Filter requests by status (All, Pending, Approved, Rejected)
- Dashboard with comprehensive statistics
- View employee details for each request

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom gradient designs
- **Backend**: Supabase (PostgreSQL database + REST APIs)
- **Authentication**: Supabase Auth with JWT tokens
- **Icons**: Lucide React
- **Build Tool**: Vite

## Design Highlights

- Modern glassmorphism UI with backdrop blur effects
- Gradient backgrounds (cyan to slate)
- Responsive design that works on mobile, tablet, and desktop
- Smooth transitions and hover effects
- Role-based dashboards with distinct interfaces
- Real-time status updates

## Security Features

- JWT-based authentication
- Row Level Security (RLS) policies in database
- Role-based access control (Employee vs Employer)
- Secure password handling
- Protected API endpoints
- Input validation on both client and server side

## Database Schema

### Tables

1. **profiles**
   - `id`: UUID (references auth.users)
   - `role`: Text (employee or employer)
   - `full_name`: Text
   - `email`: Text
   - `created_at`: Timestamp

2. **leave_requests**
   - `id`: UUID (primary key)
   - `employee_id`: UUID (foreign key to profiles)
   - `leave_type`: Text
   - `start_date`: Date
   - `end_date`: Date
   - `reason`: Text
   - `status`: Text (Pending, Approved, Rejected)
   - `reviewed_by`: UUID (foreign key to profiles)
   - `reviewed_at`: Timestamp
   - `created_at`: Timestamp
   - `updated_at`: Timestamp

## Local Development Setup

### Prerequisites

- Node.js 16+ and npm installed
- A code editor (VS Code recommended)
- Minimum 16 GB RAM recommended

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Environment Variables

The Supabase environment variables are automatically configured. The application connects to a hosted Supabase instance that includes:
- Database (PostgreSQL)
- Authentication
- REST APIs

### Step 4: Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Step 5: Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Step 6: Preview Production Build

```bash
npm run preview
```

## How to Use the Application

### For Employees:

1. **Sign Up**
   - Click "Sign Up" on the login page
   - Fill in your full name, email, and password
   - Select "Employee" as your role
   - Click "Create Account"

2. **Apply for Leave**
   - After logging in, click "New Request"
   - Select leave type from dropdown
   - Choose start and end dates
   - Provide a reason for your leave
   - Click "Submit Request"

3. **Track Your Requests**
   - View all your leave requests on the dashboard
   - Check the status (Pending, Approved, or Rejected)
   - See submission and review dates

### For Employers:

1. **Sign Up**
   - Click "Sign Up" on the login page
   - Fill in your full name, email, and password
   - Select "Employer" as your role
   - Click "Create Account"

2. **Review Leave Requests**
   - After logging in, you'll see all employee leave requests
   - Filter by status using the buttons at the top
   - Each request shows:
     - Employee name and email
     - Leave type and dates
     - Reason for leave
     - Submission date

3. **Approve or Reject Requests**
   - For pending requests, click "Approve" or "Reject"
   - The status updates immediately
   - Review timestamp is recorded automatically

## Project Structure

```
src/
├── components/
│   ├── Login.tsx              # Login form component
│   ├── Signup.tsx             # Registration form component
│   ├── EmployeeDashboard.tsx  # Employee dashboard with leave application
│   └── EmployerDashboard.tsx  # Employer dashboard for managing requests
├── contexts/
│   └── AuthContext.tsx        # Authentication context and hooks
├── lib/
│   └── supabase.ts           # Supabase client configuration and types
├── App.tsx                    # Main app component with routing logic
├── main.tsx                   # Application entry point
└── index.css                  # Global styles with Tailwind
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Check TypeScript types

## Validation Features

- Required field validation
- Email format validation
- Password length validation (minimum 6 characters)
- Date validation (end date must be after start date)
- Real-time error messages
- Loading states during async operations

## Deployment

The application is designed to be deployed on any modern cloud platform:

- **Vercel** (Recommended for Vite/React apps)
- **Netlify**
- **AWS Amplify**
- **Google Cloud Platform**
- **Microsoft Azure**

The Supabase backend is already hosted and doesn't require additional deployment.

### Deployment Steps (Vercel Example):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. Deploy - no additional environment variables needed

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized bundle size (~302 KB JavaScript, ~15 KB CSS)
- Lazy loading for better initial load time
- Efficient database queries with proper indexing
- Row Level Security for secure data access

## Future Enhancements

Potential features that could be added:
- Email notifications for leave approvals/rejections
- Leave balance tracking
- Calendar view of leaves
- Export leave reports to PDF/Excel
- Multi-level approval workflow
- Leave history and analytics
- Mobile app version

## Support

For issues or questions, please create an issue in the repository.

## License

This project is built for educational and demonstration purposes.
