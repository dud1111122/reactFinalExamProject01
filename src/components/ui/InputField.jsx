import React from 'react';

const InputField = ({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  disabled = false,
  className = '',
  icon,
  ...props
}) => {
  return (
    <div className={`relative ${className}`}>
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 z-10">
            <img src={icon} alt="search icon" className="w-[39px] h-[39px]" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full h-[51px] px-4 ${icon ? 'pl-14' : 'pl-4'} py-3 border border-[#6f6f6f] rounded-[19px] bg-white text-[15px] font-inter font-normal leading-[25px] text-[#6f6f6f] placeholder-[#6f6f6f] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed`}
          {...props}
        />
      </div>
    </div>
  );
};

export default InputField;