import { RouteObject, useRoutes } from 'react-router-dom';
import React from "react";

import Layout from '../layout/MainLayout';
import Index from "../pages/main";
import Gugudan from "../pages/gugudan/Gugudan.tsx";
import RelayWord from "../pages/relayWord/RelayWord.tsx";
import NumberBaseball from "../pages/numberBaseball/NumberBaseball.tsx";
import ResponseCheck from "../pages/responseCheck/ResponseCheck.tsx";
import RSP from "../pages/rsp/RSP.tsx";
import Lotto from "../pages/lotto/Lotto.tsx";
import TicTacToe from "../pages/tictactoe/TicTacToe.tsx";

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
		{
			path: 'responsecheck',
			element: <ResponseCheck />,
			id: '반응속도 체크',
		},
		{
			path: 'rsp',
			element: <RSP />,
			id: '가위바위보',
		},
		{
			path: 'lotto',
			element: <Lotto />,
			id: '로또 추첨기',
		},
		{
			path: 'tictactoe',
			element: <TicTacToe />,
			id: '틱택토',
		},
	],
};

const Routes = (): React.ReactElement | null => {
	const routeObjects: RouteObject[] = [routes];
	return useRoutes(routeObjects);
};

export default Routes;
