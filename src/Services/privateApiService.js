export const verifyTokenLocalStorage = ()=>{
    const token = localStorage.getItem("token");
    return token&&{'Authorization': 'Bearer ' + token}
}