import AuthStore from '../AuthStore';
import {baseUrl} from '../../shared/baseUrl';
import axios from 'axios';

export const fetchLoggedUser = async () => {
    const fetch = await axios.get(`${baseUrl}auth/current_user`)
    AuthStore.set(fetch.data || null)
}