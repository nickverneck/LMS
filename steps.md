# LMS for AI Courses - Development Steps

This document tracks the progress of the LMS development.

## Core Setup

- [ ] Initialize SvelteKit project (already done)
- [x] Configure Drizzle ORM
- [x] Set up PostgreSQL database
- [x] Implement basic user authentication (registration, login)

## User Management

- [x] Student profile management
- [x] Instructor profile management
- [x] Role-based access control (student/instructor)

### User Dashboard

- [ ] Create user dashboard page
- [ ] Display user-specific information (e.g., enrolled courses, progress)
- [ ] Link to settings and sign out

## Course Management

- [x] Database schema for courses, modules, lessons
- [x] Instructor dashboard for course creation
- [x] Implement collapsible side menu for admin tools with icons
- [x] Integrate course creation into dashboard for instructors and admins
- [x] Implement collapsible sidebar with Flowbite Svelte components
- [x] Adjust dashboard layout based on sidebar collapse state
- [x] Course catalog page
- [x] Course detail page
- [x] Content upload (video, text, code)

## Live Class Delivery

- [x] Live session scheduling functionality
- [x] Integration with video conferencing API (e.g., WebRTC, Zoom, Google Meet)
- [x] Real-time chat within live sessions
- [x] Live session recording and playback

## Progress Tracking & Analytics

- [x] Track student progress through lessons/modules
- [x] Instructor analytics dashboard

## Payment & Enrollment

- [x] Course enrollment flow
- [x] Payment gateway integration (Stripe)
- [x] Order management

## AI Course Specifics

- [x] Integrate interactive coding environments
- [x] Explore AI tool integrations
- [x] Implement project submission/review for capstone projects

## UI/UX & Styling

- [x] Implement responsive design
- [x] Apply consistent styling (e.g., Tailwind CSS)
- [x] Design intuitive navigation

## Deployment

- [x] Set up deployment for SvelteKit frontend/API
- [x] Configure database hosting
- [x] Set up media storage
