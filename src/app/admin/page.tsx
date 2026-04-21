'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Eye,
    EyeOff,
    Save,
    RefreshCw,
    Lock,
    LogOut,
    Github,
    Star,
    ArrowUpDown,
    Check,
    X,
    Loader2,
} from 'lucide-react';
import { toast, Toaster } from 'sonner';

// Types
interface GitHubRepo {
    name: string;
    description: string | null;
    html_url: string;
    homepage: string | null;
    language: string | null;
    stargazers_count: number;
    topics: string[];
    updated_at: string;
}

interface ProjectConfigEntry {
    visible?: boolean;
    category?: string;
    title?: string;
    description?: string;
    order?: number;
}

interface ProjectsConfig {
    repos: Record<string, ProjectConfigEntry>;
}

interface MergedAdminProject {
    repoName: string;
    githubUrl: string;
    language: string | null;
    stars: number;
    topics: string[];
    updatedAt: string;
    // Editable
    visible: boolean;
    category: string;
    title: string;
    description: string;
    order: number;
}

// Utility
function formatTitle(name: string): string {
    return name
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
}

function inferCategory(repo: GitHubRepo): string {
    const lang = (repo.language || '').toLowerCase();
    const topics = repo.topics.map((t) => t.toLowerCase());
    if (topics.includes('machine-learning') || topics.includes('ai') || lang === 'jupyter notebook') return 'AI/ML';
    if (lang === 'typescript' || lang === 'javascript') return 'Web Development';
    if (lang === 'python') return 'Python';
    return 'Project';
}

// Language color map
const LANG_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    'Jupyter Notebook': '#DA5B0B',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Java: '#b07219',
    'C++': '#f34b7d',
    C: '#555555',
    Go: '#00ADD8',
    Rust: '#dea584',
};

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(false);
    const [projects, setProjects] = useState<MergedAdminProject[]>([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    // Auth
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        try {
            const res = await fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });
            if (res.ok) {
                setIsAuthenticated(true);
                sessionStorage.setItem('admin-pw', password);
                toast.success('Welcome back, Admin!');
            } else {
                toast.error('Invalid password');
            }
        } catch {
            toast.error('Connection error');
        } finally {
            setAuthLoading(false);
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setPassword('');
        sessionStorage.removeItem('admin-pw');
        setProjects([]);
    };

    // Check saved session
    useEffect(() => {
        const saved = sessionStorage.getItem('admin-pw');
        if (saved) {
            setPassword(saved);
            fetch('/api/admin/auth', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: saved }),
            }).then((res) => {
                if (res.ok) setIsAuthenticated(true);
                else sessionStorage.removeItem('admin-pw');
            });
        }
    }, []);

    // Fetch repos + config
    const fetchAll = async () => {
        setLoading(true);
        try {
            const pw = sessionStorage.getItem('admin-pw') || password;

            const [reposRes, configRes] = await Promise.all([
                fetch('/api/github/repos'),
                fetch('/api/admin/projects', {
                    headers: { 'x-admin-password': pw },
                }),
            ]);

            const reposData = await reposRes.json();
            const configData: ProjectsConfig = configRes.ok
                ? await configRes.json()
                : { repos: {} };

            const repos: GitHubRepo[] = reposData.repos || [];

            const merged: MergedAdminProject[] = repos.map((repo) => {
                const cfg = configData.repos[repo.name] || {};
                return {
                    repoName: repo.name,
                    githubUrl: repo.html_url,
                    language: repo.language,
                    stars: repo.stargazers_count,
                    topics: repo.topics || [],
                    updatedAt: repo.updated_at,
                    visible: cfg.visible ?? false,
                    category: cfg.category || inferCategory(repo),
                    title: cfg.title || formatTitle(repo.name),
                    description: cfg.description || repo.description || '',
                    order: cfg.order ?? 999,
                };
            });

            // Sort: visible first, then by order
            merged.sort((a, b) => {
                if (a.visible && !b.visible) return -1;
                if (!a.visible && b.visible) return 1;
                return a.order - b.order;
            });

            setProjects(merged);
            setHasChanges(false);
        } catch (err) {
            toast.error('Failed to fetch data');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isAuthenticated) fetchAll();
    }, [isAuthenticated]);

    // Update a project field
    const updateProject = (repoName: string, field: string, value: string | boolean | number) => {
        setProjects((prev) =>
            prev.map((p) =>
                p.repoName === repoName ? { ...p, [field]: value } : p
            )
        );
        setHasChanges(true);
    };

    // Save
    const handleSave = async () => {
        setSaving(true);
        try {
            const pw = sessionStorage.getItem('admin-pw') || password;

            const config: ProjectsConfig = { repos: {} };
            for (const p of projects) {
                if (p.visible || p.category || p.title || p.description) {
                    config.repos[p.repoName] = {
                        visible: p.visible,
                        category: p.category,
                        title: p.title,
                        description: p.description,
                        order: p.order,
                    };
                }
            }

            const res = await fetch('/api/admin/projects', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-admin-password': pw,
                },
                body: JSON.stringify(config),
            });

            if (res.ok) {
                toast.success('Configuration saved successfully!');
                setHasChanges(false);
            } else {
                toast.error('Failed to save');
            }
        } catch {
            toast.error('Save error');
        } finally {
            setSaving(false);
        }
    };

    // Login screen
    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 p-4">
                <Toaster theme="dark" richColors position="top-center" />
                <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.5, ease: 'easeOut' as const }}
                    className="w-full max-w-md"
                >
                    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
                        <div className="mb-8 flex flex-col items-center gap-3">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/25">
                                <Lock className="h-8 w-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Admin Panel</h1>
                            <p className="text-sm text-neutral-400">Enter your password to manage projects</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="relative">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-neutral-500 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                                    autoFocus
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={authLoading || !password}
                                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 font-medium text-white transition-all hover:from-blue-500 hover:to-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {authLoading ? (
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                ) : (
                                    <>
                                        <Lock className="h-4 w-4" />
                                        Sign In
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        );
    }

    // Dashboard
    const visibleCount = projects.filter((p) => p.visible).length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950">
            <Toaster theme="dark" richColors position="top-center" />

            {/* Header */}
            <header className="sticky top-0 z-50 border-b border-white/5 bg-neutral-950/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
                            <Github className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-white">Project Admin</h1>
                            <p className="text-xs text-neutral-500">
                                {visibleCount} of {projects.length} projects visible
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchAll}
                            disabled={loading}
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-neutral-300 transition-all hover:bg-white/10 disabled:opacity-50"
                        >
                            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            Refresh
                        </button>

                        <AnimatePresence>
                            {hasChanges && (
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    onClick={handleSave}
                                    disabled={saving}
                                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-500/20 transition-all hover:from-emerald-500 hover:to-green-500 disabled:opacity-50"
                                >
                                    {saving ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Save className="h-4 w-4" />
                                    )}
                                    Save Changes
                                </motion.button>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 transition-all hover:bg-red-500/20"
                        >
                            <LogOut className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="mx-auto max-w-7xl px-6 py-8">
                {loading ? (
                    <div className="flex items-center justify-center py-32">
                        <div className="flex flex-col items-center gap-4">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                            <p className="text-neutral-400">Loading repositories...</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={project.repoName}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.03 }}
                                className={`group rounded-2xl border transition-all duration-300 ${project.visible
                                        ? 'border-blue-500/20 bg-blue-500/5'
                                        : 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]'
                                    }`}
                            >
                                <div className="p-5">
                                    {/* Top row: Toggle + Repo info */}
                                    <div className="flex items-start gap-4">
                                        {/* Visibility Toggle */}
                                        <button
                                            onClick={() => updateProject(project.repoName, 'visible', !project.visible)}
                                            className={`mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${project.visible
                                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                                                    : 'bg-white/5 text-neutral-500 hover:bg-white/10'
                                                }`}
                                        >
                                            {project.visible ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                                        </button>

                                        {/* Repo info + Editable fields */}
                                        <div className="flex-1 min-w-0 space-y-3">
                                            {/* GitHub repo name + meta */}
                                            <div className="flex flex-wrap items-center gap-2">
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-mono text-neutral-500 hover:text-blue-400 transition-colors"
                                                >
                                                    {project.repoName}
                                                </a>
                                                {project.language && (
                                                    <span className="flex items-center gap-1 text-xs text-neutral-500">
                                                        <span
                                                            className="h-2.5 w-2.5 rounded-full"
                                                            style={{ backgroundColor: LANG_COLORS[project.language] || '#666' }}
                                                        />
                                                        {project.language}
                                                    </span>
                                                )}
                                                {project.stars > 0 && (
                                                    <span className="flex items-center gap-1 text-xs text-amber-400/80">
                                                        <Star className="h-3 w-3" />
                                                        {project.stars}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Editable Title */}
                                            <input
                                                type="text"
                                                value={project.title}
                                                onChange={(e) => updateProject(project.repoName, 'title', e.target.value)}
                                                className="w-full rounded-lg border border-transparent bg-transparent px-0 text-lg font-semibold text-white placeholder:text-neutral-600 focus:border-white/10 focus:bg-white/5 focus:px-3 focus:outline-none transition-all"
                                                placeholder="Project Title"
                                            />

                                            {/* Editable Description */}
                                            <textarea
                                                value={project.description}
                                                onChange={(e) => updateProject(project.repoName, 'description', e.target.value)}
                                                rows={2}
                                                className="w-full resize-none rounded-lg border border-transparent bg-transparent px-0 text-sm text-neutral-400 placeholder:text-neutral-600 focus:border-white/10 focus:bg-white/5 focus:px-3 focus:outline-none transition-all leading-relaxed"
                                                placeholder="Project description..."
                                            />

                                            {/* Category + Order */}
                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-xs text-neutral-500">Category:</label>
                                                    <input
                                                        type="text"
                                                        value={project.category}
                                                        onChange={(e) => updateProject(project.repoName, 'category', e.target.value)}
                                                        className="w-40 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 focus:border-blue-500/50 focus:outline-none transition-all"
                                                        placeholder="e.g., AI/ML"
                                                    />
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <label className="text-xs text-neutral-500">
                                                        <ArrowUpDown className="inline h-3 w-3" /> Order:
                                                    </label>
                                                    <input
                                                        type="number"
                                                        value={project.order}
                                                        onChange={(e) => updateProject(project.repoName, 'order', parseInt(e.target.value) || 0)}
                                                        className="w-20 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-neutral-300 focus:border-blue-500/50 focus:outline-none transition-all"
                                                        min={0}
                                                    />
                                                </div>

                                                {/* Topics */}
                                                {project.topics.length > 0 && (
                                                    <div className="flex flex-wrap gap-1">
                                                        {project.topics.slice(0, 5).map((topic) => (
                                                            <span
                                                                key={topic}
                                                                className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-neutral-500"
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                        {project.topics.length > 5 && (
                                                            <span className="text-[10px] text-neutral-600">
                                                                +{project.topics.length - 5}
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </main>

            {/* Floating save bar */}
            <AnimatePresence>
                {hasChanges && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2"
                    >
                        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-neutral-900/90 px-6 py-3 shadow-2xl backdrop-blur-xl">
                            <span className="text-sm text-neutral-400">You have unsaved changes</span>
                            <button
                                onClick={() => fetchAll()}
                                className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-neutral-400 transition-colors hover:text-white"
                            >
                                <X className="h-4 w-4" />
                                Discard
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2 text-sm font-medium text-white transition-all hover:from-emerald-500 hover:to-green-500 disabled:opacity-50"
                            >
                                {saving ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                    <Check className="h-4 w-4" />
                                )}
                                Save
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
