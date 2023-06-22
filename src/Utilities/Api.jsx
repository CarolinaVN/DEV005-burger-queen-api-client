import axios from "axios";
import CounterMenu from "../components/CounterMenu";
import React, { useEffect, useState } from "react";
import TopBar from "../components/topBar";

const ApiProducts = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:8080/products", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const MENU = response.data;
    return MENU;
  } catch (error) {
    console.error(error);
  }
};

const Menu = ({ menu, selectedMenu }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {getMenuItems(menu, selectedMenu).map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <CounterMenu />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
const getMenuItems = (menu, selectedMenu) => {
    if (selectedMenu === 'desayuno') {
      return menu.filter((product) => product.type === 'Desayuno');
    } else if (selectedMenu === 'almuerzo') {
      return menu.filter((product) => product.type === 'Almuerzo');
    }
    return [];
  };

export default function WaiterMenu() {
  const [menu, setMenu] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState('desayuno');

  useEffect(() => {
    const data = async () => {
      const menuData = await ApiProducts();
      setMenu(menuData);
    };
    data();
  }, []);

  const handleMenuType = (menuType) => {
    setSelectedMenu(menuType);
  };

  return (
    <>
     <div>
      <TopBar onMenuTypeChange={handleMenuType} />
      </div>
      <div className="menuTable">
      <Menu menu={menu} selectedMenu={selectedMenu} />
      </div>
    </>
  );
}


