export const signinEmailPasswordFront = async (event) => {
    event.preventDefault();
    const form = event.target.parentElement;
    const formData = new FormData(form);

    if (formData.get('password') && formData.get('email')) {
        try {
            const res = await fetch('/account/signin', {
                method: form.method,
                body: formData
            });
            const data = await res.json()
            if (data.status == 200) {
                console.log("Successful login!");
                window.location.href = '/app';
            } else {
                console.error('Failed to login because of status.');
                window.location.href = '/app';
            }
        } catch (error) {
            console.error("Failed to login cuz of error.", error)
        }
    }
};

export const signupEmailPasswordFront = async (event) => {
    event.preventDefault();
    const form = event.target.parentElement;
    const formData = new FormData(form);

    if (formData.get('password') && formData.get('email')) {
        try {
            const res = await fetch('/account/signup', {
                method: form.method,
                body: formData
            });
            const data = await res.json();
            if (data.status == 201) {
                console.log("Successful created account!");
                window.location.href = '/app';
            } else {
                console.error(`Failed to create account. "${data.message}"`);
                window.location.href = '/app';
            }
        } catch (error) {
            console.error("Failed to login.")
        }
    }
};

export const signoutEmailPasswordFront = async (event) => {
    event.preventDefault();
    const formData = new FormData();

    const res = await fetch('/account/signout', {
        method: 'POST',
        body: formData
    });

    const data = await res.json();
    if (data.status == 200) {
        console.log(data.message);
        window.location.href = '/';
    } else {
        console.log(data.message);
        window.location.href = '/';
    }
};
