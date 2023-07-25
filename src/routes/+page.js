import { error } from '@sveltejs/kit';
import { data } from './data.js';

export function load() {

    if (!data) throw error(404);

	return {
		data: data
	};
}