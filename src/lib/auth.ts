import { userIsAuthenticated, userStore } from "./stores";

export const signinEmailPasswordFront = async (event) => {
    event.preventDefault();
    const form = event.target.parentElement;
    const formData = new FormData(form);

    if (formData.get('password') && formData.get('email')) {
        const res = await fetch('?/signin', {
            method: form.method,
            body: formData
        });
        const response = await res.json()
        let data = JSON.parse(JSON.parse(response.data));
        if (data.status == 200) {
            console.log("Successful login!");
            userIsAuthenticated.set('1');
        } else {
            console.error('Failed to login.');
            userIsAuthenticated.set('0');
        }
    }
};

export const signupEmailPasswordFront = async (event) => {
    event.preventDefault();
    const form = event.target.parentElement;
    const formData = new FormData(form);

    if (formData.get('password') && formData.get('email')) {
        const res = await fetch('?/signup', {
            method: form.method,
            body: formData
        });

        const response = await res.json();
        let data = JSON.parse(JSON.parse(response.data));
        if (data.status == 201) {
            console.log("Successful created account!");
            userIsAuthenticated.set('1');
        } else {
            console.error(`Failed to create account. "${data.message}"`);
            userIsAuthenticated.set('0');
        }
    }
};

export const signoutEmailPasswordFront = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    const res = await fetch('?/signout', {
        method: 'POST',
        body: formData
    });

    if (!res.ok) {
        console.error('Failed to submit form');
    }
    userIsAuthenticated.set('0');
};
