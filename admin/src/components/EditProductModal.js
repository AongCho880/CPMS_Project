// EditProductModal.js

import React from "react";
import { Modal, Button } from 'react-bootstrap';

const EditProductModal = ({ selectedProduct, setSelectedProduct, saveEditedProduct }) => {
  if (!selectedProduct) {
    return null; // Return null if selectedProduct is null
  }

  return (
    <Modal show={true} onHide={() => setSelectedProduct(null)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">Product Name</label>
            <input type="text" className="form-control" value={selectedProduct.p_name || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, p_name: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Retail Price</label>
            <input type="number" step="0.01" className="form-control" value={selectedProduct.r_price || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, r_price: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Wholesale Price</label>
            <input type="number" step="0.01" className="form-control" value={selectedProduct.w_price || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, w_price: e.target.value })} />
          </div>
          <div className="mb-3">
            <label className="form-label">Product Category</label>
            <input type="text" className="form-control" value={selectedProduct.p_category || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, p_category: e.target.value })} />
          </div>

          {/* <div className="mb-3">
            <label className="form-label">Product Image</label>
            <input type="text" className="form-control" value={selectedProduct.image || ''} onChange={(e) => setSelectedProduct({ ...selectedProduct, image: e.target.value })} />
          </div> */}
          
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setSelectedProduct(null)}>Close</Button>
        <Button variant="primary" onClick={() => saveEditedProduct(selectedProduct)}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProductModal;
