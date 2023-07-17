import React, { useState, useEffect, Fragment, useRef } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { nanoid } from 'nanoid';
import ReadOnlyRow from '../../components/ReadOnlyRow';
import EditableRow from '../../components/EditableRow';
import ProductCSS from "../../Style/adminProducts.module.css";

const dropdown = document.getElementById('dropdown')

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    name: '',
    price: '',
    type: '',
  })

  const [editFormData, setEditFormData] = useState({
    name: '',
    price: '',
    type: '',
  })

  const [editProductId, setEditProductId] = useState(null)

  const dropdownRef = useRef(null);

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
        type: addFormData.type,
      }

      const newProducts = [...products, newProduct];
      setProducts(newProducts);
      setAddFormData({ name: '', price: '', type: '' });
    } catch (error) {
      console.error(error);
    }
    dropdownRef.current.value = '';
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
            type: editFormData.type,
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
      type: product.type,
    }

    setEditFormData(formValues);
  }

  const handleCancelClick = () => {
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
    <div className={ProductCSS.adminProdContainer}>
      <div className={ProductCSS.addProdContainer}>
        <h3 className={ProductCSS.title} >Añade un producto</h3>
        <form onSubmit={handleAddFormSubmit}>
          <div className={ProductCSS.formContainer}>
            <input
              type='text'
              name='name'
              required='required'
              placeholder='Ingresa un producto...'
              value={addFormData.name}
              onChange={handleAddFormChange}
            />

            <input
              type='number'
              name='price'
              required='required'
              placeholder='Ingresa un precio...'
              value={addFormData.price}
              onChange={handleAddFormChange}
            />

            <select name='type' onChange={handleAddFormChange} required defaultValue='' ref={dropdownRef}>
              <option value=''>Selecciona el tipo</option>
              <option value='desayuno'>Desayuno</option>
              <option value='almuerzo'>Almuerzo</option>
            </select>

            <button type='submit' className={ProductCSS.btnAdd}>Añadir</button>
          </div>

        </form>
      </div>

      <div className={ProductCSS.tableProdContainer}>
        <form onSubmit={handleEditFormSubmit}>
          <table className={ProductCSS.prodTable}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <caption>Desayuno</caption>
            <tbody>
              {products
                .filter((product) => product.type === 'desayuno')
                .map((product) => (
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

        <form onSubmit={handleEditFormSubmit}>
          <table className={ProductCSS.prodTable}>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <caption>Almuerzo</caption>
            <tbody>
              {products
                .filter((product) => product.type === "almuerzo")
                .map((product) => (
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
      </div>
    </div>
  );
};

export default AdminProducts;
