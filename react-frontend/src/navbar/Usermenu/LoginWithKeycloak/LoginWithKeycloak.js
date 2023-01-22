import { login } from "../../../modules/oidc";

export default function LoginWithKeycloak(){
    return (
        <button className="btn btn-primary" onClick={login}>Login with Keycloak</button>
    );
}