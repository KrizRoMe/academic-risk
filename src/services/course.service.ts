// services/courseService.js

const API_URL = `${process.env.API_BASE_URL}/api/course`;

export async function getCourses() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}