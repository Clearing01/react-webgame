import React from "react";
import { useNavigate } from "react-router-dom";

const RelayWord = () => {
  const navigate = useNavigate();

  const goMain = () => navigate('/');
    return (
      <>
        <div>
            <p>끝말잇기</p>
        </div>
        <button onClick={goMain}>
          메인으로 이동
        </button>
      </>
    );
}

export default RelayWord;