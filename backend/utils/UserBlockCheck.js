export const checkIsBlocked = (user) => {
    if (user.isBlocked)
        throw new Error('You are blocked :(');
}