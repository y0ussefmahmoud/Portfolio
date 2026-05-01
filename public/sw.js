/**
 * Service Worker for PWA capabilities
 * 
 * Provides offline functionality, caching, and background sync
 * Enhances performance and user experience
 */

const CACHE_NAME = 'y0ussef-portfolio-v3.0.6';
const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/favicon-16.png',
  '/images/favicon-32.png',
  '/images/apple-touch-icon.png',
  '/images/hero-800x1000.webp',
  // Critical CSS and JS files will be cached dynamically
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Failed to cache static assets', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (except fonts and images)
  if (url.origin !== self.location.origin && 
      !url.href.includes('fonts.googleapis.com') && 
      !url.href.includes('fonts.gstatic.com')) {
    return;
  }
  
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          // For HTML files, try network first to get fresh content
          if (request.destination === 'document') {
            return fetch(request)
              .then((networkResponse) => {
                // Cache the fresh response
                if (networkResponse.ok) {
                  const responseClone = networkResponse.clone();
                  caches.open(DYNAMIC_CACHE)
                    .then((cache) => cache.put(request, responseClone));
                }
                return networkResponse;
              })
              .catch(() => {
                // Network failed, return cached version
                return cachedResponse;
              });
          }
          
          return cachedResponse;
        }
        
        // Not in cache, try network
        return fetch(request)
          .then((networkResponse) => {
            // Check if response is valid
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // Clone the response since it can only be consumed once
            const responseClone = networkResponse.clone();
            
            // Cache the response
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                // Don't cache large files or API responses
                if (shouldCache(request, networkResponse)) {
                  cache.put(request, responseClone);
                }
              });
            
            return networkResponse;
          })
          .catch(() => {
            // Network failed, try to serve offline page
            if (request.destination === 'document') {
              return caches.match('/index.html');
            }
            
            // Return a basic offline response for images
            if (request.destination === 'image') {
              return new Response(
                '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#6b7280">Image unavailable</text></svg>',
                { headers: { 'Content-Type': 'image/svg+xml' } }
              );
            }
          });
      })
  );
});

// Helper function to determine if a request should be cached
function shouldCache(request, response) {
  const url = new URL(request.url);
  const contentType = response.headers.get('content-type') || '';
  
  // Don't cache large files
  if (response.headers.get('content-length') > 1024 * 1024) { // 1MB
    return false;
  }
  
  // Cache images, CSS, JS, fonts
  if (contentType.includes('image/') || 
      contentType.includes('text/css') || 
      contentType.includes('application/javascript') ||
      contentType.includes('font/')) {
    return true;
  }
  
  // Cache local assets
  if (url.origin === self.location.origin) {
    return true;
  }
  
  return false;
}
