import * as SQLite from 'expo-sqlite/legacy';

const db = SQLite.openDatabase('teste.db');

// Cria a tabela users, se não existir
export const createTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        user_type TEXT NOT NULL,
        institution TEXT,
        profile_image TEXT
      );`,
      [],
      () => console.log('Tabela users criada com sucesso!'),
      (_, error) => console.error('Erro ao criar tabela:', error)
    );
  });
};

// Insere registros na tabela users
export const insertUser = (user) => {
  const { name, email, password, user_type, institution, profile_image } = user;
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO users (name, email, password, user_type, institution, profile_image) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, password, user_type, institution, profile_image],
      (_, { insertId }) => console.log('Usuário inserido com sucesso!', insertId),
      (_, error) => console.error('Erro ao inserir usuário:', error.message)
    );
  });
};

// Atualiza registros na tabela users
export const updateUser = (id, user) => {
  return new Promise((resolve, reject) => {
    const { name, email, password, user_type, institution, profile_image } = user; 
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE users
         SET name = ?, email = ?, password = ?, user_type = ?, institution = ?, profile_image = ?
         WHERE id = ?`,
        [name, email, password, user_type, institution, profile_image, id],
        () => {
          console.log('Usuário atualizado com sucesso!');
          resolve(); // Resolve a Promise quando a atualização for bem-sucedida
        },
        (_, error) => {
          console.error('Erro ao atualizar usuário:', error.message);
          reject(error); // Rejeita a Promise se houver um erro
        }
      );
    });
  });
};

// Deleta um registro na tabela users
export const deleteUser = (id) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM users WHERE id = ?`,
      [id],
      () => console.log('Usuário deletado com sucesso!'),
      (_, error) => console.error('Erro ao deletar usuário:', error.message)
    );
  });
};

// Verifica as credenciais do usuário para realizar o login
export const verifyUserCredentials = (email, password, successCallback, errorCallback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM users WHERE email = ? AND password = ?`,
      [email, password],
      (_, { rows }) => {
        if (rows.length > 0) {
          successCallback(rows.item(0));
        } else {
          errorCallback('Usuário não encontrado ou senha incorreta.');
        }
      },
      (_, error) => {
        errorCallback('Erro ao verificar credenciais: ' + error.message);
      }
    );
  });
};

export const getUserById = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM users WHERE id = ?`,
      [id],
      (_, { rows: { _array } }) => {
        if (_array.length > 0) {
          callback(_array[0]); // Passa o primeiro usuário encontrado
        } else {
          console.error('Usuário não encontrado');
          callback(null);
        }
      },
      (_, error) => console.error('Erro ao buscar usuário:', error.message)
    );
  });
};

export const createShiftsTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS shifts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
      );`,
      [],
      () => console.log('Tabela shifts criada com sucesso!'),
      (_, error) => console.error('Erro ao criar tabela shifts:', error)
    );
  });
};

export const insertShifts = (shift, callback) => {
  const { name } = shift;
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO shifts (name) VALUES (?)`,
      [name],
      (_, { insertId }) => {
        console.log('Turno inserido com sucesso!', insertId);
        if (callback) callback(null, insertId);
      },
      (_, error) => {
        console.error('Erro ao inserir turno:', error.message);
        if (callback) callback(error);
      }
    );
  });
};

export const fetchShifts = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM shifts;',
      [],
      (_, { rows: { _array } }) => {
        callback(_array); // Retorna os resultados em um array para a função de callback
      },
      (_, error) => {
        console.error('Erro ao buscar turnos:', error);
        callback([]); // Retorna um array vazio em caso de erro
      }
    );
  });
};

// Função para criar a tabela schedules, se necessário
export const createShiftTimesTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS shift_times (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        shift_id INTEGER NOT NULL,
        departure_time TEXT,
        return_time TEXT,
        FOREIGN KEY (shift_id) REFERENCES shifts(id)
      );`,
      [],
      () => {
        console.log('Tabela shift_times criada com sucesso.');
      },
      (_, error) => {
        console.log('Erro ao criar a tabela shift_times:', error);
        return true;
      }
    );
  });
};

export const insertShiftTime = (shiftTime, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO shift_times (shift_id, departure_time, return_time) VALUES (?, ?, ?);`,
      [shiftTime.shift_id, shiftTime.departure_time, shiftTime.return_time],
      (_, { insertId }) => {
        console.log('Horário inserido com sucesso:', insertId);
        if (callback) callback(null, insertId);
      },
      (_, error) => {
        console.log('Erro ao inserir o horário:', error);
        if (callback) callback(error);
        return true;
      }
    );
  });
};

export const fetchShiftTimes = (shiftId, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT * FROM shift_times WHERE shift_id = ?`,
      [shiftId],
      (_, { rows }) => {
        const times = [];
        for (let i = 0; i < rows.length; i++) {
          times.push(rows.item(i));
        }
        callback(times);
      },
      (_, error) => console.error('Erro ao buscar horários:', error.message)
    );
  });
};


export const createSchedulesTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS schedules (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER NOT NULL,
        shift_time_id INTEGER NOT NULL,
        day_of_week TEXT NOT NULL,
        status TEXT DEFAULT 'Ativo',
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY (student_id) REFERENCES users(id),
        FOREIGN KEY (shift_time_id) REFERENCES shift_times(id)
      );`,
      [],
      () => console.log('Tabela schedules criada com sucesso!'),
      (_, error) => console.error('Erro ao criar tabela schedules:', error)
    );
  });
};


export const insertSchedule = ({ student_id, shift_time_id, day_of_week, status }) => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO schedules (student_id, shift_time_id, day_of_week, status) 
         VALUES (?, ?, ?, ?);`,
        [student_id, shift_time_id, day_of_week, status],
        (_, result) => resolve(result),
        (_, error) => reject(error)
      );
    });
  });
};

export const createSendNotificationTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS SendNotification (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sender_id INTEGER NOT NULL,
        recipient_id INTEGER,
        recipient_type TEXT NOT NULL DEFAULT 'student',
        content TEXT NOT NULL,
        sent_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (sender_id) REFERENCES users(id),
        FOREIGN KEY (recipient_id) REFERENCES users(id)
      );`,
      [],
      () => console.log('Tabela SendNotification criada com sucesso!'),
      (_, error) => console.error('Erro ao criar tabela SendNotification:', error)
    );
  });
};

export const insertSendNotification = ({ senderId, recipientId, recipientType, content }) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO SendNotification (sender_id, recipient_id, recipient_type, content)
       VALUES (?, ?, ?, ?)`,
      [senderId, recipientId, recipientType, content],
      (_, result) => {
        console.log('Notificação inserida com sucesso!', result);
      },
      (_, error) => {
        console.error('Erro ao inserir notificação:', error);
      }
    );
  });
};

export const fetchStudents = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT id, name, institution, profile_image FROM users WHERE user_type = 'Estudante';`,
      [],
      (_, { rows: { _array } }) => callback(_array),
      (_, error) => console.error('Erro ao buscar estudantes:', error)
    );
  });
};

// Função para buscar os agendamentos de um turno específico
export const fetchSchedules = (shiftId, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `SELECT s.id, s.student_id, s.shift_time_id, s.day_of_week, s.status, u.profile_image, u.name
       FROM schedules s
       INNER JOIN users u ON s.student_id = u.id
       WHERE s.shift_time_id = ?`,
      [shiftId],
      (_, { rows: { _array } }) => {
        callback(_array); // Retorna os resultados em um array para a função de callback
      },
      (_, error) => {
        console.error('Erro ao buscar agendamentos:', error.message);
        callback([]); // Retorna um array vazio em caso de erro
      }
    );
  });
};

export default db;
