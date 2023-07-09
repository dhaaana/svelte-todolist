import bcrypt from 'bcrypt';
import { db } from '$lib/server/db.js';
import { usersTable } from '$lib/server/schema.js';
import { fail, redirect } from '@sveltejs/kit';
import { createAuthJWT } from '$lib/server/jwt.js';
import { eq } from 'drizzle-orm';

export const load = async (event) => {
	// get the token from the cookie
	const token = event.cookies.get('auth_token');

	// if there is a token, redirect to the user page
	if (token) {
		throw redirect(301, '/');
	}
};

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const first_name = formData.get('first_name');
		const last_name = formData.get('last_name');

		if (!email || !password || !first_name || !last_name) {
			return fail(400, {
				missing: 'must provide an email, password, first name, and last name'
			});
		}

		// check if the email is already in use
		const user = await db
			.select({
				email: usersTable.email,
				password: usersTable.password,
				first_name: usersTable.first_name,
				last_name: usersTable.last_name,
				id: usersTable.id
			})
			.from(usersTable)
			.where(eq(usersTable.email, email.toString()))
			.limit(1);

		if (user.length > 0) {
			return fail(400, {
				incorrect: 'email already in use'
			});
		}

		const hash = bcrypt.hashSync(password?.toString(), 10);

		const newUser = await db.insert(usersTable).values({
			first_name: first_name.toString(),
			last_name: last_name.toString(),
			email: email.toString(),
			password: hash
		});

		const token = await createAuthJWT({
			firstName: first_name.toString(),
			lastName: last_name.toString(),
			email: email.toString(),
			id: parseInt(newUser.insertId)
		});

		event.cookies.set('auth_token', token, {
			path: '/'
		});

		throw redirect(301, '/me');
	}
};
