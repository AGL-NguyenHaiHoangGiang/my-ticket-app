import axios from "axios";

class Auth {
    constructor() {
        this.api = axios.create({
            baseURL: "http://localhost:3052/api/v0/admin/auth",
        });
    }

    async login(username, password) {
        const response = await this.api.post("/login", { username, password });
        return response.data;
    }

    async logout(sessionToken) {
        const response = await this.api.post("/logout", { sessionToken });
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