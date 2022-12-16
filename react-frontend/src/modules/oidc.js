import { login_event } from "./events"

const authorization_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/auth"
const token_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/token"
const revocation_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/revoke"
//const introspection_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/token/introspect"
//const userinfo_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/userinfo"
//const end_session_endpoint = "https://auth.meal-tiger.knoepfle.dev/realms/master/protocol/openid-connect/logout"
const client_id = "mealtiger"
const scope = "openid email offline_access"

const refresh_error = 2000;

/**
 * creates login-popup, PKCE-challenge
 * retrieves auth_code, first tokenrequest
 * saves access_token, access_token_ttl, refresh_token, refresh_token_ttl to local storage
 */
export async function login(){

    /**
     * Create login-popup
     */
    const redirect_url = new URL(window.location.href)
    redirect_url.pathname = "/login-success"

    //create code challenge
    const random = crypto.getRandomValues(new Uint8Array(32));
    const code_verifier = base64URLEncode(window.btoa(String.fromCharCode(...random)));
    localStorage.setItem("code_verifier", code_verifier)

    const encoder = new TextEncoder();
    const data = encoder.encode(code_verifier);
    const hash = new Uint8Array(await crypto.subtle.digest('SHA-256', data));
    const code_challenge = base64URLEncode(window.btoa(String.fromCharCode(...hash)));

    //create popup
    const auth_url = new URL(authorization_endpoint);
    auth_url.searchParams.append("scope", scope);
	auth_url.searchParams.append("response_type", "code");
    auth_url.searchParams.append("client_id", client_id);
    auth_url.searchParams.append("redirect_uri", redirect_url.toString());
    auth_url.searchParams.append("code_challenge", code_challenge);
    auth_url.searchParams.append("code_challenge_method", "S256");
    auth_url.searchParams.append("display", "popup");

    const popup = window.open(auth_url, "_blank", "popup=true")

    const checkPopup = setInterval(async () => {
        if (popup.location.hostname === window.location.hostname){

            const auth_code = new URL(popup.location.href).searchParams.get("code");
            popup.close()
            clearInterval(checkPopup);

            //retrieve first token-set
            const response = await fetch(token_endpoint, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    'grant_type': 'authorization_code',
                    'code': auth_code,
                    'redirect_uri': redirect_url,
                    'client_id': client_id,
                    'code_verifier': code_verifier
                })
            });

            const body = await response.json();

            localStorage.setItem("access_token", body.access_token)
            localStorage.setItem("access_token_ttl",body.expires_in === 0 ? -1 : Date.now() + body.expires_in * 1000 - refresh_error)
            localStorage.setItem("refresh_token", body.refresh_token)
            localStorage.setItem("refresh_token_ttl", body.refresh_expires_in === 0 ? -1 : Date.now() + body.refresh_expires_in * 1000 - refresh_error)
            document.dispatchEvent(login_event);
        }
        else return;
    }, 1000)
}

export async function getAccessToken(){
    if(localStorage.getItem('refresh_token_ttl') > Date.now) return localStorage.getItem('refresh_token_ttl');
    else return await refreshToken();
}

export async function logout(){
    await fetch(revocation_endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'client_id': client_id,
            'code_verifier': localStorage.getItem('code_verifier'),
            'token_type_hint': 'refresh_token',
            'token': localStorage.getItem('refresh_token')
        })
    });

    localStorage.setItem("access_token", null)
    localStorage.setItem("access_token_ttl", null)
    localStorage.setItem("refresh_token", null)
    localStorage.setItem("refresh_token_ttl", null)
    localStorage.setItem("code_verifier", null)

}

function base64URLEncode(str) {
    return str.toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '');
}

async function refreshToken(){
    const response = await fetch(token_endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            'client_id': client_id,
            'grant_type': 'refresh_token',
            'code_verifier': localStorage.getItem('code_verifier'),
            'refresh_token': localStorage.getItem('refresh_token'),
            'scope': scope
        })
    });

    const body = await response.json();

    localStorage.setItem("access_token", body.access_token)
    localStorage.setItem("access_token_ttl",body.expires_in === 0 ? -1 : Date.now() + body.expires_in * 1000 - refresh_error)
    localStorage.setItem("refresh_token", body.refresh_token)
    localStorage.setItem("refresh_token_ttl", body.refresh_expires_in === 0 ? -1 : Date.now() + body.refresh_expires_in * 1000 - refresh_error)

    return body.access_token;
}