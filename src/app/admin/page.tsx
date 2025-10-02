'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Article } from '@/lib/types';

interface AdminStats {
  queue: {
    pending: number;
    approved: number;
    rejected: number;
    published: number;
  };
  processing: {
    queueStats: {
      pending: number;
      approved: number;
      rejected: number;
      published: number;
    };
    lastRun?: string;
    nextRun?: string;
  };
}

export default function AdminDashboard() {
  const router = useRouter();
  const [articles, setArticles] = useState<Article[]>([]);
  const [publishedArticles, setPublishedArticles] = useState<Article[]>([]);
  const [activeTab, setActiveTab] = useState<'pending' | 'published'>('pending');
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [apiKey, setApiKey] = useState('');

  useEffect(() => {
    if (authenticated && apiKey) {
      fetchData();
    }
  }, [authenticated, apiKey]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const headers: HeadersInit = apiKey ? { 'x-api-key': apiKey } : {};
      const [pendingRes, publishedRes, statsRes] = await Promise.all([
        fetch('/api/admin/articles?type=pending', { headers }),
        fetch('/api/admin/articles?type=published', { headers }),
        fetch('/api/admin/stats', { headers })
      ]);
      
      const pendingData = await pendingRes.json();
      const publishedData = await publishedRes.json();
      const statsData = await statsRes.json();
      
      setArticles(pendingData.articles || []);
      setPublishedArticles(publishedData.articles || []);
      setStats(statsData);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticleAction = async (articleId: string, action: 'approve' | 'reject') => {
    // Optimistic UI update - remove article immediately
    setArticles(prev => prev.filter(article => article.id !== articleId));

    try {
      const response = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({ articleId, action })
      });

      if (response.ok) {
        // Update stats without full refresh
        setStats(prev => prev ? {
          ...prev,
          queue: {
            ...prev.queue,
            pending: Math.max(0, prev.queue.pending - 1),
            [action === 'approve' ? 'approved' : 'rejected']: prev.queue[action === 'approve' ? 'approved' : 'rejected'] + 1
          }
        } : null);
      } else {
        console.error(`Failed to ${action} article`);
        // Rollback on failure
        fetchData();
      }
    } catch (error) {
      console.error('Error processing article:', error);
      // Rollback on failure
      fetchData();
    }
  };

  const triggerScraping = async () => {
    try {
      setProcessing(true);
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: { 'x-api-key': apiKey }
      });
      const result = await response.json();
      
      if (result.success) {
        alert(`Scraping completed! Found ${result.result.queued} new articles`);
        fetchData();
      } else {
        alert('Scraping failed: ' + result.error);
      }
    } catch (error) {
      console.error('Error triggering scraping:', error);
      alert('Failed to trigger scraping');
    } finally {
      setProcessing(false);
    }
  };

  const triggerPublishing = async () => {
    try {
      setPublishing(true);
      const response = await fetch('/api/admin/publish', {
        method: 'POST',
        headers: { 'x-api-key': apiKey }
      });
      const result = await response.json();
      
      if (result.success) {
        alert(`Publishing completed! Published ${result.result.published} articles to your blog`);
        fetchData();
      } else {
        alert('Publishing failed: ' + result.error);
      }
    } catch (error) {
      console.error('Error triggering publishing:', error);
      alert('Failed to trigger publishing');
    } finally {
      setPublishing(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        setApiKey(data.apiKey);
        setAuthenticated(true);
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert('Login failed');
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setUsername('');
    setPassword('');
    setApiKey('');
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-tp-background flex items-center justify-center">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <img
              src="/images/techpulsedaily.png"
              alt="TechPulse Daily"
              className="tp-logo-large mx-auto mb-6"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-tp-primary">
              Admin Login
            </h2>
            <p className="mt-2 text-tp-text-secondary text-sm">
              Access the TechPulse Daily admin dashboard
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <input
              type="text"
              required
              className="appearance-none rounded-md relative block w-full px-4 py-3 bg-tp-surface border border-tp-border placeholder-tp-text-muted text-tp-text-primary focus:outline-none focus:ring-2 focus:ring-tp-primary focus:border-tp-primary sm:text-sm"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              required
              className="appearance-none rounded-md relative block w-full px-4 py-3 bg-tp-surface border border-tp-border placeholder-tp-text-muted text-tp-text-primary focus:outline-none focus:ring-2 focus:ring-tp-primary focus:border-tp-primary sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="tp-btn-primary w-full justify-center py-3"
            >
              <i className="fas fa-sign-in-alt mr-2"></i>
              Sign in
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-tp-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-tp-border border-t-tp-primary mx-auto"></div>
          <p className="mt-2 text-tp-text-secondary">Loading TechPulse Admin Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-tp-background">
      {/* Header */}
      <header className="tp-nav border-b border-tp-border">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-tp-text-primary">Admin Dashboard</h1>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={triggerPublishing}
                disabled={publishing || (stats?.queue?.approved === 0)}
                className="tp-btn-primary disabled:opacity-50"
              >
                <i className="fas fa-upload mr-2"></i>
                {publishing ? 'Publishing...' : `Publish Articles (${stats?.queue?.approved || 0})`}
              </button>
              <button
                onClick={triggerScraping}
                disabled={processing}
                className="tp-btn-secondary disabled:opacity-50"
              >
                <i className="fas fa-sync-alt mr-2"></i>
                {processing ? 'Scraping...' : 'Trigger Scraping'}
              </button>
              <button
                onClick={handleLogout}
                className="tp-btn-danger"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Stats Dashboard */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="tp-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-tp-text-primary">Pending Review</h3>
                  <i className="fas fa-clock text-orange-500 text-xl"></i>
                </div>
                <p className="text-3xl font-bold text-orange-500">{stats.queue.pending}</p>
                <p className="text-tp-text-muted text-sm mt-1">Articles awaiting review</p>
              </div>
            </div>
            <div className="tp-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-tp-text-primary">Approved</h3>
                  <i className="fas fa-check text-tp-primary text-xl"></i>
                </div>
                <p className="text-3xl font-bold text-tp-primary">{stats.queue.approved}</p>
                <p className="text-tp-text-muted text-sm mt-1">Ready to publish</p>
              </div>
            </div>
            <div className="tp-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-tp-text-primary">Published</h3>
                  <i className="fas fa-globe text-blue-500 text-xl"></i>
                </div>
                <p className="text-3xl font-bold text-blue-500">{stats.queue.published}</p>
                <p className="text-tp-text-muted text-sm mt-1">Live on website</p>
              </div>
            </div>
            <div className="tp-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-tp-text-primary">Rejected</h3>
                  <i className="fas fa-times text-red-500 text-xl"></i>
                </div>
                <p className="text-3xl font-bold text-red-500">{stats.queue.rejected}</p>
                <p className="text-tp-text-muted text-sm mt-1">Not suitable</p>
              </div>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="tp-card mb-6">
          <div className="border-b border-tp-border">
            <nav className="-mb-px flex">
              <button
                onClick={() => setActiveTab('pending')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'pending'
                    ? 'border-tp-primary text-tp-primary'
                    : 'border-transparent text-tp-text-muted hover:text-tp-text-secondary hover:border-tp-border-light'
                }`}
              >
                <i className="fas fa-clock mr-2"></i>
                Pending Review ({articles.length})
              </button>
              <button
                onClick={() => setActiveTab('published')}
                className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'published'
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-tp-text-muted hover:text-tp-text-secondary hover:border-tp-border-light'
                }`}
              >
                <i className="fas fa-globe mr-2"></i>
                Published Archive ({publishedArticles.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="divide-y divide-tp-border">
            {activeTab === 'pending' ? (
              articles.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <i className="fas fa-inbox text-4xl text-tp-text-muted mb-4"></i>
                  <p className="text-tp-text-muted text-lg">No articles pending review</p>
                  <p className="text-tp-text-muted text-sm mt-2">Try triggering a scraping cycle to find new content</p>
                </div>
              ) : (
                articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onAction={handleArticleAction}
                    isPublished={false}
                  />
                ))
              )
            ) : (
              publishedArticles.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <i className="fas fa-newspaper text-4xl text-tp-text-muted mb-4"></i>
                  <p className="text-tp-text-muted text-lg">No articles published yet</p>
                  <p className="text-tp-text-muted text-sm mt-2">Approve some pending articles to get started</p>
                </div>
              ) : (
                publishedArticles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onAction={() => {}}
                    isPublished={true}
                  />
                ))
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 60);
}

function ArticleCard({
  article,
  onAction,
  isPublished = false
}: {
  article: Article;
  onAction: (id: string, action: 'approve' | 'reject') => void;
  isPublished?: boolean;
}) {
  const qualityColor = (score?: number) => {
    if (!score) return 'text-tp-text-muted';
    if (score >= 8) return 'text-tp-primary';
    if (score >= 6) return 'text-orange-500';
    return 'text-red-500';
  };

  return (
    <div className="px-6 py-6 hover:bg-tp-surface transition-colors">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-tp-text-primary flex-1 mr-4 leading-tight">
          {article.title}
        </h3>
        <div className="flex space-x-2 flex-shrink-0">
          {isPublished ? (
            <div className="flex items-center space-x-2">
              <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <i className="fas fa-check mr-1"></i>
                Published
              </span>
              <a
                href={`/posts/${generateSlug(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-tp-secondary hover:bg-tp-secondary-light text-tp-text-primary px-3 py-1 rounded text-sm transition-colors"
              >
                <i className="fas fa-external-link-alt mr-1"></i>
                View Post
              </a>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => onAction(article.id, 'approve')}
                className="bg-tp-primary hover:bg-tp-primary-light text-tp-secondary-dark px-3 py-1 rounded text-sm transition-colors font-medium"
              >
                <i className="fas fa-check mr-1"></i>
                Approve
              </button>
              <button
                onClick={() => onAction(article.id, 'reject')}
                className="tp-btn-danger text-white px-3 py-1 rounded text-sm transition-colors font-medium"
              >
                <i className="fas fa-times mr-1"></i>
                Reject
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-tp-text-muted mb-4">
        <span className="flex items-center">
          <i className="fas fa-external-link-alt mr-1 text-xs"></i>
          <strong>Source:</strong> {article.source}
        </span>
        <span className="flex items-center">
          <i className="fas fa-arrow-up mr-1 text-xs"></i>
          <strong>Score:</strong> {Number(article.score).toFixed(2)}
        </span>
        <span className={`flex items-center font-medium ${qualityColor(article.qualityScore)}`}>
          <i className="fas fa-star mr-1 text-xs"></i>
          <strong>Quality:</strong> {article.qualityScore?.toFixed(1) || 'N/A'}/10
        </span>
        <span className="flex items-center">
          <i className="fas fa-calendar mr-1 text-xs"></i>
          <strong>Published:</strong> {new Date(article.publishedAt).toLocaleDateString()}
        </span>
      </div>

      {article.summary && (
        <div className="mb-4">
          <h4 className="font-semibold text-tp-text-primary mb-2 flex items-center">
            <i className="fas fa-align-left mr-2 text-tp-primary"></i>
            Summary:
          </h4>
          <p className="text-tp-text-secondary text-sm leading-relaxed bg-tp-surface/50 p-3 rounded-md border-l-3 border-tp-primary/50">
            {article.summary}
          </p>
        </div>
      )}

      <div className="flex flex-wrap gap-2 mb-4">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="tp-tag text-xs"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-tp-border">
        <a
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-tp-primary hover:text-tp-primary-light text-sm transition-colors flex items-center font-medium"
        >
          <i className="fas fa-newspaper mr-2"></i>
          Read Original Article
          <i className="fas fa-external-link-alt ml-2 text-xs"></i>
        </a>
        <span className="text-tp-text-muted text-xs">
          ID: {article.id.slice(-8)}
        </span>
      </div>
    </div>
  );
}