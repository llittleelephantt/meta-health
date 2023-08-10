import User from '../types/user'

export const addNewUser = async (userData: User) => {
    return await fetch('url', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": userData.id, userData: userData })
    })
}

export const editNewUser = async (userData: User) => {
    return await fetch('url', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": userData.id, userData: userData })
    })
}

export const deleteNewUser = async (id: string) => {
    return await fetch('url', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "id": id })
    })
}