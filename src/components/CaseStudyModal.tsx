import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { ResilientImage } from './InteractiveMotion';

export interface PortfolioProject {
  id: string;
  category: 'mobile' | 'dashboards' | 'websites' | 'video';
  categoryLabel: string;
  metric: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  challenge: string;
  solution: string;
  outcome: string;
  serviceFocus: string;
  isVideo?: boolean;
}

interface CaseStudyModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onRequestSimilar: (serviceFocus: string) => void;
}

export function CaseStudyModal({
  project,
  onClose,
  onRequestSimilar,
}: CaseStudyModalProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-navy-ink/50 p-4 md:p-6 backdrop-blur-[2px]"
        >
          <motion.div
            initial={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 0, y: 14, scale: 0.98 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 10, scale: 0.98 }
            }
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md md:max-w-2xl rounded-xl bg-light-surface-container-lowest border border-light-outline-variant shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 md:px-7 md:py-5 border-b border-light-outline-variant shrink-0">
              <span className="font-body text-label-md text-light-primary">
                {project.categoryLabel}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                className="w-8 h-8 md:w-9 md:h-9 rounded-full border border-light-outline-variant flex items-center justify-center text-light-on-surface transition-colors hover:border-light-primary hover:text-light-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
              >
                <X className="w-[18px] h-[18px]" aria-hidden="true" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 md:p-7 flex flex-col gap-4 md:gap-5 overflow-y-auto">
              <h3
                id="modal-title"
                className="font-headline text-title-lg md:text-headline-md text-light-on-surface"
              >
                {project.title}
              </h3>

              <div className="aspect-[4/3] md:aspect-[16/9] w-full rounded-lg overflow-hidden bg-light-surface-container-low">
                <ResilientImage
                  src={project.image}
                  alt={project.imageAlt}
                  fallbackLabel={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
                <div className="p-3 md:p-4 rounded-lg bg-light-surface-container-low">
                  <span className="font-body text-label-sm text-light-primary block mb-0.5 md:mb-1 uppercase">
                    Challenge
                  </span>
                  <p className="font-body text-body-md text-light-on-surface-variant">
                    {project.challenge}
                  </p>
                </div>

                <div className="p-3 md:p-4 rounded-lg bg-light-surface-container-low">
                  <span className="font-body text-label-sm text-light-primary block mb-0.5 md:mb-1 uppercase">
                    Solution
                  </span>
                  <p className="font-body text-body-md text-light-on-surface-variant">
                    {project.solution}
                  </p>
                </div>

                <div className="p-3 md:p-4 rounded-lg bg-light-primary-container">
                  <span className="font-body text-label-sm text-light-on-primary-container block mb-0.5 md:mb-1 uppercase">
                    Outcome
                  </span>
                  <p className="font-headline text-title-md text-light-on-primary-container">
                    {project.outcome}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-1 md:pt-2">
                <a
                  href="#contact"
                  onClick={() => {
                    onRequestSimilar(project.serviceFocus);
                    onClose();
                  }}
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-light-primary text-light-on-primary px-5 py-3 md:px-6 font-body text-label-lg transition-transform duration-150 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-primary"
                >
                  <span>Request a similar project</span>
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
