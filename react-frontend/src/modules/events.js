/* eslint react-hooks/exhaustive-deps: 0 */
import { useEffect } from "react";

export const login_event = new Event('login');
export const logout_event = new Event('logout');
export const openLoginModal_event = new Event('openLoginModal');
export const closeLoginModal_event = new Event('closeLoginModal');

export function useEvent(event, callback){
    useEffect(() => {
        document.addEventListener(event, callback)
    }, [])
}