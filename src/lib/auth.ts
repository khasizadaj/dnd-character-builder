export const signinEmailPasswordFront = async (event) => {
    event.preventDefault();
    const form = event.target.parentElement;
    const formData = new FormData(form);

    if (formData.get('password') && formData.get('email')) {
        try {
            const res = await fetch('?/signin', {
                method: form.method,
                body: formData
            });
            const response = await res.json()
            let data = JSON.parse(JSON.parse(response.data));
            if (data.status == 200) {
                console.log("Successful login!");
                window.location.href = '/';
            } else {
                console.error('Failed to login.');
                window.location.href = '/';
            }
        } catch (error) {
            console.error("Failed to login.")
        }
    }
};

export const signupEmailPasswordFront = async (event) => {
    event.preventDefault();
    const form = event.target.parentElement;
    const formData = new FormData(form);

    if (formData.get('password') && formData.get('email')) {
        try {
            const res = await fetch('?/signup', {
                method: form.method,
                body: formData
            });

            const response = await res.json();
            let data = JSON.parse(JSON.parse(response.data));
            if (data.status == 201) {
                console.log("Successful created account!");
            } else {
                console.error(`Failed to create account. "${data.message}"`);
            }
        } catch (error) {
            console.error("Failed to login.")
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

    const response = await res.json();
    let data = JSON.parse(JSON.parse(response.data));
    console.log(data.message);
    if (data.status == 200) {
        window.location.href = '/';
    } else {
        console.log(data.message);
        window.location.href = '/';
    }
};
