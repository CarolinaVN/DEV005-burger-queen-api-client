import React from 'react'
import ProductCSS from "../Style/adminProducts.module.css";

const ReadOnlyRow = ({ product, handleEditClick, handleDeleteClick }) => {
    return (
        <tr>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>
                <button
                    type='button'
                    onClick={(event) => handleEditClick(event, product)}
                    className={ProductCSS.btnEdit}></button>
                <button type='button' onClick={()=> handleDeleteClick(product.id)} className={ProductCSS.btnDelete}></button>
            </td>
        </tr>
    )
}

export default ReadOnlyRow