import { NavLink } from "react-router-dom";
import AdminCSS from "../../Style/admin.module.css";
import Button from "../../components/Button";
import Header from "../../components/Header";

export default function Admin() {
  return <>
    <Header/>
    <div className={AdminCSS.buttonAdmin}>
    <NavLink to="/employees">
      <Button className={AdminCSS.buttons} id={AdminCSS["employees"]}  text="Colaboradores" />
      </NavLink>
      <NavLink to="/products">
      <Button className={AdminCSS.buttons} id={AdminCSS["products"]} text="Productos" />
      </NavLink>
    </div>
  </>

}

