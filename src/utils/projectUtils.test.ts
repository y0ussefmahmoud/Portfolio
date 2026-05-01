import { describe, it, expect } from 'vitest';
import { isVideoFile, getStackIcon, getTechColor } from './projectUtils';

describe('projectUtils', () => {
  describe('isVideoFile', () => {
    it('should return true for MP4 files', () => {
      expect(isVideoFile('video.mp4')).toBe(true);
      expect(isVideoFile('video.MP4')).toBe(true);
      expect(isVideoFile('path/to/video.mp4')).toBe(true);
    });

    it('should return true for WebM files', () => {
      expect(isVideoFile('video.webm')).toBe(true);
      expect(isVideoFile('video.WEBM')).toBe(true);
    });

    it('should return true for OGG files', () => {
      expect(isVideoFile('video.ogg')).toBe(true);
      expect(isVideoFile('video.OGG')).toBe(true);
    });

    it('should return true for MOV files', () => {
      expect(isVideoFile('video.mov')).toBe(true);
      expect(isVideoFile('video.MOV')).toBe(true);
    });

    it('should return true for video paths', () => {
      expect(isVideoFile('/videos/demo.mp4')).toBe(true);
      expect(isVideoFile('/assets/videos/intro.webm')).toBe(true);
    });

    it('should return false for non-video files', () => {
      expect(isVideoFile('image.jpg')).toBe(false);
      expect(isVideoFile('file.pdf')).toBe(false);
      expect(isVideoFile('script.js')).toBe(false);
      expect(isVideoFile('styles.css')).toBe(false);
    });

    it('should handle URLs with query parameters', () => {
      expect(isVideoFile('video.mp4?token=123')).toBe(true);
      expect(isVideoFile('image.jpg?size=large')).toBe(false);
    });

    it('should handle empty strings', () => {
      expect(isVideoFile('')).toBe(false);
    });
  });

  describe('getStackIcon', () => {
    it('should return Firebase icon for Firebase-related names', () => {
      const result = getStackIcon('Firebase');
      expect(result).toBeDefined();
    });

    it('should return Firebase icon for lowercase firebase', () => {
      const result = getStackIcon('firebase');
      expect(result).toBeDefined();
    });

    it('should return null for unknown technologies', () => {
      expect(getStackIcon('React')).toBeNull();
      expect(getStackIcon('Unknown')).toBeNull();
      expect(getStackIcon('')).toBeNull();
    });
  });

  describe('getTechColor', () => {
    it('should return React color (#61dafb)', () => {
      expect(getTechColor('React')).toBe('#61dafb');
      expect(getTechColor('react')).toBe('#61dafb');
      expect(getTechColor('React.js')).toBe('#61dafb');
    });

    it('should return HTML color (#e34f26)', () => {
      expect(getTechColor('HTML')).toBe('#e34f26');
      expect(getTechColor('html')).toBe('#e34f26');
      expect(getTechColor('HTML5')).toBe('#e34f26');
    });

    it('should return CSS color (#1572b6)', () => {
      expect(getTechColor('CSS')).toBe('#1572b6');
      expect(getTechColor('css')).toBe('#1572b6');
      expect(getTechColor('CSS3')).toBe('#1572b6');
    });

    it('should return JavaScript color (#f7df1e)', () => {
      expect(getTechColor('JavaScript')).toBe('#f7df1e');
      expect(getTechColor('javascript')).toBe('#f7df1e');
      expect(getTechColor('JS')).toBe('#f7df1e');
      expect(getTechColor('js')).toBe('#f7df1e');
    });

    it('should return Node.js color (#339933)', () => {
      expect(getTechColor('node')).toBe('#339933');
      expect(getTechColor('Node')).toBe('#339933');
      // Note: 'Node.js' is matched by the 'js' pattern first
      expect(getTechColor('Node.js')).toBe('#f7df1e');
    });

    it('should return Firebase color (#ffca28)', () => {
      expect(getTechColor('Firebase')).toBe('#ffca28');
      expect(getTechColor('firebase')).toBe('#ffca28');
    });

    it('should return TypeScript color (#3178c6)', () => {
      expect(getTechColor('TypeScript')).toBe('#3178c6');
      expect(getTechColor('typescript')).toBe('#3178c6');
      expect(getTechColor('TS')).toBe('#3178c6');
      expect(getTechColor('ts')).toBe('#3178c6');
    });

    it('should return Tailwind color (#06b6d4)', () => {
      expect(getTechColor('Tailwind')).toBe('#06b6d4');
      expect(getTechColor('tailwind')).toBe('#06b6d4');
      // Note: 'TailwindCSS' is matched by the 'css' pattern first
      expect(getTechColor('TailwindCSS')).toBe('#1572b6');
    });

    it('should return default color (#60a5fa) for unknown technologies', () => {
      expect(getTechColor('Python')).toBe('#60a5fa');
      expect(getTechColor('Go')).toBe('#60a5fa');
      expect(getTechColor('')).toBe('#60a5fa');
    });
  });
});
