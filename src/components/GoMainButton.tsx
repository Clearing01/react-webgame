import {useNavigate} from "react-router-dom";

const GoMainButton = () => {
  const navigate = useNavigate();
  const goMain = () => navigate('/');

  return (
    <button onClick={goMain}>메인으로</button>
  )
}

export default GoMainButton;