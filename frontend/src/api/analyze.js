import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Helper function to get authorization headers with JWT token
 * @returns {object} headers with Authorization bearer token
 */
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
  };
}

/**
 * POST /analyze
 * @param {string} idea
 * @param {number} budget
 * @returns {Promise<object>} analysis result
 */
export async function analyzeStartup(idea, budget) {
  const response = await axios.post(`${API_BASE}/analyze`, {
    idea: idea.trim(),
    budget: parseInt(budget, 10),
  }, {
    headers: getAuthHeaders(),
    timeout: 120000, // 2 minutes – LLM calls can be slow
  });

  if (response.data?.error) {
    throw new Error(response.data.error);
  }

  return response.data;
}

/**
 * POST /improve
 * Improve the startup plan based on critique feedback
 * @param {string} idea
 * @param {number} budget
 * @param {object} previous_plan
 * @param {object} previous_critique
 * @returns {Promise<object>} improved plan result
 */
export async function improvePlan(idea, budget, previous_plan, previous_critique) {
  const response = await axios.post(`${API_BASE}/improve`, {
    idea: idea.trim(),
    budget: parseInt(budget, 10),
    previous_plan,
    previous_critique,
  }, {
    headers: getAuthHeaders(),
    timeout: 120000, // 2 minutes – LLM calls can be slow
  });

  if (response.data?.error) {
    throw new Error(response.data.error);
  }

  return response.data;
}

/**
 * GET /history
 * Fetch last 10 analyses
 * @returns {Promise<object>} history result
 */
export async function getHistory() {
  const response = await axios.get(`${API_BASE}/history`, {
    headers: getAuthHeaders(),
    timeout: 30000,
  });

  if (response.data?.error) {
    throw new Error(response.data.error);
  }

  return response.data;
}

/**
 * GET /history/{id}
 * Fetch a specific analysis by ID
 * @param {number} id - Analysis ID
 * @returns {Promise<object>} full analysis result
 */
export async function getAnalysisById(id) {
  const response = await axios.get(`${API_BASE}/history/${id}`, {
    headers: getAuthHeaders(),
    timeout: 30000,
  });

  if (response.data?.error) {
    throw new Error(response.data.error);
  }

  return response.data;
}

/**
 * DELETE /history/{id}
 * Delete a specific analysis by ID
 * @param {number} id - Analysis ID
 * @returns {Promise<object>} delete result
 */
export async function deleteAnalysis(id) {
  const response = await axios.delete(`${API_BASE}/history/${id}`, {
    headers: getAuthHeaders(),
    timeout: 30000,
  });

  if (response.data?.error) {
    throw new Error(response.data.error);
  }

  return response.data;
}
