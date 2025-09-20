export const checkUser = (user) => {
    try {
        if (!user)
            throw new Error("user not found");
        return user;
    }
    catch (error) {
        console.error(error);
        throw new Error(error.message);
    }
};
//# sourceMappingURL=checkUser.js.map