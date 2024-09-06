export const authToken = localStorage.getItem('Authorization');

export function setHeadersIfAuth(): HeadersInit {
    const fetchHeaders: HeadersInit = {
        "Content-Type": "application/json"
    }
    if(authToken) {
       fetchHeaders['Authorization'] = `Bearer ${authToken}` ;
    }
    return fetchHeaders;
}


export function storeToken(token: string) {
    localStorage.setItem('Authorization', token)
}