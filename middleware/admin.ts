export interface IUser {
	id: number;
	username: string;
	isAdmin: boolean;
}

export default defineNuxtRouteMiddleware(async (to, from) => {
	const { user } = useUserSession();

	if (!user.value || !(user.value as IUser).isAdmin) {
		return navigateTo('/login');
	}
});
