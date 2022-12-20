import { useEffect } from "react";

export const login_event = new Event('login');
export const logout_event = new Event('logout');
export const closeDropdown_event = new Event('closeDropdown');

export function useEvent(event, callback){
    useEffect(() => {
        document.addEventListener(event, callback)
    }, [])
}