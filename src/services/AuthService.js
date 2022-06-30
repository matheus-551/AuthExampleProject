export function signIn(user) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                token: 'hljsdhfghasdjlghjalkçshgsdhfljhdsfhgjlhlgj',
                user: {
                    name: user.username,
                    password: user.password
                }
            })
        }, 1000);
    });
}