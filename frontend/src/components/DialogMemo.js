/* eslint-disable react/prop-types */
import * as React from 'react';
import { Dialog } from '@material-ui/core';
import ModalSelectionLogin from './ModalSelectionLogin';

function DialogMemo({
  showModal, handleModalClose, transition, modalFacets, state,
}) {
  return (
    <Dialog
      open={showModal}
      onClose={handleModalClose}
      TransitionComponent={transition}
    >
      <ModalSelectionLogin key="modal-selection" modalFacets={modalFacets} message={state ? 'articles' : ''} closeModal={handleModalClose} />
    </Dialog>
  );
}

export default React.memo(DialogMemo);
