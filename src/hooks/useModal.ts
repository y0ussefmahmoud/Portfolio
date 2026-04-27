/**
 * useModal Hook
 * 
 * Custom hook for managing modal states.
 * Handles opening and closing of different modals.
 * 
 * @hook
 */

import { useState, useCallback } from 'react';
import { ProjectData, ContributorData } from '../types';

interface UseModalReturn {
  isContactModalOpen: boolean;
  isCVModalOpen: boolean;
  selectedProject: ProjectData | null;
  selectedContributor: ContributorData | null;
  openContactModal: () => void;
  closeContactModal: () => void;
  openCVModal: () => void;
  closeCVModal: () => void;
  handleProjectClick: (project: ProjectData) => void;
  handleContributorClick: (contributor: ContributorData) => void;
  setSelectedProject: (project: ProjectData | null) => void;
  setSelectedContributor: (contributor: ContributorData | null) => void;
}

/**
 * Custom hook for modal management
 * @returns Modal state and handlers
 */
export const useModal = (): UseModalReturn => {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedContributor, setSelectedContributor] = useState<ContributorData | null>(null);

  /**
   * Open contact modal
   */
  const openContactModal = useCallback(() => setIsContactModalOpen(true), []);

  /**
   * Close contact modal
   */
  const closeContactModal = useCallback(() => setIsContactModalOpen(false), []);

  /**
   * Open CV modal
   */
  const openCVModal = useCallback(() => setIsCVModalOpen(true), []);

  /**
   * Close CV modal
   */
  const closeCVModal = useCallback(() => setIsCVModalOpen(false), []);

  /**
   * Handle project click
   * Opens project modal with selected project details
   * @param project - The project to display
   */
  const handleProjectClick = useCallback((project: ProjectData) => {
    setSelectedProject(project);
  }, []);

  /**
   * Handle contributor click
   * Opens contributor modal with selected contributor details
   * @param contributor - The contributor to display
   */
  const handleContributorClick = useCallback((contributor: ContributorData) => {
    setSelectedContributor(contributor);
  }, []);

  return {
    isContactModalOpen,
    isCVModalOpen,
    selectedProject,
    selectedContributor,
    openContactModal,
    closeContactModal,
    openCVModal,
    closeCVModal,
    handleProjectClick,
    handleContributorClick,
    setSelectedProject,
    setSelectedContributor,
  };
};
