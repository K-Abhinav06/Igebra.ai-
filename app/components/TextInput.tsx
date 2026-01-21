'use client';

import React from 'react';

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ containerClassName, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        style={{
          color: 'black',
          WebkitTextFillColor: 'black',
          backgroundColor: 'white',
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
        }}
        className={containerClassName || props.className}
      />
    );
  }
);

TextInput.displayName = 'TextInput';
