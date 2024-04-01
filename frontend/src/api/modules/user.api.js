import privateClient from "../client/private.client";
// import publicClient from "../client/public.client";

const userEndpoints = {
    sign_in: "user/sign_in",
    sign_up: "user/sign_up",
    getInfo: "user/info",
    password_update: "user/update_password",
    // get_fav: "user/favorites",
    // add_fav: "user/favorites"
};

const userApi = {
    sign_in: async ({ username, password }) => {
        try {
            const response = await privateClient.post(
                userEndpoints.sign_in,
                { username, password }
            );
            return { response }
        } catch (err) { return { err }; }
    },
    sign_up: async ({ username, password, confirmPassword, displayName }) => {
        try {
            const response = await privateClient.post(
                userEndpoints.sign_up,
                { username, password, confirmPassword, displayName }
            );
            return { response }
        } catch (err) { return { err }; }
    },
    getInfo: async () => {
        try {
            const response = await privateClient.get(userEndpoints.getInfo);
            return { response }
        } catch (err) { return { err }; }
    },
    password_update: async ({ password, newPassword, confirmNewPassword}) => {
        try {
            const response = await privateClient.post(
                userEndpoints.password_update,
                {newPassword, password, confirmNewPassword}
            );

            return {response}
        } catch (err) { return { err }; }
    }
};

export default userApi;