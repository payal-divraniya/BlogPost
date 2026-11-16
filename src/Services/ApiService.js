// Frontend-only data layer. All blog data is stored in this browser's LocalStorage.
const POSTS_KEY = "blogPosts";
const DEFAULT_POSTS = [
  { id: "sample_1", title: "Getting Started with Modern React", des: "Explore component-driven development, reusable UI patterns, and practical ways to structure a React application for maintainability.", img: new URL("../assets/post1.jpg", import.meta.url).href },
  { id: "sample_2", title: "Designing Better Digital Experiences", des: "Thoughtful typography, accessible contrast, and clear interactions help turn a functional interface into an enjoyable product.", img: new URL("../assets/post2.jpg", import.meta.url).href },
  { id: "sample_3", title: "A Practical Guide to Web Performance", des: "Learn how smaller assets, efficient rendering, and careful loading strategies can make websites feel faster and more responsive.", img: new URL("../assets/post3.jpg", import.meta.url).href },
];

function readPosts() {
  try {
    const saved = JSON.parse(localStorage.getItem(POSTS_KEY));
    if (Array.isArray(saved)) return saved;
  } catch (error) { console.warn("Could not read saved blog posts:", error); }
  localStorage.setItem(POSTS_KEY, JSON.stringify(DEFAULT_POSTS));
  return DEFAULT_POSTS;
}
function savePosts(posts) {
  try { localStorage.setItem(POSTS_KEY, JSON.stringify(posts)); return true; }
  catch (error) { console.error("Could not save blog posts:", error); throw new Error("Browser storage is full. Try using a smaller cover image."); }
}

export const authApi = {
  async generateOtp() { return { success: true, otp: String(Math.floor(1000 + Math.random() * 9000)) }; },
};

export const postsApi = {
  async getAll() { return readPosts(); },
  async getById(id) { return readPosts().find((post) => String(post.id) === String(id)) || null; },
  async create(postData) {
    const post = { id: `post_${Date.now()}`, ...postData, createdAt: new Date().toISOString() };
    savePosts([post, ...readPosts()]); return post;
  },
  async update(id, postData) {
    const posts = readPosts().map((post) => String(post.id) === String(id) ? { ...post, ...postData } : post);
    savePosts(posts); return posts.find((post) => String(post.id) === String(id)) || null;
  },
  async delete(id) { savePosts(readPosts().filter((post) => String(post.id) !== String(id))); return { success: true }; },
  async getExplore({ query = "", page = 1, limit = 6 } = {}) {
    const normalized = query.trim().toLowerCase();
    const filtered = readPosts().filter((post) => `${post.title || ""} ${post.des || post.body || ""}`.toLowerCase().includes(normalized));
    const start = (page - 1) * limit;
    return { posts: filtered.slice(start, start + limit), total: filtered.length, page, totalPages: Math.max(1, Math.ceil(filtered.length / limit)) };
  },
};

export async function getApi() { return []; }
export default { authApi, postsApi, getApi };
