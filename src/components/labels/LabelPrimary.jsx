import React from 'react';

const LabelPrimary = ({ title, children, ...props }) => {
  return (
    <label className='form-control w-full max-w-xs' {...props}>
      {title && <div className='label'>
        <span className="label-text">{title}</span>
      </div>}
      {children}
    </label>
  );
};

export default LabelPrimary;