import { useNavigate } from "react-router-dom";
import Router from "../../router";
import {useLayoutEffect, useState} from "react";


const Index = () => {
  const navigate = useNavigate();
  const router = Router();
  const gameList = router?.props.match.route.children.filter((route: any) => !!route.id);
  const [name, setName] = useState<string>('');

  useLayoutEffect(() => {
    setName('test');
  }, []);

  return (
    <>
      <div>
        메인 화면 입니다. {name}
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
export default Index;
