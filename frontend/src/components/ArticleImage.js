import * as React from 'react';

/**
 * Abstraction to compartmentalize the application of the image to the Article card
 * @prop {string[]} images Array of strings representing the url of the image. The array is
 * usually length 2 and the second image is the smaller
 */
export default function ArticleImage({ images }) {
  function parseMultimediaURL(multimediaArray) {
    const imageLength = (multimediaArray === null || multimediaArray.length);
    if (multimediaArray && imageLength > 0) {
      return <img src={multimediaArray[imageLength - 1].url} alt={multimediaArray[0].caption} />;
    }
  }

  return (
    <div className="image-placeholder">
      <div className="inner-image">{parseMultimediaURL(images)}</div>
    </div>
  );
}
