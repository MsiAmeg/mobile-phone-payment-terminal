
export const paymentCall = async () => {
    return new Promise((resolve, reject) => {
        const randBoolean: boolean = (Math.random() < 0.5)? true : false;

        setTimeout(() => {
            randBoolean? resolve('resolved') : reject('rejected');
        }, 2000);
    })
};
