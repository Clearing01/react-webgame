import {useNavigate} from "react-router-dom";
import React from "react";

const GoMainButtonComponent = () => {
  const navigate = useNavigate();
  const goMain = () => navigate('/');

  return (
    <div>
      <br />
      <button onClick={goMain}>메인으로</button>
    </div>
  )
}

const GoMainButton = React.memo(GoMainButtonComponent);
GoMainButton.displayName = 'GoMainButton';

export default GoMainButton;