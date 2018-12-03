import {key, proxy} from '../config';
import axios from 'axios';

export default class SearchMovie {
    constructor(query) {
        this.query = query;
    };

    async getResults(page = 1) {
        try {
            // 20 items => 10 items
            page = Math.ceil(page / 2);
            const result = await axios(`${proxy}https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${this.query}&page=${page}`);
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
