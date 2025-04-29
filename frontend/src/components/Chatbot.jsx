"use client";

import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./input.jsx";
import {Button}  from "./Button";
import { Card, CardHeader, CardContent, CardFooter } from "./Card";
import { Loader2, Send, ArrowLeft, Mic, MicOff, RefreshCw, Sparkles } from "lucide-react";
import { ShootingStars } from "./Shooting-stars";
import { StarsBackground } from "./Stars-background";

const Chatbot = () => {
  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState(false);
  const [micClick, setMicClick] = useState(false);
  const [suggestions] = useState([
    "What's the best time to create a Project?",
    "Tell me about SDG Mapping In Projects",
    "What are some tips for Project Creation?",
    "Recommend best online courses for Projects",
    "What are Some Good Project Innovations",
    "Popular Project Ideas"
  ]);
  const navigate = useNavigate();
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Set initial greeting message
  useEffect(() => {
    setTimeout(() => {
      setMessages([
        { 
          type: "bot", 
          content: "Hello! I'm your Project Buddy. How can I help you plan your next project?",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }, 800);
  }, []);

  // Function to format AI text responses for better readability
  const formatAIContent = (content) => {
    if (!content) return "";
    
    // Split content by double newlines (paragraphs)
    const paragraphs = content.split(/\n\n+/);
    
    // Format lists - Match lines starting with numbers or bullets
    const formattedParagraphs = paragraphs.map(paragraph => {
      // Check if paragraph contains list items
      if (/^(\d+\.|\*|\-)\s/.test(paragraph)) {
        // Split into list items
        const listItems = paragraph.split(/\n/).filter(line => line.trim());
        return (
          `<div class="ai-list">
            ${listItems.map(item => `<div class="ai-list-item">${item}</div>`).join('')}
          </div>`
        );
      }
      
      // Check if paragraph is a heading (starts with # or ##)
      if (/^#+\s/.test(paragraph)) {
        const headingLevel = (paragraph.match(/^#+/)[0].length);
        const headingText = paragraph.replace(/^#+\s/, '');
        const headingClass = headingLevel <= 2 ? 'ai-heading-large' : 'ai-heading-small';
        return `<div class="${headingClass}">${headingText}</div>`;
      }
      
      // Regular paragraph
      return `<div class="ai-paragraph">${paragraph}</div>`; 
    });
    
    return formattedParagraphs.join('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    const userMessage = {
      type: "user", 
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setLoading(true);
    setMessages((prev) => [...prev, userMessage]);
    setQuery("");

    // Automatic focus on input after sending
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    try {
      // Modified API endpoint to match the study assistant functionality
      const res = await fetch("http://localhost:5000/api/studyAssistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userMessage.content }),
      });

      if (!res.ok) {
        // Fallback for demo/development purposes when the API is not available
        const fallbackResponses = {
          "What's the best time to create a Project?": "The best time to start a project depends on several factors. Morning hours (8-11am) are often ideal for creative work and strategic planning when your mind is fresh. For collaborative projects, midday (1-4pm) works well when team members are available. Consider your project timeline, team availability, and deadline constraints. The key is establishing a consistent schedule that allows for focused, uninterrupted work sessions.",
          "Tell me about SDG Mapping In Projects": "SDG (Sustainable Development Goals) mapping is a powerful framework for aligning your projects with global sustainability objectives. This involves identifying which of the 17 UN SDGs your project contributes to. The process typically includes: assessing direct and indirect impacts, establishing relevant KPIs, documenting your sustainability contributions, and communicating these aspects to stakeholders. SDG mapping enhances project value by demonstrating social and environmental responsibility while opening funding opportunities.",
          "What are some tips for Project Creation?": "1. Start with a clear problem statement and project brief\n2. Conduct thorough stakeholder analysis early on\n3. Define SMART objectives with measurable outcomes\n4. Create a detailed work breakdown structure (WBS)\n5. Establish realistic timelines with buffer periods\n6. Identify risks and develop mitigation strategies\n7. Set up communication protocols for team members\n8. Include regular reflection points for course correction",
          "Recommend best online courses for Projects": "For project management fundamentals: PMI's courses on Coursera\nFor agile methodologies: Scrum.org and Atlassian University\nFor technical project skills: LinkedIn Learning and Pluralsight\nFor design thinking: IDEO courses on edX\nFor sustainability in projects: SDG Academy\n\nMany platforms offer certifications that can enhance your project management credentials. Check if your organization has subscriptions to any learning platforms!",
          "What are Some Good Project Innovations": "Some innovative project approaches include:\n\n- Design Thinking methodologies for human-centered solutions\n- Agile-Waterfall hybrid frameworks for complex projects\n- Digital twin technology for infrastructure projects\n- Blockchain for supply chain transparency\n- AI-assisted project scheduling and risk assessment\n- Virtual/Augmented reality for stakeholder visualization\n- Sustainability scorecards integrated into project KPIs\n- Crowdsourced ideation platforms for collaborative innovation",
          "Popular Project Ideas": "Popular project ideas with high impact potential include:\n\n1. Community-based renewable energy solutions\n2. Smart city infrastructure improvements\n3. Education technology platforms for underserved communities\n4. Supply chain transparency and ethical sourcing initiatives\n5. Healthcare accessibility innovations\n6. Sustainable packaging alternatives\n7. Urban agriculture and food security solutions\n8. Water conservation and management systems"
        };
        
        // Simple matching to see if we have a canned response for this query
        const lcQuery = userMessage.content.toLowerCase();
        let responseText = "I'm sorry, I'm having trouble connecting to my knowledge base right now. Here's some general project advice: Define clear objectives, create a detailed timeline, assign specific responsibilities, establish communication channels, and set up regular progress reviews. Would you like specific guidance on any of these project management aspects?";
        
        // Check if query contains any of our suggestion keywords
        for (const [key, value] of Object.entries(fallbackResponses)) {
          if (lcQuery.includes(key.toLowerCase())) {
            responseText = value;
            break;
          }
        }
        
        // Add a small delay to make it feel more natural
        setTimeout(() => {
          setMessages((prev) => [...prev, { 
            type: "bot", 
            content: responseText,
            formattedContent: formatAIContent(responseText),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }]);
          setLoading(false);
        }, 1500);
        return;
      }
      
      const data = await res.json();
      
      // Add small delay to make interaction feel more natural
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          type: "bot", 
          content: data.information,
          formattedContent: formatAIContent(data.information),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }]);
        setLoading(false);
      }, 700);
      
    } catch (error) {
      console.error("Error fetching response:", error);
      setTimeout(() => {
        setMessages((prev) => [...prev, { 
          type: "bot", 
          content: "I'm having trouble connecting right now. Please try again in a moment.",
          formattedContent: "<div class='ai-paragraph'>I'm having trouble connecting right now. Please try again in a moment.</div>",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isError: true
        }]);
        setLoading(false);
      }, 700);
    }
  };

  const handleVoiceInput = () => {
    setRecording(!recording);
    
    if (!recording) {
      try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
          console.error("Speech recognition not supported in this browser");
          return;
        }
        
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.start();
        
        setMicClick(!micClick);
        
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setRecording(false);
        };
        
        recognition.onerror = (event) => {
          console.error("Voice recognition error:", event.error);
          setRecording(false);
        };
        
        recognition.onend = () => {
          console.log("Voice recognition ended.");
          setRecording(false);
        };
      } catch (error) {
        console.error("Error initializing speech recognition:", error);
        setRecording(false);
      }
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    inputRef.current?.focus();
  };

  const handleClearChat = () => {
    setMessages([{ 
      type: "bot", 
      content: "Let's start a new conversation. How can I help with your project plans?",
      formattedContent: "<div class='ai-paragraph'>Let's start a new conversation. How can I help with your project plans?</div>",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  return (
    <div className="relative h-screen bg-neutral-900 overflow-hidden">
      <ShootingStars />
      <StarsBackground />
      
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-neutral-900 to-transparent z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-900 to-transparent z-10" />

      <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-gray-900 to-transparent z-20">
        <Button
          variant="ghost"
          className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/70 text-gray-200 rounded-full w-10 h-10 p-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        
        <div className="flex items-center gap-2">
          <div className="bg-blue-500/20 text-blue-300 border border-blue-400/30 px-3 py-1 rounded-full text-sm">
            Project Assistant
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            className="bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/70 text-gray-200 rounded-full w-10 h-10 p-2"
            onClick={handleClearChat}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card className="w-11/12 sm:w-4/5 max-w-3xl mx-auto flex flex-col bg-transparent border-none shadow-none h-full">
        <CardHeader className="pt-20 pb-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Project Guide</h2>
            <p className="text-blue-300/60 text-sm mt-1">Your personal assistant for Project advice</p>
          </div>
        </CardHeader>

        <CardContent
          ref={chatContainerRef}
          className="flex-grow overflow-y-auto px-2 sm:px-4 pb-24 pt-4 mb-20 scroll-smooth"
        >
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} mb-4 animate-fadeIn`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`flex ${message.type === "user" ? "flex-row-reverse" : "flex-row"} items-end gap-2`}>
                {message.type === "bot" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">AI</span>
                  </div>
                )}
                
                <div
                  className={`p-4 my-1 max-w-xs sm:max-w-md text-sm md:text-base break-words rounded-2xl shadow-lg ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-br-none"
                      : message.isError 
                        ? "bg-gradient-to-r from-red-600 to-red-500 text-white rounded-bl-none"
                        : "bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-bl-none"
                  }`}
                >
                  {message.type === "bot" && message.formattedContent ? (
                    <div className="ai-content" dangerouslySetInnerHTML={{ __html: message.formattedContent }}></div>
                  ) : (
                    <p className="mb-1">{message.content}</p>
                  )}
                  <p className="text-xs opacity-70 text-right mt-2">{message.timestamp}</p>
                </div>
                
                {message.type === "user" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-white">You</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start mb-4 animate-fadeIn">
              <div className="flex flex-row items-end gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">AI</span>
                </div>
                <div className="p-3 rounded-2xl bg-gradient-to-r from-indigo-600/40 to-purple-500/40 rounded-bl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: "0s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-blue-300 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>

        {messages.length === 1 && !loading && (
          <div className="absolute left-0 right-0 bottom-32 px-4">
            <div className="bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-blue-500/20">
              <h3 className="text-blue-300 text-sm font-medium mb-3">Try asking about:</h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="bg-blue-500/10 border-blue-400/30 text-blue-200 hover:bg-blue-500/20 text-xs"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        <CardFooter className="sticky bottom-0 left-0 right-0 w-full bg-gradient-to-t from-neutral-900 to-neutral-900/95 pt-8 pb-6 px-4 z-50">
          <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-3xl mx-auto">
            <Input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type your Project question..."
              className="border-2 border-blue-500/30 p-4 flex-1 rounded-full bg-gray-800/70 backdrop-blur-sm text-white placeholder-blue-300/50 focus:border-blue-400/60 focus:ring-blue-500/20"
              disabled={loading}
            />
            <Button
              type="button"
              onClick={handleVoiceInput}
              className={`rounded-full w-12 h-12 flex items-center justify-center ${
                recording 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
              aria-label={recording ? "Stop recording" : "Voice input"}
            >
              {recording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </Button>
            <Button
              type="submit"
              disabled={loading || !query.trim()}
              className="bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center disabled:opacity-50 transition-all duration-300"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </form>
        </CardFooter>
      </Card>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }

        .animate-pulse {
          animation: pulse 1.5s infinite;
        }

        .animate-float {
          animation: float 3s infinite ease-in-out;
        }

        /* AI Message Formatting */
        .ai-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ai-paragraph {
          margin-bottom: 8px;
          line-height: 1.5;
        }

        .ai-heading-large {
          font-size: 1.1em;
          font-weight: bold;
          margin-top: 12px;
          margin-bottom: 8px;
          color: #ffffff;
        }

        .ai-heading-small {
          font-size: 1em;
          font-weight: bold;
          margin-top: 10px;
          margin-bottom: 6px;
          color: #ffffff;
        }

        .ai-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding-left: 4px;
        }

        .ai-list-item {
          position: relative;
          padding-left: 16px;
          line-height: 1.4;
        }

        .ai-list-item:before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.6em;
          width: 6px;
          height: 6px;
          background-color: rgba(135, 206, 250, 0.8);
          border-radius: 50%;
        }

        /* Custom scrollbar for chat container */
        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.1);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </div>
  );
};

export default Chatbot;