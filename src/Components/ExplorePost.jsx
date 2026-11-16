
import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { toggleTheame } from "../Context/TheameContextProvider";
import Pagination from "./Pagination";
import "../Styles/ExplorePost.css";

const POSTS_PER_PAGE = 6;
const API_URL = "https://dummyjson.com/posts?limit=150";

const samplePosts = [
  {
    id: "local-1",
    title: "The Future of Artificial Intelligence",
    category: "Technology",
    author: "Alex Morgan",
    readTime: "5 min read",
    body: "Artificial Intelligence is transforming the way people work, learn, and communicate. From intelligent assistants to automated business processes, AI is becoming an important part of modern technology. As AI continues to develop, it will create new opportunities while also introducing challenges related to privacy, security, and responsible use.",
    image: "photo-1677442136019-21780ecad995",
  },
  {
    id: "local-2",
    title: "How to Build a Successful Daily Routine",
    category: "Lifestyle",
    author: "Sophia Williams",
    readTime: "4 min read",
    body: "A successful daily routine starts with understanding your priorities. Planning your day, setting realistic goals, taking breaks, and maintaining consistency can improve productivity. Start with small habits and gradually build a routine that supports your personal and professional growth.",
    image: "photo-1499750310107-5fef28a66643",
  },
  {
    id: "local-3",
    title: "Getting Started with React.js",
    category: "Development",
    author: "Daniel Smith",
    readTime: "6 min read",
    body: "React is a popular JavaScript library for building interactive user interfaces. It allows developers to create reusable components and manage application data efficiently. Beginners can start by learning JSX, components, props, state, and hooks before moving on to routing and API integration.",
    image: "photo-1633356122544-f134324a6cee",
  },
  {
    id: "local-4",
    title: "Simple Ways to Improve Your Productivity",
    category: "Productivity",
    author: "Emma Brown",
    readTime: "3 min read",
    body: "Productivity is not about doing everything at once. It is about focusing on the right tasks. Create a priority list, avoid unnecessary distractions, divide large tasks into smaller steps, and review your progress regularly. Consistent improvements can make a significant difference over time.",
    image: "photo-1454165804606-c3d57bc86b40",
  },
  {
    id: "local-5",
    title: "Understanding Modern Web Design",
    category: "Design",
    author: "Olivia Taylor",
    readTime: "5 min read",
    body: "Modern web design focuses on usability, accessibility, responsive layouts, and visual clarity. A good website should be easy to navigate on different screen sizes. Consistent typography, spacing, colors, and meaningful visual elements help create a better user experience.",
    image: "photo-1498050108023-c5249f4df085",
  },
  {
    id: "local-6",
    title: "Why Learning JavaScript Matters",
    category: "Development",
    author: "James Wilson",
    readTime: "4 min read",
    body: "JavaScript is one of the core technologies of web development. It adds interactivity to websites and is widely used in frontend and backend development. Learning variables, functions, arrays, objects, asynchronous programming, and DOM manipulation provides a strong foundation for building applications.",
    image: "photo-1516321318423-f06f85e504b3",
  },
  {
    id: "local-7",
    title: "The Importance of Continuous Learning",
    category: "Education",
    author: "Mia Anderson",
    readTime: "4 min read",
    body: "Technology and professional requirements continue to change. Continuous learning helps people adapt, develop new skills, and stay confident in their careers. Reading, practicing, building projects, and learning from feedback are useful ways to keep improving.",
    image: "photo-1516321318423-f06f85e504b3",
  },
  {
    id: "local-8",
    title: "Building Better User Experiences",
    category: "Design",
    author: "Noah Martin",
    readTime: "5 min read",
    body: "User experience is about making digital products useful, accessible, and easy to understand. Developers and designers should consider user needs, clear navigation, readable content, and helpful feedback. Testing with real users can reveal problems that might otherwise go unnoticed.",
    image: "photo-1559028012-481c04fa702d",
  },
  {
    id: "local-9",
    title: "Exploring the World of Cloud Computing",
    category: "Technology",
    author: "Isabella Clark",
    readTime: "6 min read",
    body: "Cloud computing provides access to computing resources over the internet. Businesses use cloud services for hosting applications, storing information, and scaling their infrastructure. Understanding cloud platforms and deployment basics can be valuable for modern software developers.",
    image: "photo-1451187580459-43490279c0fa",
  },
  {
    id: "local-10",
    title: "How to Stay Motivated While Learning to Code",
    category: "Education",
    author: "Ethan Lewis",
    readTime: "4 min read",
    body: "Learning programming takes patience and practice. Set achievable goals, work on small projects, understand errors instead of avoiding them, and celebrate progress. Joining developer communities and sharing your work can also help you stay motivated.",
    image: "photo-1516321318423-f06f85e504b3",
  },
  {
    id: "local-11",
    title: "Introduction to Responsive Web Development",
    category: "Development",
    author: "Ava Walker",
    readTime: "5 min read",
    body: "Responsive web development ensures that websites work across phones, tablets, and desktop screens. Flexible layouts, CSS media queries, responsive images, and accessible navigation are important parts of the process. Testing at different screen sizes helps identify layout problems.",
    image: "photo-1460925895917-afdab827c52f",
  },
  {
    id: "local-12",
    title: "The Benefits of Reading Every Day",
    category: "Lifestyle",
    author: "William Hall",
    readTime: "3 min read",
    body: "Reading regularly can improve knowledge, vocabulary, concentration, and creativity. Even a few minutes each day can help build a lasting habit. Choose topics that interest you and set a realistic reading target that fits your schedule.",
    image: "photo-1507842217343-583bb7270b66",
  },
  {
    id: "local-13",
    title: "Getting Started with Git and GitHub",
    category: "Technology",
    author: "Grace Young",
    readTime: "5 min read",
    body: "Git is a version control system that helps developers track changes in their code. GitHub provides a platform to host repositories and collaborate on projects. Learning commits, branches, pushes, pulls, and pull requests is useful for managing software projects.",
    image: "photo-1556075798-4825dfaaf498",
  },
  {
    id: "local-14",
    title: "Creating a Portfolio That Gets Noticed",
    category: "Career",
    author: "Lucas Allen",
    readTime: "4 min read",
    body: "A strong developer portfolio should clearly present your skills and projects. Include a short introduction, selected projects, technologies used, working demo links, and source code where appropriate. Keep the design simple and make sure every link works correctly.",
    image: "photo-1467232004584-a241de8bcf5d",
  },
  {
    id: "local-15",
    title: "Why Cybersecurity Matters Today",
    category: "Technology",
    author: "Amelia King",
    readTime: "5 min read",
    body: "Cybersecurity helps protect systems, networks, and personal information from digital threats. Strong passwords, multi-factor authentication, software updates, and awareness of suspicious messages are important security practices. Developers should also consider security throughout the application development process.",
    image: "photo-1550751827-4bd374c3f58b",
  },
];

const apiImages = [
  "photo-1498050108023-c5249f4df085",
  "photo-1518770660439-4636190af475",
  "photo-1519389950473-47ba0277781c",
  "photo-1497366754035-f200968a6e72",
  "photo-1500530855697-b586d89ba3ee",
  "photo-1516321318423-f06f85e504b3",
  "photo-1486406146926-c627a92ad1ab",
  "photo-1509391366360-2e959784a276",
  "photo-1517248135467-4c7edcad34c4",
  "photo-1497366216548-37526070297c",
];

const shufflePosts = (posts) => {
  const shuffled = [...posts];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const getReadTime = (body = "") => {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
};

const getArticleImage = (post) => {
  if (post.image) {
    return `https://images.unsplash.com/${post.image}?auto=format&fit=crop&w=900&q=85`;
  }

  return "https://placehold.co/900x500/e8edf5/526174?text=Article+Image";
};

const ExplorePost = () => {
  const { mode } = useContext(toggleTheame);
  const isDarkMode = mode === "dark";

  const [posts, setPosts] = useState(samplePosts);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const fetchDummyPosts = async () => {
    try {
      setLoading(true);
      setApiError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Unable to fetch articles from the API.");
      }

      const data = await response.json();

      const apiPosts = data.posts.map((post, index) => {
        const body = post.body || "";
        const firstTag = post.tags?.[0];

        return {
          id: `api-${post.id}`,
          title: post.title || "Untitled Article",
          category: firstTag
            ? firstTag.charAt(0).toUpperCase() + firstTag.slice(1)
            : "General",
          author: `Guest Author ${post.userId}`,
          readTime: getReadTime(body),
          body,
          image: apiImages[index % apiImages.length],
        };
      });

      setPosts(shufflePosts([...samplePosts, ...apiPosts]));
    } catch (error) {
      console.error("DummyJSON API error:", error);

      setApiError(
        "Unable to load additional articles. Showing your saved sample articles."
      );

      setPosts(shufflePosts(samplePosts));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDummyPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    if (!searchText) return posts;

    return posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(searchText) ||
        post.category.toLowerCase().includes(searchText) ||
        post.author.toLowerCase().includes(searchText) ||
        post.body.toLowerCase().includes(searchText)
      );
    });
  }, [posts, search]);

  const totalPage = Math.max(
    1,
    Math.ceil(filteredPosts.length / POSTS_PER_PAGE)
  );

  const visiblePosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const discoverNewArticles = () => {
    setSearch("");
    setCurrentPage(1);
    setSelectedArticle(null);
    fetchDummyPosts();
  };

  const handleImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src =
      "https://placehold.co/900x500/e8edf5/526174?text=Article+Image";
  };

  const nextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPage));
  };

  const prevPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  return (
    <div
      className={`explore-container ${
        isDarkMode ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="explore-header">
        <div>
          <h1>Explore Articles</h1>
          <p>
            Discover ideas, stories, and knowledge from our community.
          </p>
        </div>

        <button
          type="button"
          className="discover-btn"
          onClick={discoverNewArticles}
          disabled={loading}
        >
          {loading ? "Loading Articles..." : "Discover New Articles"}
        </button>
      </div>

      <div className="explore-search">
        <input
          type="text"
          placeholder="Search articles, categories, or authors..."
          value={search}
          onChange={(event) => handleSearch(event.target.value)}
        />
      </div>

      {apiError && (
        <p className="explore-api-error">{apiError}</p>
      )}

      {loading && (
        <p className="explore-loading">Loading articles...</p>
      )}

      <div className="explore-post-grid">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => (
            <article className="explore-post-card" key={post.id}>
              <div className="explore-post-image">
                <img
                  src={getArticleImage(post)}
                  alt={post.title}
                  onError={handleImageError}
                  loading="lazy"
                />
              </div>

              <div className="explore-post-content">
                <span className="explore-category">
                  {post.category}
                </span>

                <h2>{post.title}</h2>

                <p className="explore-post-description">
                  {post.body.slice(0, 120)}...
                </p>

                <div className="explore-post-meta">
                  <span>{post.author}</span>
                  <span>{post.readTime}</span>
                </div>

                <button
                  type="button"
                  className="read-more-btn"
                  onClick={() => setSelectedArticle(post)}
                >
                  Read More
                </button>
              </div>
            </article>
          ))
        ) : (
          !loading && (
            <div className="explore-no-results">
              <h3>No articles found</h3>
              <p>Try searching with another keyword.</p>
            </div>
          )
        )}
      </div>

      {filteredPosts.length > POSTS_PER_PAGE && (
        <Pagination
          prevPage={prevPage}
          nextPage={nextPage}
          currentPage={currentPage}
          totalPage={totalPage}
        />
      )}

      {selectedArticle && (
        <div
          className="article-modal-overlay"
          onClick={() => setSelectedArticle(null)}
        >
          <div
            className="article-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="article-modal-close"
              onClick={() => setSelectedArticle(null)}
              aria-label="Close article"
            >
              &times;
            </button>

            <img
              className="article-modal-image"
              src={getArticleImage(selectedArticle)}
              alt={selectedArticle.title}
              onError={handleImageError}
            />

            <div className="article-modal-content">
              <span className="explore-category">
                {selectedArticle.category}
              </span>

              <h2>{selectedArticle.title}</h2>

              <div className="explore-post-meta">
                <span>By {selectedArticle.author}</span>
                <span>{selectedArticle.readTime}</span>
              </div>

              <p>{selectedArticle.body}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExplorePost;
