
export const paymentCall = async () => {
    return new Promise((res, rej) => {
     setTimeout(() => res('promise'), 2000);
    })
};
