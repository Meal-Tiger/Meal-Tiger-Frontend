import { login } from "../../../modules/oidc";

export default function LoginWithKeycloak(){
    return (
        <button onClick={login}>Login with Keycloak</button>
    );
}