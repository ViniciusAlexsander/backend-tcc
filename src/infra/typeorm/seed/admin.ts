import { v4 as uuidV4 } from 'uuid';
import { hash } from 'bcrypt';

import createConnection from '../index';

async function create() {
  const connection = await createConnection();

  const id = uuidV4();
  const password = await hash('optimusprime', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, user_name, created_at) 
      values('${id}', 'Optimus Prime', 'optimusprime@email.com.br', '${password}', optPrime, 'now()')`,
  );
}

create().then(() => console.log('user Optimus Prime created'));
