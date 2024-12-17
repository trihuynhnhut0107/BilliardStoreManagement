interface LoginData {
  username: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  customerID?: number;
}

export const useLogin = async (loginData: LoginData): Promise<LoginResponse> => {
  try {
    const { data, error } = await useFetch(
      "http://localhost:8080/v1/api/access/customer-site/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      }
    );

    if (error.value) {
      return { success: false, message: "Login failed. Please try again." };
    }

    if (data.value) {
      const { status, message, metadata } = data.value;
      if (status === 201) {
        return {
          success: true,
          message,
          customerID: metadata.customerID,
        };
      }
      return { success: false, message };
    }

    return { success: false, message: "Invalid response from server." };
  } catch (err) {
    console.error("Error during login:", err);
    return { success: false, message: "An error occurred during login." };
  }
};
