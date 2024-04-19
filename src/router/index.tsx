import { RouteObject, useRoutes } from 'react-router-dom';

import Layout from '../layout/MainLayout';
import Index from "../pages/main";
import Gugudan from "../pages/main/Gugudan";
import RelayWord from "../pages/main/RelayWord";
import NumberBaseball from "../pages/main/NumberBaseball.tsx";

const routes: RouteObject = {
	path: '/*',
	element: <Layout />,
	children: [
		{
			index: true,
			path: '/*',
			element: <Index />,
		},
		{
			path: 'gugudan',
			element: <Gugudan />,
			id: '구구단',
		},
		{
			path: 'relayword',
			element: <RelayWord />,
			id: '끝말잇기',
		},
		{
			path: 'numberbaseball',
			element: <NumberBaseball />,
			id: '숫자야구',
		},
	],
};

const Routes = (): React.ReactElement | null => {
	const routeObjects: RouteObject[] = [routes];
	return useRoutes(routeObjects);
};

export default Routes;
