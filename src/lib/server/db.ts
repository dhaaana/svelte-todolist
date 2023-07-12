import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { DB_HOST, DB_PASSWORD, DB_USERNAME } from '$env/static/private';

const connection = connect({
	host: DB_HOST,
	username: DB_USERNAME,
	password: DB_PASSWORD
});

export const db = drizzle(connection);

// database: todolist
// username: mwoacnajeplncbjyvgt2
// host: aws.connect.psdb.cloud
// password: pscale_pw_8T8D9Z2v6ScD92mYRN4hisPdBWQHSURcdvyKRkKDbwG
