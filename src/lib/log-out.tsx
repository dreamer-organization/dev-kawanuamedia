export default function logOut() {
    if (localStorage.getItem("user-auth-beasiswa")) {
        localStorage.removeItem("user-auth-beasiswa");
    }


    if (localStorage.getItem("data-user")) {
        localStorage.removeItem("data-user");
    }

    const a = document.createElement('a');
    a.href = localStorage.getItem('portal-url') + 'login';
    a.click();
}
