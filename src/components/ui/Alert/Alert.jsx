import PropTypes from 'prop-types';

import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircleIcon, ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline';

const VARIANT_STYLES = {
  success: {
    container: 'border-success/20 bg-success/10 backdrop-blur-xs',
    text: 'text-success',
    textSecondary: 'text-success/80',
    icon: CheckCircleIcon,
  },
  error: {
    container: 'border-error/20 bg-error/10 backdrop-blur-xs',
    text: 'text-error',
    textSecondary: 'text-error/80',
    icon: ExclamationTriangleIcon,
  },
};

export default function Alert({
  isOpen,
  onClose,
  variant = 'success',
  title,
  message,
  role = 'alertdialog',
  ariaLive = 'polite',
}) {
  const styles = VARIANT_STYLES[variant];
  const Icon = styles.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-500 bg-black/75"
            onClick={onClose}
            aria-hidden="true"
          />

          <div className="fixed inset-0 z-1000 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 0 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className={clsx('relative rounded-md border p-5 sm:p-6', styles.container)}
              role={role}
              aria-live={ariaLive}
              aria-modal="true"
              aria-labelledby="dialog-title"
              aria-describedby={message ? 'dialog-description' : undefined}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                className={clsx(
                  'absolute top-2 right-2',
                  styles.text,
                  'transition-opacity hover:opacity-70',
                  variant === 'success' ? 'focus-visible:ring-success' : 'focus-visible:ring-error'
                )}
                aria-label="Close dialog"
              >
                <XMarkIcon className="h-3.5 w-3.5" />
              </button>

              <div className="sm:gap-sm flex flex-col items-center justify-center gap-3">
                <Icon
                  className={clsx('h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6', styles.text)}
                  strokeWidth={1}
                  aria-hidden="true"
                />
                <div className="flex flex-1 flex-col items-center">
                  <p id="dialog-title" className={clsx('text-lead text-center', styles.text)}>
                    {title}
                  </p>
                  {message && (
                    <p
                      id="dialog-description"
                      className={clsx('mt-1 w-[30ch] text-center text-xs', styles.textSecondary)}
                    >
                      {message}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

Alert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  variant: PropTypes.oneOf(['success', 'error']).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
  role: PropTypes.string,
  ariaLive: PropTypes.oneOf(['polite', 'assertive', 'off']),
};
