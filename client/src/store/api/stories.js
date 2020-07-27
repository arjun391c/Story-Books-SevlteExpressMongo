import {StoriesStore, PublicStore} from '../StoriesStore';
import axios from 'axios';
import { baseUrl } from '../../shared/baseUrl';

export const fetchStories = async () => {
    const fetch = await axios.get(`${baseUrl}api/stories`);
    StoriesStore.set(fetch.data);
}

export const fetchPublicStories = async () => {
    const fetch = await axios.get(`${baseUrl}api/stories/public`);
    PublicStore.set(fetch.data);
}

export const postStory = async (data) => {
    const post = await axios.post(`${baseUrl}api/stories/add`,data);
    PublicStore.update(state => {
        if(post.data.status === 'public') {
            return [...state, post.data];
        } else {
            return state;
        }
    });
    StoriesStore.update(state => {
        return [...state, post.data]
    });
}

export const deleteStory = async (id) => {
    const del = await axios.delete(`${baseUrl}api/stories/${id}`);
    PublicStore.update(state => {
        if(del.data.status === 'public') {
            return state.filter((s) => s._id != del.data._id);
        } else {
            return state;
        }
    });
    StoriesStore.update(state => {
        return state.filter((s) => s._id != del.data._id);
    });
}

export const updateStory = async (data, id) => {
    const upd = await axios.put(`${baseUrl}api/stories/${id}`, data);
    PublicStore.update(state => {
        if(upd.data.status === 'public') {
            return [...state.filter((s) => s._id != upd.data._id), upd.data];
        } else {
            return state;
        }
    });
    StoriesStore.update(state => {
        return [...state.filter((s) => s._id != upd.data._id), upd.data];
    });
}