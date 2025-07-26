import axios from "axios";

class Auth {
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:3052/api/v0/auth",
        });
    }

    async login(email, password) {
        const response = await this.api.post("/login", { email, password });
        return response.data;
    }

    async signup(email, password) {
        const response = await this.api.post("/signup", { email, password });
        return response.data;
    }

    async logout() {
        const response = await this.api.post("/logout");
        return response.data;
    }

    async verifyToken(token) {
        const response = await this.api.post("/verify-token", null, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    }
}

export default new Auth();