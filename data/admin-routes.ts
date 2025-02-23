interface IRoute {
	name: string;
	url: string;
	icon: string;
}

export const AdminRoutes: IRoute[] = [
	{
		name: 'Statistic',
		url: '/admin/statistic',
		icon: 'fa6-solid:chart-line',
	},
	{
		name: 'Video',
		url: '/admin/video',
		icon: 'fa6-solid:video',
	},
];
