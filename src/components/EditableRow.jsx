import React from 'react'
import ProductCSS from "../Style/adminProducts.module.css";

const EditableRow = ({ editFormData, handleEditFormChange, handleCancelClick }) => {
    return (
        <tr>
            <td>
                <input
                    type='text'
                    required='required'
                    placeholder='Ingresa un nombre...'
                    name='name'
                    value={editFormData.name}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td> 
                <input
                    type='number'
                    required='required'
                    placeholder='Ingresa un precio...'
                    name='price'
                    value={editFormData.price}
                    onChange={handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type='submit' className={ProductCSS.btnSave}>Guardar</button>
                <button type='button' onClick={handleCancelClick} className={ProductCSS.btnCancel}>Cancelar</button>
            </td>
        </tr>
    )
}

export default EditableRow