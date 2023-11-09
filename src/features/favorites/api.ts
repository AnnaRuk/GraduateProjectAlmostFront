import Kindergarten from '../../features/kindergartens/types/Kindergarten';
import FavoriteAddDto from './types/FavoriteAddDto';

//GET
export async function getFavorites(): Promise<{
	kindergartens: Kindergarten[];
}> {
	const res = await fetch('/api/users/profile/favorites');
	// TODO Error
	if (res.status >= 400) {
		console.log('HELP');
	}
	return res.json();
}

//DELETE
export async function deleteFromFavorites(id: number): Promise<Kindergarten> {
	const data = { id };
	const res = await fetch('/api/users/profile/favorites', {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});
	if (res.status >= 400) {
		console.log('HELP');
	}

	return res.json();
}

//POST
export async function addToFavorites(dto: FavoriteAddDto): Promise<Kindergarten> {
	const res = await fetch('/api/users/profile/favorites', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(dto),
	});
	if (res.status >= 400) {
		console.log('HELP');
	}

	return res.json();
}