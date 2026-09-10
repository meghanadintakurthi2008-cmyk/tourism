import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  Minimize2, 
  Maximize2, 
  User, 
  ArrowRight,
  Compass,
  CornerDownLeft,
  Trash2
} from 'lucide-react';
import { ChatMessage, Destination } from '../../types';
import { DESTINATIONS } from '../../data/destinations';

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: string) => void;
}

export const AIChatbot: React.FC<AIChatbotProps> = ({
  isOpen,
  onClose,
  onNavigateTab
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'assistant',
      text: "👋 Hi! I'm **TravelAI Assistant**, your personal tourism copilot. Ask me about Indian destinations, budget planning, weather, packing lists, or local cuisine!",
      timestamp: 'Just now'
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickPrompts = [
    'Best places to visit in Goa?',
    'How much money do I need for a 4-day trip?',
    'What should I pack for Araku?',
    'What is the best time to visit Kerala?',
    'Suggest cheap hotels.',
    'What food should I try in Vizag?',
    'Give me a 3-day itinerary.'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputQuery('');
    setIsTyping(true);

    // AI Response generation logic
    setTimeout(() => {
      const q = textToSend.toLowerCase();
      let reply = '';
      let quickActions: { label: string; action: string; payload?: any }[] | undefined;

      if (q.includes('goa')) {
        reply = `🏖️ **Top places in Goa:**\n\n1. **South Goa Serenity:** Palolem Beach, Agonda, & Butterfly Beach.\n2. **Latin Quarter Heritage:** Fontainhas in Panaji (colorful Portuguese villas & bakeries).\n3. **Waterfalls:** Dudhsagar Falls jungle trek.\n4. **Historic Forts:** Fort Aguada & Chapora Fort.\n\n*Pro Tip:* For a peaceful vibe with zero crowds, visit **Kakolem (Tiger) Beach**!`;
        quickActions = [{ label: 'Explore Goa in Catalog', action: 'destinations' }];
      } else if (q.includes('how much money') || q.includes('budget') || q.includes('4-day')) {
        reply = `💰 **Estimated 4-Day Trip Budget (Per Person in India):**\n\n- **Budget/Backpacker:** ₹6,500 - ₹9,500 (Hostels, local train/bus, street dining)\n- **Moderate Comfort:** ₹12,000 - ₹18,000 (3-Star hotels, private cab, specialty meals)\n- **Premium/Luxury:** ₹28,000+ (5-Star heritage resorts, flights)\n\n*AI Money-Saving Tip:* Booking intercity travel on Tuesdays or Wednesdays saves ~18% compared to weekend surges!`;
        quickActions = [{ label: 'Open Smart Budget Tool', action: 'budget' }];
      } else if (q.includes('pack') || q.includes('packing')) {
        reply = `🎒 **Smart Packing Checklist:**\n\n- **Apparel:** Breathable cotton clothes + 1 light jacket for breezy evenings.\n- **Footwear:** Sturdy sneakers or waterproof hiking boots with rubber grip.\n- **Electronics:** 20,000mAh power bank (crucial for scenic valley trails).\n- **Essentials:** Govt ID (Aadhar/Passport), personal medications, refillable water bottle.\n- **Weather-aware:** Compact umbrella if rain probability exceeds 20%.`;
        quickActions = [{ label: 'View Smart Packing Checklist', action: 'planner' }];
      } else if (q.includes('kerala')) {
        reply = `🌴 **Best time to visit Kerala:**\n\n- **September to March (Winter/Post-Monsoon):** Pleasant 20°C - 27°C, emerald green hills in Munnar, calm waters for Alleppey houseboats.\n- **June to August (Monsoon):** Famous for authentic Ayurvedic rejuvenation treatments and majestic full-flow waterfalls.`;
        quickActions = [{ label: 'View Kerala in Explorer', action: 'destinations' }];
      } else if (q.includes('hotel') || q.includes('hotels') || q.includes('cheap')) {
        reply = `🏨 **AI Hotel Recommendation Tips:**\n\n- Look for **certified eco-homestays** located 1.5 - 2 km from tourist epicenters to save ₹800 - ₹1,400 per night while enjoying fresh farm-to-table breakfast.\n- In Araku: Check out **Haritha Valley Resort** or **Green Valley Coffee Homestay**.\n- In Goa: **Zostel Morjim** offers comfortable beachside dorms and private rooms under ₹1,400/night.`;
        quickActions = [{ label: 'Browse Hotels & Stays', action: 'planner' }];
      } else if (q.includes('food') || q.includes('vizag') || q.includes('araku') || q.includes('eat')) {
        reply = `🍲 **Must-Try Local Delicacies:**\n\n- **Araku Valley:** Bongu Lo Chicken (Bamboo chicken roasted in charcoal with forest herbs), Araku Arabica roasted coffee, Madugula Halwa.\n- **Vizag Coastal:** Vizag Royyala Iguru (Prawn curry), hot beachside Punugulu with spicy ginger chutney, Gongura Mamsam.\n- **Hyderabad:** Authentic Hyderabadi Dum Biryani and Double Ka Meetha!`;
        quickActions = [{ label: 'Explore Local Experiences', action: 'experiences' }];
      } else if (q.includes('itinerary') || q.includes('3-day') || q.includes('plan')) {
        reply = `🗺️ **Here is an optimal 3-Day Nature & Adventure Itinerary (Araku Valley):**\n\n- **Day 1:** Morning Vistadome scenic train ascent ➡️ Bamboo chicken village lunch ➡️ Galikonda 4,340ft sunset viewpoint.\n- **Day 2:** 1-million-year-old Borra limestone caves ➡️ Katiki secret jungle waterfall trek ➡️ Tribal museum & Dhimsa folk dance.\n- **Day 3:** Padmapuram hanging treehouse gardens ➡️ Araku coffee cupping & chocolate workshop ➡️ Return journey.`;
        quickActions = [{ label: 'Load Full 3-Day Trip Plan', action: 'planner' }];
      } else {
        reply = `🤖 I analyzed your query: "${textToSend}".\n\nOur AI planning engine can automatically optimize routes, calculate live budget estimations, and customize an itinerary across 180+ destinations including Araku, Vizag, Goa, Munnar, Kashmir, and Rajasthan!\n\nWould you like me to generate a personalized trip or explore destinations?`;
        quickActions = [
          { label: '✨ Plan AI Trip', action: 'planner' },
          { label: '🗺️ Explore Destinations', action: 'destinations' }
        ];
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-[390px] sm:max-w-[420px] h-[580px] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden animate-slide-up">
      
      {/* Chat Window Header */}
      <div className="bg-gradient-to-r from-ocean-600 via-sky-600 to-emerald-600 p-4 text-white flex items-center justify-between shadow-md shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold">
            <Bot className="w-5 h-5 text-white animate-bounce" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm tracking-tight flex items-center gap-1.5">
              <span>TravelAI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" />
            </h4>
            <p className="text-[10px] text-sky-100 font-medium">Online • Smart India Hackathon Copilot</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setMessages([messages[0]])}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            title="Clear Chat History"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/20 text-white transition-colors"
            title="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-slate-50/50">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                  isUser
                    ? 'bg-ocean-600 text-white rounded-br-none'
                    : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-line font-normal">
                  {msg.text.split('**').map((part, i) => (
                    i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part
                  ))}
                </div>

                {/* Optional Quick Action Buttons */}
                {msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {msg.quickActions.map((qa, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          onNavigateTab(qa.action);
                          onClose();
                        }}
                        className="px-2.5 py-1 rounded-xl bg-ocean-50 hover:bg-ocean-100 text-ocean-700 font-bold text-[11px] transition-colors flex items-center gap-1 border border-ocean-200"
                      >
                        <span>{qa.label}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <span className="text-[10px] text-slate-400 mt-1 px-1">
                {msg.timestamp}
              </span>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-white border border-slate-200 w-24">
            <span className="w-2 h-2 rounded-full bg-ocean-500 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 rounded-full bg-ocean-500 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 rounded-full bg-ocean-500 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-2.5 bg-white border-t border-slate-100 overflow-x-auto whitespace-nowrap scrollbar-none flex items-center gap-1.5 shrink-0">
        {quickPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-ocean-50 hover:text-ocean-700 text-slate-600 text-[11px] font-semibold transition-colors shrink-0"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Input Bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 bg-white border-t border-slate-200/80 flex items-center gap-2 shrink-0"
      >
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Ask TravelAI anything..."
          className="flex-1 px-3.5 py-2.5 rounded-2xl bg-slate-100 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-ocean-500/20"
        />
        <button
          type="submit"
          disabled={!inputQuery.trim()}
          className="w-10 h-10 rounded-2xl bg-ocean-600 hover:bg-ocean-700 disabled:opacity-50 text-white flex items-center justify-center shadow-md shadow-ocean-600/20 transition-transform active:scale-95"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>

    </div>
  );
};
