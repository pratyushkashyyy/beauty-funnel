# Quiz Funnel Features

## New Features Implemented

### 1. User Tracking with Browser Fingerprinting
- **Browser Fingerprinting**: Generates unique identifiers based on browser characteristics
- **Session Management**: Tracks user sessions across visits
- **Device Detection**: Identifies device type, browser, and operating system
- **Progress Tracking**: Records which questions users have answered and where they left off

### 2. Contact Information Collection
- **Early Collection**: Contact info is collected after 2-3 questions
- **Form Validation**: Real-time validation for name, email, and phone number
- **Database Storage**: User information is stored in SQLite database
- **Fingerprint Association**: Contact info is linked to browser fingerprint

### 3. Database Integration
- **SQLite3 Database**: Local database for storing all user data
- **User Table**: Stores contact information and device fingerprints
- **Quiz Responses Table**: Tracks all quiz answers with timestamps
- **Images Table**: Stores uploaded user images with metadata

### 4. API Endpoints
- `/api/user` - Create and retrieve user information
- `/api/quiz-response` - Save quiz responses to database
- `/api/upload-image` - Handle image uploads and storage
- `/api/admin/data` - Admin endpoint to view all data

### 5. Admin Dashboard
- **Complete Data View**: View all users, responses, and images
- **Statistics**: Real-time counts of users, responses, and images
- **Tabbed Interface**: Organized view of different data types
- **Device Information**: Shows browser and device details for each user

### 6. Image Upload and Storage
- **File Upload**: Users can upload images during the quiz
- **Secure Storage**: Images are stored in `/public/uploads/` directory
- **Database Tracking**: Image metadata is stored in database
- **Admin View**: All uploaded images are visible in admin dashboard

### 7. Removed Make.com Integration
- **Complete Removal**: All make.com webhook calls have been removed
- **Local Database**: All data is now stored locally in SQLite database
- **Real-time Tracking**: Quiz responses are saved immediately to database
- **No External Dependencies**: All data processing happens locally
- **Analytics Preserved**: Meta Pixel and Google Analytics tracking still work

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  sessionId TEXT NOT NULL,
  fingerprint TEXT NOT NULL,
  deviceInfo TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  updatedAt TEXT NOT NULL
)
```

### Quiz Responses Table
```sql
CREATE TABLE quiz_responses (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  questionId TEXT NOT NULL,
  questionTitle TEXT NOT NULL,
  answer TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id)
)
```

### User Images Table
```sql
CREATE TABLE user_images (
  id TEXT PRIMARY KEY,
  userId TEXT NOT NULL,
  imagePath TEXT NOT NULL,
  imageType TEXT NOT NULL,
  createdAt TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users (id)
)
```

## Usage

### For Users
1. Start the quiz normally
2. After 2-3 questions, provide contact information
3. Continue with the quiz - all responses are tracked
4. Upload images when prompted
5. Complete the quiz to see results

### For Admins
1. Visit `/admin` to access the admin dashboard
2. View all user data, quiz responses, and uploaded images
3. See device information and browser fingerprints
4. Export data or view statistics

## Browser Fingerprinting Details

The system generates fingerprints based on:
- User Agent string
- Screen resolution
- Color depth
- Timezone
- Language settings
- Platform information
- Cookie settings
- Do Not Track settings

This creates a unique identifier that persists across sessions while respecting user privacy.

## Security Features

- **Local Storage**: All data is stored locally, no external dependencies
- **Session Management**: Secure session ID generation
- **Input Validation**: All user inputs are validated
- **Error Handling**: Comprehensive error handling throughout
- **Privacy Respect**: Fingerprinting respects user privacy settings

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Access the admin dashboard at `/admin`

## File Structure

```
├── app/
│   ├── admin/page.tsx          # Admin dashboard
│   ├── api/
│   │   ├── admin/data/route.ts # Admin data API
│   │   ├── quiz-response/route.ts # Quiz response API
│   │   ├── upload-image/route.ts # Image upload API
│   │   └── user/route.ts       # User management API
│   └── quiz/page.tsx           # Main quiz page
├── components/
│   └── ContactInfoCollection.tsx # Contact form component
├── lib/
│   ├── database.ts             # Database utilities
│   └── fingerprint.ts          # Browser fingerprinting
└── data/
    └── quiz_database.db        # SQLite database file
``` 