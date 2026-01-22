'use client';

import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ containerClassName, ...props }, ref) => {
    return (
      <>
        <style>{`
          input[data-text-input] {
            color: #000000 !important;
            -webkit-text-fill-color: #000000 !important;
          }
          input[data-text-input]::placeholder {
            color: #9ca3af !important;
            -webkit-text-fill-color: #9ca3af !important;
          }
          input[data-text-input]:-webkit-autofill,
          input[data-text-input]:-webkit-autofill:hover,
          input[data-text-input]:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 1000px white inset !important;
            -webkit-text-fill-color: #000000 !important;
          }
        `}</style>
        <input
          ref={ref}
          {...props}
          data-text-input
          style={{
            color: '#000000',
            WebkitTextFillColor: '#000000',
            backgroundColor: '#ffffff',
            fontSize: '16px',
            fontFamily: 'inherit',
            borderWidth: '1px',
            borderColor: '#e5e7eb',
            padding: '8px 16px',
            borderRadius: '8px',
            width: '100%',
            boxSizing: 'border-box',
            outline: 'none',
            ...props.style,
          } as React.CSSProperties}
          className={containerClassName || props.className}
        />
      </>
    );
  }
);

TextInput.displayName = 'TextInput';
