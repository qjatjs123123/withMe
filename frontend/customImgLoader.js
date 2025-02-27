const customImgLoader = ({ src, width, quality }) => {
  return `https://hong-410567123.imgix.net${src}?w=${width}&q=${quality || 75}&fm=webp`;
};

export default customImgLoader;