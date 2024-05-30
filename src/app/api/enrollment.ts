import instance from './api';

function createPf(formData: any, token: string) {
    const promise: any = instance.post(
        `/enrollment/identification-pf`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    return promise;
}
function createPj(formData: any, token: string) {
    const promise: any = instance.post(
        `/enrollment/identification-pj`,
        formData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    return promise;
}

function getPF(token: string) {
    const promise: any = instance.get(`/enrollment/identification-pf`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return promise;
}

function getPJ(token: string) {
    const promise: any = instance.get(`/enrollment/identification-pj`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return promise;
}

async function getPFNoPromise(token: string) {
    try {
        const response = await instance.get(`/enrollment/identification-pf`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return undefined;
    }
}

async function getPJNoPromise(token: string) {
    try {
        const response = await instance.get(`/enrollment/identification-pj`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        return undefined;
    }
}

const enrollmentService = {
    createPf,
    createPj,
    getPF,
    getPJ,
    getPFNoPromise,
    getPJNoPromise,
};

export default enrollmentService;
