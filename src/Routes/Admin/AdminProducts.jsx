// HOLAX
import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { nanoid } from 'nanoid';
import ReadOnlyRow from '../../components/ReadOnlyRow';
import EditableRow from '../../components/EditableRow';
import Header from "../../components/Header";
import TopBarAdmin from '../../components/topBarAdmin';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: '',
    price: '',
  })

  const [editFormData, setEditFormData] = useState({
    name: '',
    price: '',
  })

  const [editProductId, setEditProductId] = useState(null)

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue

    setAddFormData(newFormData);
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/products', addFormData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });

      const newProduct = {
        id: response.data.id,
        name: addFormData.name,
        price: addFormData.price,
      }

      const newProducts = [...products, newProduct];
      setProducts(newProducts);
      setAddFormData({ name: '', price: '' });
    } catch (error) {
      console.error(error);
    }
  }

  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8080/products/${editProductId}`, editFormData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
  
      const newProducts = products.map((product) => {
        if (product.id === editProductId) {
          return {
            id: product.id,
            name: editFormData.name,
            price: editFormData.price,
          };
        }
        return product;
      });
  
      setProducts(newProducts);
      setEditProductId(null);
    } catch (error) {
      console.error(error);
    }
  }
  

  const handleEditClick = (event, product) => {
    event.preventDefault();
    setEditProductId(product.id)

    const formValues = {
      name: product.name,
      price: product.price,
    }

    setEditFormData(formValues);
  }

  const handleCancelClick = () =>{
    setEditProductId(null)
  }

  const handleDeleteClick = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/products/${productId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
      });
  
      const newProducts = products.filter((product) => product.id !== productId);
      setProducts(newProducts);
    } catch (error) {
      console.error(error);
    }
  }  

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/products', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        });
        const products = response.data;
        setProducts(products);
      } catch (error) {
        console.error(error);
        setProducts([]);
      }
    };

    getData();
  }, []);

  return (
    <>
    <Header />
    <TopBarAdmin/>
    <div className='adminContainer'>
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <Fragment key={product.id}>
                {editProductId === product.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    product={product}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add a product</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type='text'
          name='name'
          required='required'
          placeholder='Enter a product...'
          value={addFormData.name}
          onChange={handleAddFormChange}
        />
        <input
          type='number'
          name='price'
          required='required'
          placeholder='Enter a price...'
          value={addFormData.price}
          onChange={handleAddFormChange}
        />
        <button type='submit'>ADD</button>
      </form>
    </div>
    </>
  );
};

export default AdminProducts;
