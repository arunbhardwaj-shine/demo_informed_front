import imageResize from 'image-resize';

const optimizeImage = async (file,config) => {
  try {
    if (!file) throw new Error("No file selected");
    const result = await imageResize(file, {
      format: 'png', 
      width: config.width,
      outputType: 'blob' 
    });

    const optimizedFile = new File([result], file.name, { type: 'image/png' }); 
    return optimizedFile;
  } catch (error) {
    console.error("Error optimizing image:", error);
    return null;
  }
};

export default optimizeImage;
