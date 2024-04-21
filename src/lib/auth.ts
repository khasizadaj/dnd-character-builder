import { userStore } from "./stores";

export const signinEmailPasswordFront = async (event) => {
    event.preventDefault();
    const form = event.target.parentElement;
    const formData = new FormData(form);

    if (formData.get('password') && formData.get('email')) {
        const res = await fetch('?/signin', {
            method: form.method,
            body: formData
        });

        if (res.ok) {
            userStore.update((value) => ({ ...value, isAuthenticated: true }));
        } else {
            console.error('Failed to submit form');
            userStore.update((value) => ({ ...value, isAuthenticated: false }));
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

        if (res.ok) {
            userStore.update((value) => ({ ...value, isAuthenticated: true }));
        } else {
            console.error('Failed to submit form');
            userStore.update((value) => ({ ...value, isAuthenticated: false }));
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
    userStore.update((value) => ({ ...value, isAuthenticated: false }));
};
