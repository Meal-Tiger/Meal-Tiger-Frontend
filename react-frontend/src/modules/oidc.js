let authorization_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/auth"
let token_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/token"
let introspection_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/token/introspect"
let userinfo_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/userinfo"
let end_session_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/logout"
let client_id = "mealtiger"

export function login(){
    let uri = new URL(authorization_endpoint);
	uri.searchParams.append("response_type", "code");
    uri.searchParams.append("client_id", client_id);
    uri.searchParams.append("scope", "openid email offline_access");
    uri.searchParams.append("redirect_uri", window.location.href);
    uri.searchParams.append("state", "null");

    window.location.href = uri.toString();
}