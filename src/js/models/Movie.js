import {key, proxy} from '../config';
import axios from 'axios';

export default class Movie {
    constructor(id) {
        this.id = id;
    };

    async getMovie() {
        try {
            const result = await axios(`${proxy}https://api.themoviedb.org/3/movie/${this.id}?api_key=${key}`);
            if (result.status == 200) {
                this.result = result.data;
            } else {
                console.log(result.statusText)
            }
        } catch (error) {
            console.log(error);
        }
    };

}