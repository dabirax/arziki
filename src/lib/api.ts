const API_BASE_URL = "https://arziki.onrender.com";

export const api = {
  auth: {
    register: async (data: { email: string; password: string; username: string; role: string }) => {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Registration failed");
      }
      return response.json();
    },

    login: async (data: { username: string; password: string }) => {
      const formData = new URLSearchParams();
      formData.append("username", data.username);
      formData.append("password", data.password);
      
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Login failed");
      }
      return response.json();
    },

    sendVerificationEmail: async (username: string) => {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/send-verification-email/${username}`, {
        method: "POST",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to send verification email");
      }
      return response.json();
    },

    verify: async (token: string) => {
      const response = await fetch(`${API_BASE_URL}/api/v1/auth/verify/?token=${token}`, {
        method: "GET",
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Verification failed");
      }
      return response.json();
    },
  },

  chat: {
    sendMessage: async (message: string, token: string) => {
      const response = await fetch(`${API_BASE_URL}/api/v1/chat/message`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          message,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || "Failed to send message");
      }
      return response.json();
    },
  },
};
