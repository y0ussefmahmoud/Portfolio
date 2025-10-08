import React from 'react';

const ImageTest: React.FC = () => {
  const images = [
    '/images/My-Portfolio-1200x675.webp',
    '/images/node-api-1200x675.webp',
    '/images/admin-dashboard-1200x675.webp',
    '/images/Y0-Hardware-1200x675.webp',
    '/images/flutter-app-1200x675.webp',
    '/images/ai-assistant-1200x675.webp',
    '/images/hero-800x1000.webp'
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Image Test</h2>
      {images.map((src, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <p>Image {index + 1}: {src}</p>
          <img 
            src={src} 
            alt={`Test ${index + 1}`}
            style={{ width: '200px', height: '120px', objectFit: 'cover', border: '1px solid #ccc' }}
            onLoad={() => console.log(`✅ Loaded: ${src}`)}
            onError={() => console.log(`❌ Failed: ${src}`)}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageTest;
