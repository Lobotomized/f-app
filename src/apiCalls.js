import { Socket } from "socket.io-client";
import { UserObserver } from "./stores"
import { SelectedChatObserver } from "./stores"
import socket from "./socket";


// const serverAddress = 'https://f-app-be-nsp7m.ondigitalocean.app/api';
const serverAddress = 'http://localhost:8080/api';

let selectedChatRoomId = "";

SelectedChatObserver.subscribe((innerSelectedChat) => {
    selectedChatRoomId = innerSelectedChat;
})

const api = {
    postFile: async function (endpoint, data) {
        if (!localStorage.getItem("fappToken")) {
            const res = await fetch(serverAddress + endpoint, {
                method: "POST",
                headers: {

                },
                body: data
            });
            if (res.status > 400 && res.status < 600) {
                const jsonBody = await res.json();
                if (jsonBody?.errors?.code === 11000) {
                    throw new Error('Имейлът е вече използван')
                }
                throw new Error('Нещо не е наред')
            }
            const jsonResponse = await res.json();

            return jsonResponse;
        }
        else {
            const res = await fetch(serverAddress + endpoint, {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("fappToken"),
                },
                body: data
            });
            if (res.status > 400 && res.status < 600) {
                throw new Error('Нещо не е наред')
            }
            const jsonResponse = await res.json();

            return jsonResponse;
        }
    },
    post: async function (endpoint, body) {
        if (!localStorage.getItem("fappToken")) {
            const res = await fetch(serverAddress + endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });
            if (res.status > 400 && res.status < 600) {
                const jsonBody = await res.json();
                if (jsonBody?.errors?.code === 11000) {
                    throw new Error('Имейлът е вече използван')
                }

                
                throw new Error(jsonBody.message)
            }
            const jsonResponse = await res.json();

            return jsonResponse;
        }
        else {
            const res = await fetch(serverAddress + endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("fappToken")
                },
                body: JSON.stringify(body)
            });
            const jsonResponse = await res.json();

            if (res.status > 400 && res.status < 600) {
                throw new Error(jsonResponse.message)
            }
            
            return jsonResponse;
        }
    },

    get: async function (endpoint) {
        if (localStorage.getItem("fappToken")) {
            const res = await fetch(serverAddress + endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + localStorage.getItem("fappToken")
                }
            });
            const jsonResponse = await res.json();

            return jsonResponse;
        }
        else {
            const res = await fetch(serverAddress + endpoint, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const jsonResponse = await res.json();
            return jsonResponse;
        }
    },

    delete: async function (endpoint) {
        if (localStorage.getItem("fappToken")) {
            const res = await fetch(serverAddress + endpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "Bearer " + localStorage.getItem("fappToken")
                }
            });
            const jsonResponse = await res.json();

            return jsonResponse;
        }
        else {
            const res = await fetch(serverAddress + endpoint, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const jsonResponse = await res.json();
            return jsonResponse;
        }
    },

    login: async function (body) {
        try {
            const res = await this.post('/login', body);
            localStorage.setItem("fappToken", res.token)
            localStorage.setItem("fappUser", JSON.stringify(res.user))
            UserObserver.set(res.user);
        }
        catch (err) {
            throw err
        }
    },

    register: async function (body) {
        try {
            const res = await this.post('/register', body);
            return res;
        }
        catch (err) {
            throw err
        }
    },

    test: async function () {
        try {
            const res = await this.post('/test');
        }
        catch (err) {
            throw err
        }
    },

    getFantasies: async function (skip) {
        let innerSkip = skip || 0
        try {
            const res = await this.get('/fantasies?skip=' + innerSkip);
            return res;
        }
        catch (err) {
            throw err
        }
    },

    write: async function (content) {
        try {
            const res = await this.post('/write', { content: content });
            return res;
        } catch (err) {
            throw err;
        }
    },

    getRooms: async function () {
        try {
            const res = await this.get('/loadRooms');
            return res;
        }
        catch (err) {
            throw err
        }
    },
    getRoom: async function () {
        try {
            const res = await this.get('/loadRoom');
            return res;
        }
        catch (err) {
            throw err
        }
    },

    getMessages: async function (limit) {
        try {
            if (!selectedChatRoomId) {
                const room = await this.getRoom();
                SelectedChatObserver.set(room._id)

                const res = await this.get('/loadMessages/' + room._id + '?limit=' + limit);
                return res;
            }
            const res = await this.get('/loadMessages/' + selectedChatRoomId + '?limit=' + limit);
            return res;
        }
        catch (err) {
            throw err
        }
    },

    getNewMessagesCount: async function () {
        try {
            const count = await this.get('/newMessagesCount');
            return count
        }
        catch (err) {
            throw err
        }
    },

    getUserPhotos: async function (skip) {
        try {
            const photos = await this.get('/photosForUser?skip=' + skip);
            return photos;
        }
        catch (err) {
            throw err;
        }
    },
    getRoomByPostAndUser: async function (postId) {
        try {
            const chatRoom = await this.get('/loadRoomByPostAndUser/' + postId);
            return chatRoom;
        }
        catch (err) {
            throw err;
        }
    },

    createRoomFromPostId: async function (postId) {
        try {
            const chatRoom = await this.post('/createRoomFromPostId', { postId: postId });
            socket.emit('joinFromPost', postId)
            return chatRoom;
        }
        catch (err) {
            throw err;
        }
    },
    deletePhoto: async function (photoId) {
        try {
            const photos = await this.delete('/photo/' + photoId);
            return photos;
        }
        catch (err) {
            throw err;
        }
    },

    leaveRoom: async function (roomId) {
        try {
            await this.post('/leaveRoom', { roomId: roomId })
        }
        catch(err){
            throw err;
        }
    }
}

export default api;