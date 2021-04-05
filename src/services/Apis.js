import { api } from './api';


export const FOEGOT_PASSWORD = '/auth/forgot-password'





export const fetchUserInfo = () => {
    return api.get('/users/profile');
}
export const updateProfile = (params) => {
    if (params.country._id) {
        params.country = params.country._id;
    }
    delete params.videos;
    delete params.giftVideos;
    delete params.fcm;
    delete params.images;
    return api.put('/users', params);
}





export const fetchAbout = (params) => {
    return api.get('/content/type/' + params.type);
}
export const contactus = (params) => {
    return api.post('/contact', params);
}
export const login = (params) => {
    return api.post('/auth/login', params);
}
export const social = (params) => {
    return api.post('/auth/registerSocial', params);
}

export const register = (params) => {
    return api.post('/auth/register', params);
}




export const home = (params) => {
    var url = '/specially/home';
    if (params.category) { url = url + '?category=' + params.category + '&limit=1000'; } else { url = url + '?limit=1000'; }

    return api.get(url, params);
}
export const categoryNews = () => {
    var url = '/news/category?isPagination=false';
    return api.get(url);
}

export const resetPassword = (params) => {
    return api.post('/auth/resetPassword', params);
}



export const Post = (url, params) => {
    return new Promise((resolve, reject) => {
        return api.post(url, params).then((data) => {
            if (data.code) {
                reject(new Error(data.message));
            } else {
                resolve(data.data);
            }

        })
            .catch((error) => {
                console.log('error', error.response);
                if (error.response) {
                    reject(error.response.data);
                } else {
                    reject({ message: 'Please check your internet connection' })
                }

            });
    });
}



export const Delete = (url, params) => {
    return new Promise((resolve, reject) => {
        return api.delete(url, params).then((data) => {
            if (data.code) {
                reject(new Error(data.message));
            } else {
                resolve(data.data);
            }

        })
            .catch((error) => {
                console.log('error', error.response);
                if (error.response) {
                    reject(error.response.data);
                } else {
                    reject({ message: 'Please check your internet connection' })
                }

            });
    });
}


export const Put = (url, params) => {
    return new Promise((resolve, reject) => {
        return api.put(url, params).then((data) => {
            if (data.code) {
                reject(new Error(data.message));
            } else {
                resolve(data.data);
            }

        })
            .catch((error) => {
                console.log('error', error.response);
                if (error.response) {
                    reject(error.response.data);
                } else {
                    reject({ message: 'Please check your internet connection' })
                }

            });
    });
}


export const Get = (url) => {
    return new Promise((resolve, reject) => {
        return api.get(url).then((data) => {
            if (data.code) {
                reject(new Error(data.message));
            } else {
                resolve(data.data);
            }

        })
            .catch((error) => {
                console.log('error', error.response);
                if (error.response) {
                    reject(error.response.data);
                } else {
                    reject({ message: 'Please check your internet connection' })
                }

            });
    });
}

