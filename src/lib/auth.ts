export const authToken = localStorage.getItem('authToken');

export function setHeadersIfAuth(): HeadersInit {
    const fetchHeaders: HeadersInit = {
        "Content-Type": "application/json"
    }
    if(authToken) {
        console.log("Headers set");
       fetchHeaders['Authorization'] = `Bearer ${authToken}` ;
    }
    return fetchHeaders;
}