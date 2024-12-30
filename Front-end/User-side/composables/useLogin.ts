import { toast } from "vue3-toastify";

interface LoginData {
  username: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  message: string;
  customerID?: string;
}

export const useLogin = async (loginData: LoginData): Promise<LoginResult> => {
  try {
    const response = await $fetch(
      "http://localhost:8080/v1/api/access/customer-site/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      }
    );

    // Assuming `response` contains the necessary data directly
    if (response.metadata?.customerID) {
      toast.success("Login successful");
      return {
        success: true,
        message: response.message || "Login successful",
        customerID: response.metadata.customerID,
      };
    }

    // Handle case where response doesn't contain expected data
    toast.error("Login failed. Unexpected response.");
    return {
      success: false,
      message: "Unexpected response from server.",
    };
  } catch (error: any) {
    // Handle errors (network issues, server errors, etc.)
    const errorMessage =
      error?.data?.message || "Login failed. Please try again.";
    toast.error(errorMessage);
    return {
      success: false,
      message: errorMessage,
    };
  }
};
