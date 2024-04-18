import React from 'react';
import { useNavigate } from "react-router-dom";
import Router from "../../router";


const Main = () => {
  const navigate = useNavigate();
  const router = Router();
  const gameList = router?.props.match.route.children.filter((route: any) => !!route.id);

  return (
    <>
      <div>
        메인 화면 입니다.
        <div style={{ marginTop: '10px', cursor: 'pointer' }}>
          {gameList.map((route: any, index: number) => {
            return (
              <div key={index} onClick={() => navigate(route.path)} style={{ marginTop: '5px' }}>
                {index + 1}. {route.id}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Main;
