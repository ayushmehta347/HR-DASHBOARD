Features
•	 Authentication (Signup/Login):
Handled via Context API and stored in localStorage. Prevents duplicate signups and handles login validation.
•	 User Context (Global State Management):
Centralized user data fetched from users.json using Context API, accessible across all components.
•	 Custom Hook – useDelayedLoading:
Created to simulate or handle delayed loading behavior (for UX polish or async fetch fallback).
•	Theme Toggle (Dark/Light):
Uses localStorage to persist user theme preference. Includes preload script to avoid flicker during routing.
•	 User Listing with Filtering & Search:
Dynamically filters users by department and searches by name.
•	 Bookmark Manager:
Bookmark favorite employees and persist them via localStorage.
•	 Dynamic User Detail Pages:
Each user has a detailed view routed via user/[id].
