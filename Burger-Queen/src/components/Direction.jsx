import { useNavigate } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();

  const goToAdmin = () => {
    navigate("/admin");
  };

  const goToWaiter = () => {
    navigate("/waiter");
  };

  return { goToAdmin, goToWaiter };
};