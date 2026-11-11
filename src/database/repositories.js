import { getDatabase } from './dataBase';

// CREATE
export async function createRepository(fileName, theme) {
  const db = await getDatabase();

  const result = await db.runAsync(
    `INSERT INTO question_repositories (file_name, theme)
     VALUES (?, ?)`,
    fileName,
    theme
  );

  return result.lastInsertRowId;
}

// READ - consultar todos os repositórios
export async function getRepositories() {
  const db = await getDatabase();

  return await db.getAllAsync(
    `SELECT * FROM question_repositories
     ORDER BY created_at DESC`
  );
}

// READ - consultar um repositório pelo ID
export async function getRepositoryById(id) {
  const db = await getDatabase();

  return await db.getFirstAsync(
    `SELECT * FROM question_repositories
     WHERE id = ?`,
    id
  );
}

// UPDATE
export async function updateRepository(id, fileName, theme) {
  const db = await getDatabase();

  return await db.runAsync(
    `UPDATE question_repositories
     SET file_name = ?,
         theme = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    fileName,
    theme,
    id
  );
}

// DELETE
export async function deleteRepository(id) {
  const db = await getDatabase();

  return await db.runAsync(
    `DELETE FROM question_repositories
     WHERE id = ?`,
    id
  );
}
