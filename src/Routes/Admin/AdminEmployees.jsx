import React from 'react'
import ApiAdminUser  from '../../Utilities/ApiAdminUser';
import Header from "../../components/Header";
import TopBarAdmin from '../../components/topBarAdmin';
import { useState } from 'react';

const AdminEmployees = ({ products, type }) => {
  const [editableProducts, setEditableProducts] = useState(products);

  const handleEdit = (productId, fieldName, newValue) => {
    const updatedProducts = editableProducts.map((product) => {
      if (product.id === productId) {
        return {
          ...product,
          [fieldName]: newValue,
        };
      }
      return product;
    });
    setEditableProducts(updatedProducts);
  };

  const handleUpdate = () => {
    // Perform the update logic here using the updated products
    // For example, you can make an API call to update the table data
    console.log('Updated products:', editableProducts);
  };

  const renderTableRows = (data) => {
    return data.map((product) => (
      <tr key={product.id}>
        <td>
          <input
            type="text"
            value={product.name}
            onChange={(e) => handleEdit(product.id, 'name', e.target.value)}
          />
        </td>
        <td>
          <input
            type="text"
            value={product.price}
            onChange={(e) => handleEdit(product.id, 'price', e.target.value)}
          />
        </td>
      </tr>
    ));
  };

  return (
    <>

     adminEmployees
     <Header />
     <TopBarAdmin/>
    <ApiAdminUser/>
    </>
  )
}
      {type === 'desayunoEdit' && (
        <tbody>
          {renderTableRows(editableProducts)}
        </tbody>
      )}
      {type === 'desayunoEdit' && (
        <tfoot>
          <tr>
            <td colSpan="2">
              <button onClick={handleUpdate}>Update</button>
            </td>
          </tr>
        </tfoot>
      )}
    </>
  );
};

export default AdminEmployees;