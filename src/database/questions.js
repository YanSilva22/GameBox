import { getDatabase } from './dataBase';

// CREATE - cadastrar uma pergunta
export async function createQuestion(
  question,
  option1,
  option2,
  option3,
  option4,
  correctAnswer,
  repositoryId
) {
  const db = await getDatabase();

  const result = await db.runAsync(
    `INSERT INTO questions (
      question,
      option1,
      option2,
      option3,
      option4,
      correct_answer,
      repository_id
    )
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    question,
    option1,
    option2,
    option3,
    option4,
    correctAnswer,
    repositoryId
  );

  return result.lastInsertRowId;
}

// CREATE - cadastrar várias perguntas do CSV
export async function createQuestions(questions, repositoryId) {
  const db = await getDatabase();

  await db.withTransactionAsync(async () => {
    for (const item of questions) {
      await db.runAsync(
        `INSERT INTO questions (
          question,
          option1,
          option2,
          option3,
          option4,
          correct_answer,
          repository_id
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        item.question,
        item.option1,
        item.option2,
        item.option3,
        item.option4,
        item.correct_answer,
        repositoryId
      );
    }
  });
}

// READ - consultar todas as perguntas
export async function getQuestions() {
  const db = await getDatabase();

  return await db.getAllAsync(
    `SELECT * FROM questions ORDER BY id`
  );
}

// READ - consultar perguntas de um repositório
export async function getQuestionsByRepository(repositoryId) {
  const db = await getDatabase();

  return await db.getAllAsync(
    `SELECT * FROM questions
     WHERE repository_id = ?
     ORDER BY id`,
    repositoryId
  );
}

// READ - consultar uma pergunta pelo ID
export async function getQuestionById(id) {
  const db = await getDatabase();

  return await db.getFirstAsync(
    `SELECT * FROM questions
     WHERE id = ?`,
    id
  );
}

// READ - consultar perguntas em ordem aleatória
export async function getRandomQuestions(repositoryId, limit) {
  const db = await getDatabase();

  return await db.getAllAsync(
    `SELECT * FROM questions
     WHERE repository_id = ?
     ORDER BY RANDOM()
     LIMIT ?`,
    repositoryId,
    limit
  );
}

// UPDATE
export async function updateQuestion(
  id,
  question,
  option1,
  option2,
  option3,
  option4,
  correctAnswer
) {
  const db = await getDatabase();

  return await db.runAsync(
    `UPDATE questions
     SET question = ?,
         option1 = ?,
         option2 = ?,
         option3 = ?,
         option4 = ?,
         correct_answer = ?,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = ?`,
    question,
    option1,
    option2,
    option3,
    option4,
    correctAnswer,
    id
  );
}

// DELETE
export async function deleteQuestion(id) {
  const db = await getDatabase();

  return await db.runAsync(
    `DELETE FROM questions WHERE id = ?`,
    id
  );
}
