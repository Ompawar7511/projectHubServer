# FlyMail Frontend Development Guide

## Backend API Overview

Based on your backend structure, here are all the API endpoints you need to integrate:

### Base URL
`http://localhost:5000/api` (or your deployed backend URL)

---

## API Endpoints

### 1. User Authentication (`/api/users`)

#### POST `/api/users/register`
Register a new user
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user" // or "admin"
  }
  ```
- **Response:** `201` - User object

#### POST `/api/users/signin`
Login user
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:** `200` - `{ message, user, token }`
- **Important:** Store the `token` in localStorage/sessionStorage

#### POST `/api/users/otp`
Request OTP for password reset (Requires Auth)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "email": "john@example.com"
  }
  ```
- **Response:** `200` - `{ message: "OTP sent" }`

#### PUT `/api/users/reset-password`
Reset password with OTP (Requires Auth)
- **Headers:** `Authorization: Bearer <token>`
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "otp": "123456",
    "newPassword": "newpassword123"
  }
  ```
- **Response:** `200` - `{ message: "Password updated" }`

---

### 2. Mail Operations (`/api/mail`)
**All routes require authentication: `Authorization: Bearer <token>`**

#### GET `/api/mail`
Get user inbox
- **Response:** `200` - `{ count: number, mails: Array }`

#### GET `/api/mail/sent`
Get sent mails
- **Response:** `200` - `{ count: number, mails: Array }`

#### GET `/api/mail/drafts`
Get draft mails
- **Response:** `200` - `{ count: number, mails: Array }`

#### POST `/api/mail/compose`
Compose new mail or save draft
- **Request Body:**
  ```json
  {
    "toEmail": "receiver@example.com",  // or use "receiver": "userId"
    "subject": "Test Subject",
    "body": "Email body content",
    "isDraft": false  // true to save as draft
  }
  ```
- **Response:** `201` - `{ message: "Mail sent/draft saved", mail }`

#### GET `/api/mail/:id`
Get specific mail details
- **Response:** `200` - Mail object

#### PATCH `/api/mail/:id/read`
Mark mail as read
- **Response:** `200` - `{ message: "Mail marked as read", mail }`

#### DELETE `/api/mail/:id`
Delete mail
- **Response:** `200` - `{ message: "Mail deleted successfully" }`

#### GET `/api/mail/search?q=searchQuery`
Search mails
- **Response:** `200` - `{ count: number, mails: Array }`

---

### 3. Admin Operations (`/api/admin`)
**All routes require authentication + admin role**

#### GET `/api/admin/users`
List all users
- **Response:** `200` - Array of users

#### PATCH `/api/admin/users/:id/toggle-active`
Toggle user active status
- **Response:** `200` - Updated user

#### GET `/api/admin/users/:id/mail`
View all mails for specific user
- **Response:** `200` - Array of mails

#### DELETE `/api/admin/user/:id`
Delete user
- **Response:** `200` - `{ message: "User deleted" }`

---

## Recommended Tech Stack

Choose one of these modern frontend frameworks:

### Option 1: React + Vite (Recommended)
**Why:** Modern, fast, and widely used
```bash
npm create vite@latest flymail-frontend -- --template react
cd flymail-frontend
npm install axios react-router-dom
```

### Option 2: React + Next.js
**Why:** SSR capabilities, better SEO
```bash
npx create-next-app@latest flymail-frontend
cd flymail-frontend
npm install axios
```

### Option 3: Vue.js + Vite
**Why:** Simpler learning curve
```bash
npm create vite@latest flymail-frontend -- --template vue
cd flymail-frontend
npm install axios vue-router
```

### Option 4: Angular
**Why:** Full-featured framework
```bash
ng new flymail-frontend
cd flymail-frontend
npm install axios
```

---

## Frontend Project Structure

```
flymail-frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/           # Reusable UI components
│   │   ├── Layout/
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   └── Footer.jsx
│   │   ├── Mail/
│   │   │   ├── MailList.jsx
│   │   │   ├── MailItem.jsx
│   │   │   ├── ComposeMail.jsx
│   │   │   ├── MailView.jsx
│   │   │   └── MailSearch.jsx
│   │   └── Common/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Modal.jsx
│   │       └── Loading.jsx
│   ├── pages/                # Page components
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── ForgotPassword.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Inbox.jsx
│   │   ├── Sent.jsx
│   │   ├── Drafts.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/             # API calls
│   │   ├── authService.js
│   │   ├── mailService.js
│   │   └── adminService.js
│   ├── context/              # State management
│   │   ├── AuthContext.jsx
│   │   └── MailContext.jsx
│   ├── hooks/                # Custom hooks
│   │   ├── useAuth.js
│   │   └── useLocalStorage.js
│   ├── utils/                # Utilities
│   │   ├── axios.js          # Axios instance with interceptors
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── styles/               # Styling
│   │   ├── main.css
│   │   └── components/
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Entry point
├── package.json
└── README.md
```

---

## Key Implementation Steps

### Step 1: Setup Project
1. Initialize your chosen framework
2. Install dependencies (axios, router, etc.)
3. Setup project structure
4. Configure environment variables for API URL

### Step 2: Authentication System
1. Create `services/authService.js` for all auth API calls
2. Create `AuthContext.jsx` for global auth state
3. Create `useAuth` hook
4. Setup token storage (localStorage/sessionStorage)
5. Create Login and Register pages

### Step 3: API Services Layer
1. Create `utils/axios.js` with interceptors for auth headers
2. Create `services/mailService.js` for all mail operations
3. Create `services/adminService.js` for admin operations

### Step 4: Layout & Navigation
1. Create Header with user info and logout
2. Create Sidebar with navigation links
3. Setup routing with protected routes
4. Create role-based route guards

### Step 5: Mail Features
1. **Inbox Page:**
   - List incoming mails
   - Show unread indicator
   - Click to view mail details
   - Delete mail button
   - Mark as read on view

2. **Compose Mail:**
   - To, Subject, Body fields
   - Save as Draft option
   - Send button
   - Auto-save drafts every 30 seconds (optional)

3. **Drafts:**
   - List all drafts
   - Click to edit and send

4. **Sent:**
   - Show sent mails
   - View sent mail details

5. **Search:**
   - Search bar in header
   - Real-time search results
   - Highlight search terms

### Step 6: Admin Panel (if admin role)
1. User management page
2. Toggle user active/inactive
3. View all user mails
4. Delete users

### Step 7: UI/UX Polish
1. Add loading states
2. Add error handling and toast notifications
3. Add responsive design (mobile-friendly)
4. Add animations/transitions
5. Add proper form validation

---

## Essential Code Examples

### Axios Configuration (`utils/axios.js`)
```javascript
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Add token to all requests
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
```

### Auth Service (`services/authService.js`)
```javascript
import axios from '../utils/axios';

export const register = async (userData) => {
  const response = await axios.post('/users/register', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.post('/users/signin', credentials);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
```

### Mail Service (`services/mailService.js`)
```javascript
import axios from '../utils/axios';

export const getInbox = () => axios.get('/mail');
export const getSent = () => axios.get('/mail/sent');
export const getDrafts = () => axios.get('/mail/drafts');
export const getMailById = (id) => axios.get(`/mail/${id}`);
export const composeMail = (mailData) => axios.post('/mail/compose', mailData);
export const deleteMail = (id) => axios.delete(`/mail/${id}`);
export const markAsRead = (id) => axios.patch(`/mail/${id}/read`);
export const searchMails = (query) => axios.get(`/mail/search?q=${query}`);
```

---

## State Management Approach

### Option 1: Context API (Simple)
- Use `AuthContext` for user state
- Use `MailContext` for mail operations
- Good for medium-sized apps

### Option 2: Redux Toolkit (Complex)
- Better for large-scale apps
- More boilerplate but better organization

### Option 3: Zustand or Jotai
- Lightweight and modern
- Less boilerplate than Redux

---

## Styling Options

### Option 1: Tailwind CSS (Recommended)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Utility-first CSS
- Rapid development
- Consistent design

### Option 2: Material-UI or MUI
```bash
npm install @mui/material @emotion/react @emotion/styled
```
- Pre-built components
- Professional look
- Time-saving

### Option 3: Styled Components
```bash
npm install styled-components
```
- CSS-in-JS
- Component-scoped styles

---

## Environment Variables

Create `.env` file:
```
VITE_API_URL=http://localhost:5000/api
# or your production backend URL
```

---

## Testing Considerations

### Unit Tests
- Test utility functions
- Test API service functions

### Integration Tests
- Test auth flows
- Test mail operations

### E2E Tests (Optional)
- Use Cypress or Playwright
- Test complete user journeys

---

## Deployment Options

### Frontend Hosting:
1. **Vercel** (Best for React/Next.js)
2. **Netlify** (Universal)
3. **GitHub Pages** (Static)
4. **Cloudflare Pages**
5. **AWS S3 + CloudFront**

---

## Important Notes

1. **CORS:** Your backend already has CORS enabled, so no additional backend changes needed
2. **Token Storage:** Use `httpOnly` cookies for production (requires backend changes) or localStorage for development
3. **Error Handling:** Always handle API errors gracefully
4. **Loading States:** Show loaders during API calls
5. **Form Validation:** Validate on both frontend and backend
6. **Responsive Design:** Ensure mobile-friendly UI
7. **Accessibility:** Follow WCAG guidelines
8. **Performance:** Optimize images, lazy load routes, code splitting

---

## Development Checklist

- [ ] Setup project with chosen framework
- [ ] Configure API service layer
- [ ] Implement authentication flow
- [ ] Create protected routes
- [ ] Build email list components
- [ ] Build compose email form
- [ ] Implement search functionality
- [ ] Add role-based admin panel (if applicable)
- [ ] Add error handling and notifications
- [ ] Add loading states
- [ ] Make responsive design
- [ ] Test all features
- [ ] Deploy frontend
- [ ] Test with deployed backend

---

## UI/UX Design Suggestions

### Color Scheme
- Primary: Blue tones (trustworthy, professional)
- Success: Green
- Error: Red
- Warning: Orange/Yellow
- Background: Light Gray or White

### Component Ideas
- Mail list with avatar initials
- Read/unread indicators (bold/unbold)
- Timestamps for emails
- Preview text in mail list
- Trash/deleted confirmation modal
- Copy email address button
- Quick reply feature
- Attachment support (future enhancement)

---

## Next Steps

1. Choose your frontend framework
2. Initialize the project
3. Start with authentication (login/register)
4. Build the mail interface
5. Add admin features if needed
6. Polish and deploy

---

## Need Help?

If you need help with any specific implementation, please specify:
- Which framework you're using
- Which feature you want to implement next
- Any errors or issues you're facing

Good luck with your FlyMail frontend development! 🚀

