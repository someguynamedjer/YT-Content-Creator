# API Contracts & Integration Plan

## Overview
This document outlines the API contracts and integration plan for converting the YouTube writing service website from mock data to a fully functional backend.

## Current Mock Data Structure

### Services (Static - No Backend Needed)
- Services data remains static in frontend
- No API required as packages/pricing are fixed

### Portfolio Items (`portfolioItems` array)
```javascript
{
  id: number,
  title: string,
  client: string,
  type: string, // "Video Scripts", "Content Package", etc.
  description: string,
  results: string,
  tags: string[]
}
```

### Testimonials (`testimonials` array)
```javascript
{
  id: number,
  name: string,
  channel: string,
  subscribers: string,
  testimonial: string,
  rating: number
}
```

### Stats (`stats` array)
```javascript
{
  number: string,
  label: string
}
```

### Contact Form Submissions
```javascript
{
  name: string,
  email: string,
  channel: string,
  subscribers: string,
  service: string,
  project: string,
  budget: string,
  message: string
}
```

## Backend API Endpoints

### 1. Portfolio Management
- `GET /api/portfolio` - Get all portfolio items
- `POST /api/portfolio` - Add new portfolio item (admin only)
- `PUT /api/portfolio/:id` - Update portfolio item (admin only)
- `DELETE /api/portfolio/:id` - Delete portfolio item (admin only)

### 2. Testimonials Management
- `GET /api/testimonials` - Get all testimonials
- `POST /api/testimonials` - Add new testimonial (admin only)
- `PUT /api/testimonials/:id` - Update testimonial (admin only)
- `DELETE /api/testimonials/:id` - Delete testimonial (admin only)

### 3. Stats Management
- `GET /api/stats` - Get current stats
- `PUT /api/stats` - Update stats (admin only)

### 4. Contact Form
- `POST /api/contact` - Submit contact form inquiry
- `GET /api/contact` - Get all contact inquiries (admin only)
- `PUT /api/contact/:id/status` - Update inquiry status (admin only)

### 5. Newsletter/Email (Future Enhancement)
- `POST /api/newsletter` - Subscribe to newsletter

## Database Models (MongoDB)

### PortfolioItem Model
```javascript
{
  _id: ObjectId,
  title: String (required),
  client: String (required),
  type: String (required, enum: ['Video Scripts', 'Content Package', 'Channel Copy', 'Lead Magnet', 'Email Marketing', 'Thumbnail Copy']),
  description: String (required),
  results: String (required),
  tags: [String],
  createdAt: Date (default: now),
  updatedAt: Date (default: now),
  isActive: Boolean (default: true)
}
```

### Testimonial Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  channel: String (required),
  subscribers: String (required),
  testimonial: String (required),
  rating: Number (required, min: 1, max: 5),
  createdAt: Date (default: now),
  updatedAt: Date (default: now),
  isActive: Boolean (default: true)
}
```

### Stats Model
```javascript
{
  _id: ObjectId,
  number: String (required),
  label: String (required),
  order: Number (required), // for display order
  updatedAt: Date (default: now)
}
```

### ContactInquiry Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required),
  channel: String,
  subscribers: String,
  service: String (required),
  project: String,
  budget: String,
  message: String (required),
  status: String (enum: ['new', 'contacted', 'in-progress', 'completed', 'closed'], default: 'new'),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

## Frontend Integration Changes

### 1. Replace Mock Data Imports
- Remove imports from `../data/mock.js`
- Implement API calls using axios

### 2. API Service Functions
Create `/app/frontend/src/services/api.js`:
```javascript
// Portfolio API calls
export const getPortfolioItems = () => axios.get('/api/portfolio')
export const getTestimonials = () => axios.get('/api/testimonials')
export const getStats = () => axios.get('/api/stats')
export const submitContactForm = (data) => axios.post('/api/contact', data)
```

### 3. Component Updates Required

**Portfolio.jsx**
- Replace `portfolioItems` import with API call
- Add loading state and error handling
- Implement useEffect to fetch data on mount

**Testimonials.jsx**
- Replace `testimonials` import with API call
- Add loading state and error handling
- Implement useEffect to fetch data on mount

**Hero.jsx**
- Replace `stats` import with API call
- Add loading state and error handling
- Implement useEffect to fetch data on mount

**Contact.jsx**
- Update form submission to call API instead of mock toast
- Add proper error handling and success feedback
- Reset form on successful submission

### 4. Loading & Error States
- Add loading spinners for data fetching
- Implement error boundaries for failed API calls
- Add fallback UI for empty states

## Implementation Priority

### Phase 1: Basic CRUD
1. Set up MongoDB models
2. Implement basic GET endpoints
3. Seed database with current mock data
4. Update frontend to fetch from API

### Phase 2: Contact Form
1. Implement contact form submission
2. Add email notification (future enhancement)
3. Admin panel for viewing inquiries (future enhancement)

### Phase 3: Admin Features (Future)
1. Authentication system
2. Admin dashboard for content management
3. CRUD operations for portfolio and testimonials

## Environment Variables Needed
- `MONGO_URL` (already exists)
- `DB_NAME` (already exists)
- `ADMIN_EMAIL` (for contact form notifications - future)
- `EMAIL_SERVICE_API_KEY` (for email notifications - future)

## Error Handling Strategy
- Backend: Return consistent error format with status codes
- Frontend: Global error handling with user-friendly messages
- Database: Handle connection errors gracefully
- API: Rate limiting and input validation

## Testing Strategy
- Backend: Test all endpoints with sample data
- Frontend: Verify API integration works correctly
- End-to-End: Test complete user flows (form submission, data display)
- Error Cases: Test offline/error scenarios

## Security Considerations
- Input validation on all form fields
- Rate limiting on contact form submissions
- CORS properly configured
- No sensitive data in client-side code
- Future: Authentication for admin features

This contract ensures seamless transition from mock data to fully functional backend while maintaining the same user experience.