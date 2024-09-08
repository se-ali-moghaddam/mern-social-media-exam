export const checkIsVerified = (user) => {
    if (!user.isAccountVerified)
        throw new Error('Your account is not verified yet :(');
}