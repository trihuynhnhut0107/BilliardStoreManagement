interface LoginData {
  username: string;
  password: string;
}

export const useLogin = async (loginData: LoginData) => {
  const { data: loginInfo, error } = await useFetch(
    "http://localhost:8080/v1/api/access/customer-site/login",
    {
      method: "POST",
      body: JSON.stringify(loginData),
    }
  );
  if (error.value) {
    return false;
  }
  return true;
};
