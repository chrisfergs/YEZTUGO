import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import gileadLogo from '../assets/Gilead-Logo.svg';

interface Message {
  id: number;
  text: string;
  sender: 'ai' | 'user';
  timestamp: Date;
}

interface AmliAiChatProps {
  isVisible?: boolean;
  onDemoModeActivate?: () => void;
  isDemoMode?: boolean;
}

export function AmliAiChat({ isVisible = false, onDemoModeActivate, isDemoMode = false }: AmliAiChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationStage, setConversationStage] = useState(0);
  const [hasAbandoned, setHasAbandoned] = useState(false);
  const [isStreamingUserResponse, setIsStreamingUserResponse] = useState(false);
  const [hasStreamedCurrentResponse, setHasStreamedCurrentResponse] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const streamingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Format message text with markdown-like formatting
  const formatMessageText = (text: string) => {
    return text
      // Superscripts: ^1^ -> <sup>1</sup>
      .replace(/\^(\d+)\^/g, '<sup style="color: #C5203F !important; font-size: 0.75em; font-weight: bold;">$1</sup>')
      // Bold links: **[text](url)** -> <strong><a>text</a></strong>
      .replace(/\*\*\[([^\]]+)\]\(([^)]+)\)\*\*/g, '<strong><a href="$2" target="_blank" rel="noopener noreferrer" style="color: #C5203F !important; text-decoration: underline !important; text-decoration-thickness: 2px !important; text-underline-offset: 2px !important;" onmouseover="this.style.color=\'#9A1830\'" onmouseout="this.style.color=\'#C5203F\'">$1</a></strong>')
      // Regular links: [text](url) -> <a href="url">text</a>
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color: #C5203F !important; text-decoration: underline !important; text-decoration-thickness: 2px !important; text-underline-offset: 2px !important;" onmouseover="this.style.color=\'#9A1830\'" onmouseout="this.style.color=\'#C5203F\'">$1</a>')
      // Bold text: **text** -> <strong>text</strong>
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Line breaks: \n -> <br>
      .replace(/\n/g, '<br>')
      // Checkmarks: ✅ -> styled checkmark
      .replace(/✅/g, '<span class="text-green-600">✅</span>')
      // Link icon: 🔗 -> styled icon
      .replace(/🔗/g, '<span style="color: #C5203F !important;">🔗</span>');
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Auto-resize textarea as content changes
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = Math.min(scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  // Clean up streaming timeout on unmount
  useEffect(() => {
    return () => {
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
      }
    };
  }, []);

  // Reset chat state when coming back from demo mode
  useEffect(() => {
    if (isVisible && !isDemoMode) {
      // Reset all chat state for fresh experience
      setIsOpen(false);
      setMessages([]);
      setInputValue('');
      setIsTyping(false);
      setConversationStage(0);
      setHasAbandoned(false);
      setIsStreamingUserResponse(false);
      setHasStreamedCurrentResponse(false);
      
      // Clear any pending timeouts
      if (streamingTimeoutRef.current) {
        clearTimeout(streamingTimeoutRef.current);
        streamingTimeoutRef.current = null;
      }
    }
  }, [isVisible, isDemoMode]);

  // Send abandonment event to SaaS platform
  const sendAbandonmentEvent = () => {
    if (hasAbandoned) return;
    
    setHasAbandoned(true);
    console.log('🚨 ABANDONMENT EVENT TRIGGERED 🚨');
    console.log({
      event: 'chat_abandoned',
      timestamp: new Date().toISOString(),
      conversationStage,
      messageCount: messages.length,
      lastMessage: messages[messages.length - 1],
      userEmail: 'aaron.morita@example.com',
      chatDuration: messages.length > 0 ? 
        (new Date().getTime() - messages[0].timestamp.getTime()) / 1000 : 0,
      platform: 'Lena AI powered by Agentforce'
    });

    // Mock API call to SaaS platform
    fetch('/api/events/chat-abandonment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'chat_abandoned',
        timestamp: new Date().toISOString(),
        conversationStage,
        messageCount: messages.length,
        userProfile: {
          email: 'aaron.morita@example.com',
          specialty: 'Infectious Disease'
        }
      })
    }).catch(() => console.log('Mock API call - no actual endpoint'));
  };

  // Initial greeting when chat opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages([{
            id: 1,
            text: "Hi there, Dr. Morita! I can help answer general, on-label questions about YEZTUGO, such as approved indications, dosing, administration, and safety information. Please note that I can only provide information consistent with the FDA-approved prescribing information. For questions outside of approved use, I can connect you directly with our Medical Information team.\n\nBefore we begin, please review the **[Important Safety Information](https://www.salesforce.com/healthcare-life-sciences/life-sciences-software/)** and the full **[Prescribing Information](https://www.salesforce.com/healthcare-life-sciences/life-sciences-software/)**. What would you like help with today?",
            sender: 'ai',
            timestamp: new Date()
          }]);
          setConversationStage(1);
        }, 2200);
      }, 600);
    }
  }, [isOpen]);

  // User responses for streaming
  const getUserResponse = (stage: number): string => {
    switch (stage) {
      case 1:
        return "I have a patient experiencing localized pain, swelling, and a small nodule at the injection site three days after their first Yeztugo dose. What are the documented incidence rates for this, and what is the recommended clinical management?";
      case 2:
        return "That's helpful. Does the presence of a nodule at day 3 indicate a need for a dose adjustment or a change in the 6-month continuation schedule?";
      case 3:
        return "Yes, please submit a formal inquiry for me";
      case 4:
        return "Actually, I also wanted to ask about the long-term safety data from the PURPOSE trials for patients who"; // Intentionally incomplete
      default:
        return "";
    }
  };

  // AI responses based on stage
  const getAiResponse = (stage: number): string => {
    switch (stage) {
      case 1:
        return "Great question. Injection site reactions (ISRs) are a known side effect of YEZTUGO. According to the Prescribing Information (Section 6.1), ISRs were reported in 18% of patients during clinical trials. Most reactions, including nodules, pain, and swelling, were categorized as mild to moderate (Grade 1 or 2) and typically resolved spontaneously within 7–10 days.^1^\n\n**Recommended Clinical Management:**\n\n**Localized Care:** Local cold compresses may be used for the first 24 hours to manage swelling and discomfort.\n\n**Assessment:** While small nodules are an expected reaction for this long-acting formulation, clinicians should monitor for signs of skin necrosis or systemic symptoms, which would require immediate escalation.\n\n**Adverse Event Reporting:** Please ensure any significant reactions are reported through your office's standard safety protocols.\n\n**Source:**\n^1^ **[YEZTUGO PI — Adverse Reactions (Section 6.1)](https://www.salesforce.com/healthcare-life-sciences/life-sciences-software/)**\n^2^ **[YEZTUGO PI — Patient Counseling Information (Section 17)](https://www.salesforce.com/healthcare-life-sciences/life-sciences-software/)**";
      case 2:
        return "The YEZTUGO Prescribing Information does not currently recommend dose adjustments for localized Grade 1 or 2 injection site reactions. However, for a more tailored clinical perspective or to discuss specific case-management strategies, I can:\n\n• **Submit a formal inquiry** to the Gilead Medical Information team\n• **Provide a Resource Packet** including the 'ISR Clinical Management Guide'\n\nWould you like me to connect you with your MSL for further consultation?";
      case 3:
        return "I have routed your inquiry and clinical context to your MSL, who will follow up with you at **[aaron.morita@example.com](mailto:aaron.morita@example.com)**\n\nIs there anything else I can assist you with today?";
      case 4:
        return "You're welcome! Have a great day.";
      default:
        return "I'd be happy to help with that. Let me pull up the specific data for you...";
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() || isTyping || isStreamingUserResponse) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Variable AI response times based on complexity
    const responseDelays = [4200, 5800, 6500, 5200, 3200, 2500, 1800]; // Varies from 1.8s to 6.5s
    const typingStartDelays = [900, 1100, 1300, 1000, 750, 600, 400]; // Delay before typing indicator appears
    
    const currentDelay = responseDelays[conversationStage - 1] || 4000;
    const currentTypingStartDelay = typingStartDelays[conversationStage - 1] || 1000;

    // Wait a moment before showing AI is typing (feels more natural)
    setTimeout(() => {
      setIsTyping(true);

      setTimeout(() => {
        setIsTyping(false);
        
        const aiMessage: Message = {
          id: Date.now() + 1,
          text: getAiResponse(conversationStage),
          sender: 'ai',
          timestamp: new Date()
        };

        setMessages(prev => [...prev, aiMessage]);
        setConversationStage(prev => prev + 1);
        setHasStreamedCurrentResponse(false); // Reset for next response
      }, currentDelay); // Variable realistic AI response times
    }, currentTypingStartDelay); // Delay before showing typing indicator
  };

  // Stream user response character by character when input is clicked
  const handleInputClick = () => {
    // Only stream if we're in a valid conversation stage and haven't streamed yet
    if (conversationStage >= 1 && conversationStage <= 3 && !isStreamingUserResponse && !hasStreamedCurrentResponse && inputValue === '') {
      const userText = getUserResponse(conversationStage);
      if (!userText) return;
      
      setIsStreamingUserResponse(true);
      
      // Stream full text for stages 1-3
      const interruptAt = userText.length;
      
      let currentIndex = 0;
      
      const streamCharacter = () => {
        if (currentIndex < interruptAt) {
          setInputValue(userText.substring(0, currentIndex + 1));
          currentIndex++;
          streamingTimeoutRef.current = setTimeout(streamCharacter, 10); // 10ms per character for visible streaming
        } else {
          setIsStreamingUserResponse(false);
          setHasStreamedCurrentResponse(true);
        }
      };

      streamCharacter();
      return;
    }
    
    // Stage 4: Stream partial question then stop (interrupted stream)
    if (conversationStage === 4 && !isStreamingUserResponse && !hasStreamedCurrentResponse && inputValue === '') {
      const userText = getUserResponse(conversationStage);
      if (!userText) return;
      
      setIsStreamingUserResponse(true);
      
      // Interrupt partway through (about 60% of the message)
      const interruptAt = Math.floor(userText.length * 0.6);
      
      let currentIndex = 0;
      
      const streamCharacter = () => {
        if (currentIndex < interruptAt) {
          setInputValue(userText.substring(0, currentIndex + 1));
          currentIndex++;
          streamingTimeoutRef.current = setTimeout(streamCharacter, 10); // 10ms per character for visible streaming
        } else {
          // Stop streaming but don't mark as complete - leave text in box
          setIsStreamingUserResponse(false);
          setHasStreamedCurrentResponse(true);
          // Advance to stage 5 so next click triggers demo mode
          setConversationStage(5);
        }
      };

      streamCharacter();
      return;
    }
    
    // After the interrupted message (stage 5), clicking textbox triggers demo mode
    if (conversationStage === 5 && !isStreamingUserResponse) {
      // Clear the input first
      setInputValue('');
      if (onDemoModeActivate) {
        onDemoModeActivate();
      }
    }
  };

  const handleClose = () => {
    // Clean up any streaming
    if (streamingTimeoutRef.current) {
      clearTimeout(streamingTimeoutRef.current);
    }
    
    // Trigger abandonment event if chat is closed with active conversation
    if (messages.length > 0 && conversationStage < 5) {
      sendAbandonmentEvent();
    }
    setIsOpen(false);
  };

  // Don't render anything if demo mode is active
  if (isDemoMode) {
    return null;
  }

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && isVisible && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="relative text-white p-4 rounded-full shadow-2xl transition-shadow" style={{ backgroundColor: '#C5203F' }}
            >
              {/* Pulse animation */}
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0, 0.5]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full" style={{ backgroundColor: '#C5203F' }}
              />
              
              <MessageCircle className="w-6 h-6 relative z-10" />
              
              {/* New message indicator */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white"
              />
            </motion.button>
            
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-[#030213] text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
            >
              Ask Lena AI About YEZTUGO!
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-t-4 border-b-4 border-l-4 border-transparent border-l-[#030213]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="p-5 text-[#030213] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #D4606E 0%, #E8939D 100%)' }}>
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-20 h-20 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }} />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-2xl" style={{ backgroundColor: 'rgba(197,32,63,0.2)' }} />
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  {/* Enhanced Logo Container */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#C5203F]/20 rounded-full blur-lg" />
                    <div className="relative w-14 h-14 bg-white rounded-full flex items-center justify-center p-2.5">
                      <img src={gileadLogo} alt="Lena AI" className="h-8 w-8 object-contain mx-auto" />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-[#030213] text-xl mb-1">Lena AI</h3>
                    <Badge className="bg-white/60 border-0 text-xs backdrop-blur-sm" style={{ color: '#C5203F' }}>
                      Powered by Agentforce
                    </Badge>
                  </div>
                </div>
                <Button
                  onClick={handleClose}
                  variant="ghost"
                  size="icon"
                  className="text-[#030213] hover:bg-white/30 h-9 w-9 rounded-xl"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: message.sender === 'user' ? 0 : 0.1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.sender === 'user'
                      ? 'text-white'
                      : 'bg-white text-gray-800 border border-gray-200'
                  }`} style={message.sender === 'user' ? { backgroundColor: '#C5203F' } : {}}>
                    {message.sender === 'ai' && (
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-[#C5203F]/20 to-[#E07A87]/20 backdrop-blur-sm rounded-full flex items-center justify-center p-1 flex-shrink-0">
                          <img src={gileadLogo} alt="Lena AI" className="h-4 w-4 object-contain mx-auto" />
                        </div>
                        <span className="text-xs text-gray-500">Lena AI</span>
                      </div>
                    )}
                    <div 
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }}
                    />
                    <p className={`text-xs mt-1 ${
                      message.sender === 'user' ? 'text-white/60' : 'text-gray-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 max-w-[80%]">
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#C5203F]/20 to-[#E07A87]/20 backdrop-blur-sm rounded-full flex items-center justify-center p-1 flex-shrink-0">
                        <img src={gileadLogo} alt="Lena AI" className="h-4 w-4 object-contain mx-auto" />
                      </div>
                      <span className="text-xs text-gray-500">Lena AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">
                        {conversationStage === 0 ? "Getting Ready" : "Reviewing Medical Information"}
                      </span>
                      <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={{ y: [0, -5, 0] }}
                            transition={{ 
                              duration: 0.6,
                              repeat: Infinity,
                              delay: i * 0.1
                            }}
                            className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#C5203F' }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2 items-center">
                <Textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => {
                    // Only allow changes if not currently streaming or if streaming is complete
                    if (!isStreamingUserResponse && hasStreamedCurrentResponse) {
                      setInputValue(e.target.value);
                    }
                  }}
                  onClick={handleInputClick}
                  onKeyDown={(e) => {
                    // Disable all keyboard input during streaming
                    if (isStreamingUserResponse || (conversationStage >= 1 && conversationStage <= 4 && !hasStreamedCurrentResponse)) {
                      e.preventDefault();
                      return;
                    }
                    // At stage 5 (after interrupted message), prevent Enter and force click to trigger demo
                    if (conversationStage === 5) {
                      e.preventDefault();
                      return;
                    }
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask about YEZTUGO dosing, safety, indications..."
                  className="flex-1 border-gray-300 min-h-[44px] max-h-[120px] resize-none overflow-y-auto py-3 px-3" style={{ '--tw-ring-color': '#C5203F' } as React.CSSProperties}
                  disabled={isStreamingUserResponse}
                  rows={1}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={
                    !inputValue.trim() || 
                    isTyping || 
                    isStreamingUserResponse || 
                    (conversationStage >= 1 && conversationStage <= 4 && !hasStreamedCurrentResponse) ||
                    conversationStage === 5 // Disable at stage 5 to force textbox click
                  }
                  className="text-white h-[44px] w-[44px] hover:opacity-90 transition-opacity" style={{ backgroundColor: '#C5203F' }}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}