import { Outlet } from 'react-router-dom';

function MainLayout() {
    return (
      <div>
        <h1>웹게임</h1>
        <Outlet />
      </div>
    );
}

export default MainLayout;