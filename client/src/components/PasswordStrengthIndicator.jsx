import React, { useState, useEffect } from 'react';

// We will dynamically import zxcvbn to avoid build issues.

/**
 * A component to display password strength in real-time.
 * It shows a colored progress bar and descriptive text based on the password's score.
 *
 * @param {object} props - The component's props.
 * @param {string} props.password - The password string to evaluate.
 * @returns {JSX.Element | null} The rendered password strength indicator component or null.
 */
const PasswordStrengthIndicator = ({ password }) => {
  const [zxcvbn, setZxcvbn] = useState(null);
  const [testResult, setTestResult] = useState(null);

  // Dynamically import the zxcvbn library when the component mounts.
  // This avoids issues with build tools that don't support direct URL imports.
  useEffect(() => {
    const loadZxcvbn = async () => {
      try {
        const module = await import('https://cdn.skypack.dev/zxcvbn');
        setZxcvbn(() => module.default);
      } catch (e) {
        console.error("Failed to load zxcvbn library", e);
      }
    };
    loadZxcvbn();
  }, []); // The empty dependency array ensures this runs only once.

  // Re-evaluate the password strength whenever the password or the library changes.
  useEffect(() => {
    if (zxcvbn && password) {
      setTestResult(zxcvbn(password));
    } else {
      setTestResult(null);
    }
  }, [password, zxcvbn]);


  // Don't render anything if there's no password or the library hasn't loaded.
  if (!password || !testResult) {
    return null;
  }

  const score = testResult.score;

  /**
   * Returns the label and color configuration based on the password strength score.
   */
  const getStrengthConfig = () => {
    switch (score) {
      case 0:
        return {
          label: 'Very Weak',
          color: 'bg-red-500',
          width: '20%',
          textColor: 'text-red-500'
        };
      case 1:
        return {
          label: 'Weak',
          color: 'bg-orange-500',
          width: '40%',
          textColor: 'text-orange-500'
        };
      case 2:
        return {
          label: 'Fair',
          color: 'bg-yellow-500',
          width: '60%',
          textColor: 'text-yellow-500'
        };
      case 3:
        return {
          label: 'Good',
          color: 'bg-blue-500',
          width: '80%',
          textColor: 'text-blue-500'
        };
      case 4:
        return {
          label: 'Strong',
          color: 'bg-green-500',
          width: '100%',
          textColor: 'text-green-500'
        };
      default:
        return {
          label: '',
          color: 'bg-gray-200',
          width: '0%',
          textColor: 'text-gray-500'
        };
    }
  };

  const { label, color, width, textColor } = getStrengthConfig();
  const feedback = testResult.feedback;

  return (
    <div className="w-full mt-2" aria-live="polite">
      {/* Progress bar container */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        {/* The actual progress bar with dynamic width and color */}
        <div
          className={`h-2.5 rounded-full transition-all duration-300 ease-in-out ${color}`}
          style={{ width: width }}
          role="progressbar"
          aria-valuenow={score}
          aria-valuemin="0"
          aria-valuemax="4"
          aria-valuetext={`Password strength: ${label}`}
        ></div>
      </div>

      {/* Text feedback section */}
      <div className="flex justify-between items-center mt-1">
        <p className={`text-sm font-medium ${textColor}`}>
          {label}
        </p>
        
        {/* Display warning or suggestion from zxcvbn if available */}
        {feedback.warning && (
          <p className="text-xs text-red-500 text-right">{feedback.warning}</p>
        )}
        {!feedback.warning && feedback.suggestions.length > 0 && (
          <p className="text-xs text-gray-500 dark:text-gray-400 text-right">{feedback.suggestions[0]}</p>
        )}
      </div>
    </div>
  );
};

export default PasswordStrengthIndicator;

