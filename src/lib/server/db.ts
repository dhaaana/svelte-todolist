import { connect } from '@planetscale/database';
import { drizzle } from 'drizzle-orm/planetscale-serverless';
// import { DB_HOST, DB_PASSWORD, DB_USERNAME } from "$env/static/private";

const connection = connect({
	host: 'aws.connect.psdb.cloud',
	username: 'mwoacnajeplncbjyvgt2',
	password: 'pscale_pw_8T8D9Z2v6ScD92mYRN4hisPdBWQHSURcdvyKRkKDbwG'
});

export const db = drizzle(connection);

// database: todolist
// username: mwoacnajeplncbjyvgt2
// host: aws.connect.psdb.cloud
// password: pscale_pw_8T8D9Z2v6ScD92mYRN4hisPdBWQHSURcdvyKRkKDbwG
