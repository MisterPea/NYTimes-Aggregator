import * as React from 'react';

import ArticleImage from './ArticleImage';
import AddCircleIcon from '@material-ui/icons/AddCircle';

const ArticleCard = (({ article, setShowModal, setModalFacets }) => {

  const { title,
    abstract,
    section,
    subsection,
    multimedia,
    url,
    byline,
    des_facet,
    org_facet,
    per_facet,
    geo_facet } = article;

  function uniqueId() {
    return Math.random().toString(36).substring(5);
  }

  function deriveId(imageArray) {
    const imageLength = (imageArray === null || imageArray.length);
    if (imageArray && imageLength > 0) {
      return imageArray[imageLength - 1].url.split(/([\d\w.-]+)/).pop();
    } else {
      return uniqueId();
    }
  }

  const parseURLCallback = React.useCallback((multimediaArray) => {
    const imageLength = (multimediaArray === null || multimediaArray.length);
    if (multimediaArray && imageLength > 0) {
      return <img src={multimediaArray[imageLength - 1].url} alt={multimediaArray[0].caption} />;
    }
  }, []);


  return (
    <li
      className="article-list-item"
      aria-label={`${title} - ${abstract}`}
      key={`${title}-${section}`}
    >
      <section>
        <p className="section-text">{`${section} ${subsection === '' ? '' : `• ${subsection}`}`}</p>
        <div className="main-card-area">
          <div className="image-headline main-card-element">
            <ArticleImage images={multimedia} />
            <header className="article-headline">{title}</header>
          </div>
          <p className="article-abstract main-card-element">{abstract}</p>
        </div>
        <div
          className="modal-button"
          aria-haspopup="true"
        >
          <AddCircleIcon
            style={{ fontSize: 32 }}
            className="add-reading-alert"
            onClick={() => {
              setShowModal((s) => s === false);
              setModalFacets({
                byline,
                des_facet,
                org_facet,
                per_facet,
                geo_facet,
                title,
              });
            }}
          >
            +
          </AddCircleIcon>
        </div>
      </section>
      <div
        className="shadow-holder"
        onClick={() => {
          window.open(url, '_blank');
        }}
      />
    </li >
  );
});

export default React.memo(ArticleCard);
