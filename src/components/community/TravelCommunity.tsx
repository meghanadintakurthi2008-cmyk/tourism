import React, { useState } from 'react';
import { 
  Users, 
  Heart, 
  MessageCircle, 
  Bookmark, 
  Share2, 
  Plus, 
  Star, 
  MapPin, 
  Sparkles, 
  Camera, 
  X,
  Send
} from 'lucide-react';
import { CommunityPost } from '../../types';
import { COMMUNITY_POSTS } from '../../data/communityData';

export const TravelCommunity: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(COMMUNITY_POSTS);
  const [modalOpen, setModalOpen] = useState(false);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newDestination, setNewDestination] = useState('Araku Valley');
  const [newRating, setNewRating] = useState(5);

  const toggleLike = (id: string) => {
    setPosts(posts.map(p => {
      if (p.id === id) {
        const isLiked = !p.isLiked;
        return {
          ...p,
          isLiked,
          likes: isLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      author: {
        name: 'Meghana R. (You)',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        badge: 'Verified Explorer',
        location: 'Hyderabad, India'
      },
      destination: newDestination,
      title: newTitle.trim(),
      content: newContent.trim(),
      image: 'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1000&q=80',
      rating: newRating,
      likes: 1,
      isLiked: true,
      commentsCount: 0,
      date: 'Just now',
      tags: [`#${newDestination.replace(/\s+/g, '')}`, '#TravelAI', '#SmartTourism']
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-ocean-900 via-sky-800 to-emerald-900 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-sky-300 text-xs font-bold border border-white/10">
            <Users className="w-3.5 h-3.5" />
            <span>Traveler Collective</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Travel Community & Stories
          </h1>
          <p className="text-sm sm:text-base text-slate-300">
            Real stories, authentic hidden gem discoveries, and uncensored travel tips shared by verified explorers.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="shrink-0 px-6 py-3.5 rounded-2xl bg-white text-ocean-900 hover:bg-slate-100 font-extrabold text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-ocean-600" />
          <span>Share Travel Story</span>
        </button>
      </div>

      {/* Community Feed Stream */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-elevated transition-all"
          >
            {/* Post Author Bar */}
            <div className="p-5 flex items-center justify-between border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-ocean-100"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-900">{post.author.name}</h4>
                    <span className="px-2 py-0.5 rounded-md bg-ocean-50 text-ocean-700 text-[10px] font-bold">
                      {post.author.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-rose-400" />
                    <span>{post.author.location} • {post.date}</span>
                  </p>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-xl text-amber-700 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{post.rating}.0</span>
              </div>
            </div>

            {/* Post Image */}
            {post.image && (
              <div className="h-72 w-full overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute bottom-3 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold">
                  📍 {post.destination}
                </span>
              </div>
            )}

            {/* Post Content */}
            <div className="p-6 space-y-3">
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {post.content}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2">
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="text-xs font-semibold text-ocean-600 hover:underline cursor-pointer">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Interaction Footer: Like, Comment, Save, Share */}
            <div className="px-6 py-4 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-6">
                
                {/* Like */}
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-1.5 transition-colors ${
                    post.isLiked ? 'text-rose-600 font-bold' : 'hover:text-slate-900'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                  <span>{post.likes}</span>
                </button>

                {/* Comment */}
                <button
                  onClick={() => alert(`Comments feature: 12 travelers have replied to this post!`)}
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.commentsCount} Comments</span>
                </button>

                {/* Save */}
                <button
                  onClick={() => alert('Saved story to your travel bookmarks!')}
                  className="flex items-center gap-1.5 hover:text-slate-900 transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                  <span>Save</span>
                </button>

              </div>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({ title: post.title, text: post.content, url: window.location.href });
                  } else {
                    alert('Story link copied to clipboard!');
                  }
                }}
                className="hover:text-ocean-600 transition-colors"
                title="Share Story"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Create Story Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 animate-fade-in">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-200 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Camera className="w-5 h-5 text-ocean-600" />
                <h3 className="text-base font-bold text-slate-800">Share Your Travel Experience</h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Destination</label>
                <input
                  type="text"
                  value={newDestination}
                  onChange={(e) => setNewDestination(e.target.value)}
                  placeholder="Destination name..."
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-ocean-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Title / Headline</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Unbelievable sunrise at Galikonda viewpoint!"
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-ocean-500"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Your Story & Tips</label>
                <textarea
                  rows={4}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="What was your experience? Any hidden gems or food recommendations?"
                  className="w-full p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-semibold focus:outline-none focus:border-ocean-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewRating(s)}
                      className="p-1"
                    >
                      <Star className={`w-6 h-6 ${s <= newRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-ocean-600 hover:bg-ocean-700 text-white text-xs font-bold shadow-md shadow-ocean-600/20"
                >
                  Publish Story
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
