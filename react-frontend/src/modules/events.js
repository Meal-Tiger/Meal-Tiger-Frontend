import { useEffect } from "react";

export const login_event = new Event('login');

export function useEvent(event, callback){
    useEffect(() => {
        document.addEventListener(event, callback)
    }, [])
}