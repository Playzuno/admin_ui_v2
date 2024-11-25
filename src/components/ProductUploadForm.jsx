import React, { useState } from 'react';
import '/src/assets/scss/components/product_upload.scss';

const ProductUploadForm = ({ onCancel, onSubmit }) => {
  const [category, setCategory] = useState(1);
  const [menu, setMenu] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(category, menu);
  };

  const categories = [
    { name: 'Category 1', id: 1 },
    { name: 'Category 2', id: 2 },
    { name: 'Category 3', id: 3 },
    { name: 'Category 4', id: 4 },
    { name: 'Category 5', id: 5 },
  ];

  return (
    <div className="product-upload-form">
      <h1>Upload Brand/Product Details</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category" className="mr-2">
            Category
          </label>
          <div className="select-wrapper">
            <select
              id="category"
              value={category}
              onChange={e => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <div className="d-flex">
            <label htmlFor="menu" className="mr-2" style={{ width: '130px' }}>
              Menu
            </label>
            <input
              type="text"
              id="menu"
              value={menu}
              onChange={e => setMenu(e.target.value)}
              placeholder="Enter the Menu"
              required
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductUploadForm;
