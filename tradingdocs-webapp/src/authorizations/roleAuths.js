export const isNormalUser = (user) => {
	if (user !== null) return user.user.role === "NORMAL_USER";
};

export const isAdmin = (user) => {
	if (user !== null) return user.user.role === "ADMIN";
};
