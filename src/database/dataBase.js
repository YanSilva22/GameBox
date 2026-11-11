import * as SQLite from 'expo-sqlite';

let database;

export async function getDatabase() {
  if (!database) {
    database = await SQLite.openDatabaseAsync('gamebox.db');

    await database.execAsync(`
      PRAGMA foreign_keys = ON;

      CREATE TABLE IF NOT EXISTS question_repositories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        file_name TEXT NOT NULL,
        theme TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question TEXT NOT NULL,
        option1 TEXT NOT NULL,
        option2 TEXT NOT NULL,
        option3 TEXT NOT NULL,
        option4 TEXT NOT NULL,
        correct_answer TEXT NOT NULL
          CHECK(correct_answer IN ('A', 'B', 'C', 'D')),
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
        repository_id INTEGER NOT NULL,

        FOREIGN KEY (repository_id)
          REFERENCES question_repositories(id)
          ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS teams (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        member_count INTEGER NOT NULL DEFAULT 1
      );

      CREATE TABLE IF NOT EXISTS matches (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ended_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
        repository_id INTEGER,
        team1_id INTEGER NOT NULL,
        team2_id INTEGER NOT NULL,
        winner_team_id INTEGER NOT NULL,

        FOREIGN KEY (repository_id)
          REFERENCES question_repositories(id)
          ON DELETE SET NULL,

        FOREIGN KEY (team1_id)
          REFERENCES teams(id),

        FOREIGN KEY (team2_id)
          REFERENCES teams(id),

        FOREIGN KEY (winner_team_id)
          REFERENCES teams(id),

        CHECK(team1_id != team2_id),
        CHECK(winner_team_id = team1_id OR winner_team_id = team2_id)
      );

      CREATE TABLE IF NOT EXISTS match_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        match_id INTEGER NOT NULL,
        team_id INTEGER NOT NULL,
        score INTEGER NOT NULL DEFAULT 0,

        FOREIGN KEY (match_id)
          REFERENCES matches(id)
          ON DELETE CASCADE,

        FOREIGN KEY (team_id)
          REFERENCES teams(id),

        UNIQUE(match_id, team_id)
      );

      CREATE TABLE IF NOT EXISTS match_modes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        match_id INTEGER NOT NULL,
        mode TEXT NOT NULL,

        FOREIGN KEY (match_id)
          REFERENCES matches(id)
          ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_questions_repository
      ON questions(repository_id);

      CREATE INDEX IF NOT EXISTS idx_matches_ended_at
      ON matches(ended_at);
    `);
  }

  return database;
}

export async function checkTables() {
  const db = await getDatabase();

  const tables = await db.getAllAsync(`
    SELECT name
    FROM sqlite_master
    WHERE type = 'table'
    ORDER BY name;
  `);

  console.log('Created tables:', tables);

  return tables;
}