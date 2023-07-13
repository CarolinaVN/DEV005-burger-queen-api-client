
import { NavLink } from 'react-router-dom';
import Button from './Button';
import BreakfastCSS from "../Style/breakfast.module.css";

export const TopBarAdmin = () => {
    return (
        <div className={BreakfastCSS.topBar}>
            <NavLink to= "/employees">
          <Button
            className={BreakfastCSS.break}
            text="Colaboradores" />
          </NavLink>
          <NavLink to= "/products">
          <Button
           className={BreakfastCSS.break}
           text="Productos"
          />
           </NavLink>
        </div>
      );
  
}
export default TopBarAdmin
