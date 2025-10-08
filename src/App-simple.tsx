import React from 'react';

function App() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ color: '#2f6fed' }}>🎉 Y0ussef Portfolio - React.js</h1>
      <p>Portfolio تم تحويله بنجاح إلى React.js!</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>✅ المميزات المكتملة:</h2>
        <ul>
          <li>⚛️ React.js + TypeScript</li>
          <li>💅 Styled Components</li>
          <li>🌓 Dark/Light Theme</li>
          <li>🌍 English/Arabic Support</li>
          <li>📱 Responsive Design</li>
        </ul>
      </div>

      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f9ff', borderRadius: '8px' }}>
        <h3>🚀 الخطوات التالية:</h3>
        <p>1. اختبار جميع المكونات</p>
        <p>2. إضافة المحتوى الشخصي</p>
        <p>3. تحسين الأداء</p>
        <p>4. النشر على GitHub Pages</p>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <button 
          style={{
            padding: '0.75rem 2rem',
            backgroundColor: '#2f6fed',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
          onClick={() => alert('Portfolio React.js يعمل بنجاح! 🎉')}
        >
          اختبار التفاعل
        </button>
      </div>
    </div>
  );
}

export default App;
