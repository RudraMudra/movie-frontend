import publicClient from "../client/public.client";

const genreEndpoints = {
  list: ({ mediaType }) => `${mediaType}/genres`
};

const genreApi = {
  getList: async ({ mediaType }) => {
    try {
      const endpoint = genreEndpoints.list({ mediaType });
      console.log(endpoint);
      const response = await publicClient.get(endpoint);
      return { response };
    } catch (err) { return { err }; }
  }
};

export default genreApi;