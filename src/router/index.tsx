import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import Layout from '../layout/MainLayout';
import Main from "../pages/main/main";
import Gugudan from "../pages/main/Gugudan";
import RelayWord from "../pages/main/RelayWord";

const routes: RouteObject = {
	path: '/*',
	element: <Layout />,
	children: [
		{
			index: true,
			path: '/*',
			element: <Main />,
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
	],
};

const Routes = (): React.ReactElement | null => {
	const routeObjects: RouteObject[] = [routes];
	return useRoutes(routeObjects);
};

export default Routes;
