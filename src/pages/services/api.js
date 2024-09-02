import axios from "axios";

export const Api = axios.create({
	baseURL: "https://pessoa-contatos-api.onrender.com/",
});


