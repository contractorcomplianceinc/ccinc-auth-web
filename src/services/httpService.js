import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;

var headers = {
    "Content-Type": "application/json",
};

var baseUrl = process.env.VUE_APP_ROOT_API;

var httpService = {
    // post(path, params) {
    //     console.log("POST", path, params);
    //     // return axios.post(baseUrl + path, params, headers);
    //     return axios.post(baseUrl + path, params);
    // },
    get(path, params) {
        return axios.get(baseUrl + path, {
            headers: headers,
            params: params,
        });
    },
    saveToken(token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },
};
export default httpService;
