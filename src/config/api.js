import {setAxiosHeader} from './auth'

setAxiosHeader()


function Users (url = 'users') {
    return {
        getOne: (id) => axios.get(`${url}/${id}`),
        getAll: () => axios.get(`${url}?pagination=false`),
        update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
        create: (toCreate) => axios.post(url, toCreate),
        delete: (id) => axios.delete(`${url}/${id}`),
        updateRole: (id, roleId) => axios.put(`${url}/${id}/roles/${roleId}`),
        authorizeRoles: (id,toUpdate) => axios.put(`${url}/${id}/roles/`,toUpdate),
        attachBookmaker: (id, bookmakerId) => axios.put(`${url}/${id}/bookmakers/${bookmakerId}`),
        
    }
}

function UserStatus (url = 'user-statuses') {
    return {
        getOne: (id) => axios.get(`${url}/${id}`),
        getAll: () => axios.get(`${url}?pagination=false`),
        update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
        create: (toCreate) => axios.post(url, toCreate),
        delete: (id) => axios.delete(`${url}/${id}`)
        
    }
}

function Markets (url = 'markets') {
    return {
        getOne: (id) => axios.get(`${url}/${id}`),
        getAll: () => axios.get(`${url}?pagination=false`),
        update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
        create: (toCreate) => axios.post(url, toCreate),
        delete: (id) => axios.delete(`${url}/${id}`)
    }
}



function Bets (url = 'bets') {
    return {
        getOne: (id) => axios.get(`${url}/${id}`),
        getAll: () => axios.get(`${url}?pagination=false`),
        update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
        create: (toCreate) => axios.post(url, toCreate),
        delete: (id) => axios.delete(`${url}/${id}`)
    }
}

function Events (url = 'events') {
    return {
        getOne: (id) => axios.get(`${url}/${id}`),
        getAll: () => axios.get(`${url}?pagination=false`),
        update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
        create: (toCreate) => axios.post(url, toCreate),
        delete: (id) => axios.delete(`${url}/${id}`)
    }
}

function Roles (url = 'roles') {
    return {
        getOne: (id) => axios.get(`${url}/${id}`),
        getAll: () => axios.get(`${url}?pagination=false`),
        update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
        create: (toCreate) => axios.post(url, toCreate),
        delete: (id) => axios.delete(`${url}/${id}`)
    }
}
function Bookmakers (url = 'bookmakers') {
    return {
        getOne: (id) => axios.get(`${url}/${id}`),
        getAll: () => axios.get(`${url}?pagination=false`),
        update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
        create: (toCreate) => axios.post(url, toCreate),
        delete: (id) => axios.delete(`${url}/${id}`)
    }
}

function BookmakerStatus (url = 'bookmaker-statuses') {
    return {
        getOne: (id) => axios.get(`${url}/${id}`),
        getAll: () => axios.get(`${url}?pagination=false`),
        update: (id, toUpdate) => axios.put(`${url}/${id}`, toUpdate),
        create: (toCreate) => axios.post(url, toCreate),
        delete: (id) => axios.delete(`${url}/${id}`)
        
    }
}


export default {
    Users,
    UserStatus,
    Markets,
    Events,
    Roles,
    Bets,
    Bookmakers,
    BookmakerStatus
}
  