'use client';

import React from 'react';

const Colors = [
  'bg-red-500',
  'bg-blue-500',
  'bg-green-500',
  'bg-yellow-500',
];


interface ButtonProps {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  number?: number;
  // Add a color property to the ButtonProps interface
  color?: number;
}
/**
 * Button component renders a clickable button element.
 *
 * @param {function} onClick - Function to be called when the button is clicked.
 * @param {string} label - Text to be displayed inside the button.
 * @param {boolean} [disabled=false] - Boolean to indicate if the button is disabled.
 * @param {number} number - A number associated with the button.
 *
 * @returns {JSX.Element} The rendered button component.
 */
const Button: React.FC<ButtonProps> = ({ onClick, label, disabled = false, number, color}) => {
  return (
    <button onClick={onClick} disabled={disabled} className={`flex flex-col px-4 py-2 ${Colors[color || 0]} text-white rounded-md mb-4 mx-2`}
    number={number}>
      {label} {/** This only renders the text in the element  */}
    </button>
  );
};

export default Button;

// void integer AddNumber(Integer int_a, String int_b) {
//   return int_a.
// };
