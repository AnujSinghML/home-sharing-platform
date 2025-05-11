# Home Sharing Platform

A full-stack web application for listing and booking homes, built with Next.js, Node.js, and MongoDB. This platform allows users to list their properties, search for available homes, and manage bookings seamlessly.

## 🌟 Features

### Authentication & Security
- Secure user registration and login system using NextAuth.js
- Password encryption with bcrypt
- Protected routes and API endpoints
- Session management and JWT tokens

### Home Listings
- Create and manage property listings with detailed information
- Upload multiple property images using Cloudinary
- Set availability dates and pricing
- Add property details (bedrooms, bathrooms, amenities)

### Search & Discovery
- Advanced search with multiple filters:
  - Location-based search
  - Date availability
  - Number of guests
  - Property type

### Booking System
- Real-time availability checking
- Date selection with calendar interface
- Booking management for hosts and guests
- Booking status tracking (pending, confirmed, cancelled)

### User Dashboard
- Host Dashboard:
  - Manage property listings
  - View and respond to booking requests
  - Track earnings and occupancy
  - Update listing details and availability
- Guest Dashboard:
  - View booking history
  - Manage upcoming stays
  - Save favorite listings
  - Update profile and preferences

### Responsive Design
- Mobile-first approach
- Optimized for all screen sizes
- Touch-friendly interface
- Fast loading and smooth transitions

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Form Handling**: React Hook Form
- **Date Handling**: date-fns


### Backend
- **Runtime**: Node.js
- **API Routes**: Next.js API Routes
- **Database**: MongoDB Atlas
- **ORM**: Mongoose
- **Authentication**: NextAuth.js
- **File Storage**: Cloudinary

## 🚀 Getting Started

### Prerequisites
- Node.js 16.8 or later
- MongoDB Atlas account
- Cloudinary account
- Google Maps API key (optional)

### Environment Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd home-sharing-platform
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Setting Up Your Own Environment Variables

For security reasons, the `.env` file is not included in the repository. To run the project:

1. Create a MongoDB Atlas account and get your connection string
2. Generate a random string for NEXTAUTH_SECRET (you can use `openssl rand -base64 32`)
3. Create a Cloudinary account and get your credentials
4. (Optional) Get a Google Maps API key

## 📁 Project Structure

```
home-sharing-platform/
├── app/
│   ├── api/              # API routes
│   │   ├── auth/         # Authentication endpoints
│   │   ├── bookings/     # Booking management
│   │   ├── listings/     # Listing management
│   │   └── upload/       # Image upload
│   ├── (auth)/           # Authentication pages
│   │   ├── login/        # Login page
│   │   └── register/     # Registration page
│   ├── dashboard/        # User dashboard
│   ├── listings/         # Listing pages
│   ├── search/           # Search page
│   └── page.js           # Homepage
├── components/           # React components
│   ├── layout/          # Layout components
│   ├── ui/              # UI components
│   └── forms/           # Form components
├── lib/                 # Utility functions
├── models/              # Mongoose models
└── public/              # Static files
```

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- Input validation and sanitization
- Rate limiting on API routes
- Secure file upload handling
- Environment variable protection

## 🎨 UI/UX Features

- Clean and modern design
- Responsive layout for all devices
- Loading states and animations
- Error handling and user feedback
- Intuitive navigation
- Accessible components
- Dark mode support

## 📱 Mobile Responsiveness

- Mobile-first design approach
- Touch-friendly interfaces
- Optimized images and assets
- Responsive typography
- Flexible grid layouts
- Adaptive navigation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


##  Acknowledgments

- Next.js team for the amazing framework
- MongoDB Atlas for the database service
- Cloudinary for image management
- All contributors and supporters
