/**
 * useModal Hook Tests
 * 
 * Unit tests for the useModal custom hook
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useModal } from '../useModal';
import { ProjectData, ContributorData } from '../../types';

describe('useModal', () => {
  beforeEach(() => {
    // Reset any state before each test
  });

  it('should initialize with all modals closed', () => {
    const { result } = renderHook(() => useModal());
    
    expect(result.current.isContactModalOpen).toBe(false);
    expect(result.current.isCVModalOpen).toBe(false);
    expect(result.current.selectedProject).toBe(null);
    expect(result.current.selectedContributor).toBe(null);
  });

  it('should open contact modal', () => {
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.openContactModal();
    });
    
    expect(result.current.isContactModalOpen).toBe(true);
  });

  it('should close contact modal', () => {
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.openContactModal();
    });
    
    expect(result.current.isContactModalOpen).toBe(true);
    
    act(() => {
      result.current.closeContactModal();
    });
    
    expect(result.current.isContactModalOpen).toBe(false);
  });

  it('should open CV modal', () => {
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.openCVModal();
    });
    
    expect(result.current.isCVModalOpen).toBe(true);
  });

  it('should close CV modal', () => {
    const { result } = renderHook(() => useModal());
    
    act(() => {
      result.current.openCVModal();
    });
    
    expect(result.current.isCVModalOpen).toBe(true);
    
    act(() => {
      result.current.closeCVModal();
    });
    
    expect(result.current.isCVModalOpen).toBe(false);
  });

  it('should handle project click and set selected project', () => {
    const { result } = renderHook(() => useModal());
    
    const mockProject: ProjectData = {
      id: '1',
      name: 'Test Project',
      title: 'Test Project',
      description: 'Test Description',
      images: ['/test.jpg'],
      tags: [{ name: 'React', color: '#61dafb' }],
      repoLink: '',
      liveLink: '',
      contributors: []
    };
    
    act(() => {
      result.current.handleProjectClick(mockProject);
    });
    
    expect(result.current.selectedProject).toEqual(mockProject);
  });

  it('should handle contributor click and set selected contributor', () => {
    const { result } = renderHook(() => useModal());
    
    const mockContributor: ContributorData = {
      id: '1',
      name: 'Test Contributor',
      role: 'Developer',
      image: '/contributor.jpg',
      socials: {
        github: 'https://github.com/test',
        linkedin: 'https://linkedin.com/test'
      }
    };
    
    act(() => {
      result.current.handleContributorClick(mockContributor);
    });
    
    expect(result.current.selectedContributor).toEqual(mockContributor);
  });
});
