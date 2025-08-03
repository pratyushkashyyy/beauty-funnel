import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';

const DB_PATH = path.join(process.cwd(), 'data', 'quiz_database.db');

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  sessionId: string;
  fingerprint: string;
  deviceInfo: string;
  createdAt: string;
  updatedAt: string;
}

export interface QuizResponse {
  id: string;
  userId: string;
  questionId: string;
  questionTitle: string;
  answer: string;
  timestamp: string;
}

export interface UserImage {
  id: string;
  userId: string;
  imagePath: string;
  imageType: string;
  createdAt: string;
}

let db: any = null;

export async function getDatabase() {
  if (db) {
    return db;
  }

  db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  // Create tables if they don't exist
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      sessionId TEXT NOT NULL,
      fingerprint TEXT NOT NULL,
      deviceInfo TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS quiz_responses (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      questionId TEXT NOT NULL,
      questionTitle TEXT NOT NULL,
      answer TEXT NOT NULL,
      timestamp TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS user_images (
      id TEXT PRIMARY KEY,
      userId TEXT NOT NULL,
      imagePath TEXT NOT NULL,
      imageType TEXT NOT NULL,
      createdAt TEXT NOT NULL,
      FOREIGN KEY (userId) REFERENCES users (id)
    )
  `);

  return db;
}

export async function createUser(userData: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const db = await getDatabase();
  const id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date().toISOString();

  await db.run(
    'INSERT INTO users (id, name, email, phone, sessionId, fingerprint, deviceInfo, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [id, userData.name, userData.email, userData.phone, userData.sessionId, userData.fingerprint, userData.deviceInfo, now, now]
  );

  return id;
}

export async function saveQuizResponse(response: Omit<QuizResponse, 'id'>): Promise<string> {
  const db = await getDatabase();
  const id = `response_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  await db.run(
    'INSERT INTO quiz_responses (id, userId, questionId, questionTitle, answer, timestamp) VALUES (?, ?, ?, ?, ?, ?)',
    [id, response.userId, response.questionId, response.questionTitle, response.answer, response.timestamp]
  );

  return id;
}

export async function saveUserImage(imageData: Omit<UserImage, 'id' | 'createdAt'>): Promise<string> {
  const db = await getDatabase();
  const id = `image_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date().toISOString();

  await db.run(
    'INSERT INTO user_images (id, userId, imagePath, imageType, createdAt) VALUES (?, ?, ?, ?, ?)',
    [id, imageData.userId, imageData.imagePath, imageData.imageType, now]
  );

  return id;
}

export async function getUserBySessionId(sessionId: string): Promise<UserData | null> {
  const db = await getDatabase();
  const user = await db.get('SELECT * FROM users WHERE sessionId = ?', [sessionId]);
  return user || null;
}

export async function getUserQuizResponses(userId: string): Promise<QuizResponse[]> {
  const db = await getDatabase();
  return await db.all('SELECT * FROM quiz_responses WHERE userId = ? ORDER BY timestamp ASC', [userId]);
}

export async function getUserImages(userId: string): Promise<UserImage[]> {
  const db = await getDatabase();
  return await db.all('SELECT * FROM user_images WHERE userId = ? ORDER BY createdAt ASC', [userId]);
}

export async function getAllUsers(): Promise<UserData[]> {
  const db = await getDatabase();
  return await db.all('SELECT * FROM users ORDER BY createdAt DESC');
}

export async function getAllQuizResponses(): Promise<QuizResponse[]> {
  const db = await getDatabase();
  return await db.all('SELECT * FROM quiz_responses ORDER BY timestamp DESC');
}

export async function getAllUserImages(): Promise<UserImage[]> {
  const db = await getDatabase();
  return await db.all('SELECT * FROM user_images ORDER BY createdAt DESC');
}

export async function updateUser(userId: string, userData: Partial<Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>>): Promise<void> {
  const db = await getDatabase();
  const now = new Date().toISOString();
  
  const updateFields = [];
  const values = [];
  
  if (userData.name) {
    updateFields.push('name = ?');
    values.push(userData.name);
  }
  if (userData.email) {
    updateFields.push('email = ?');
    values.push(userData.email);
  }
  if (userData.phone) {
    updateFields.push('phone = ?');
    values.push(userData.phone);
  }
  if (userData.fingerprint) {
    updateFields.push('fingerprint = ?');
    values.push(userData.fingerprint);
  }
  if (userData.deviceInfo) {
    updateFields.push('deviceInfo = ?');
    values.push(userData.deviceInfo);
  }
  
  updateFields.push('updatedAt = ?');
  values.push(now);
  values.push(userId);
  
  const query = `UPDATE users SET ${updateFields.join(', ')} WHERE id = ?`;
  await db.run(query, values);
}

export async function getCompleteUserData(userId: string) {
  const db = await getDatabase();
  const user = await db.get('SELECT * FROM users WHERE id = ?', [userId]);
  const responses = await db.all('SELECT * FROM quiz_responses WHERE userId = ? ORDER BY timestamp ASC', [userId]);
  const images = await db.all('SELECT * FROM user_images WHERE userId = ? ORDER BY createdAt ASC', [userId]);

  return {
    user,
    responses,
    images
  };
} 