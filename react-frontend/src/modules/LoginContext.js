import { createContext } from "react";

const LoginContext = createContext({loginStatus: false, setLoginStatus: () => {}});

export default LoginContext;