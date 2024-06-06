import React from 'react';

const ImageGenerator = (props) => {


  if (!props.image) return (
    <p className='text-center p-4'>
Upload an image to get started
    </p>
  )

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // Ajoute le padding
        padding: `${props.settings.padding}px`,
      }}
    >
      <img
        src={props.image.src}
        style={{
          // Ajoute le border-radius et le boxShadow
          boxShadow: `0 0 ${props.settings.shadow}px rgba(0,0,0,.${props.settings.shadow})`,
          borderRadius: `${props.settings.radius}px`,
          display: "flex",
        }}
      />
    </div>
  );
};

export default ImageGenerator;