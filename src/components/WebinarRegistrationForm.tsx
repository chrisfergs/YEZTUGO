import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar, CalendarDays, CheckCircle2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WebinarRegistrationFormProps {
  onRegistrationComplete?: () => void;
}

export function WebinarRegistrationForm({ onRegistrationComplete }: WebinarRegistrationFormProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isAutoFilling, setIsAutoFilling] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    specialty: '',
  });
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock submission
    setIsSubmitted(true);
    
    // Trigger callback after animation completes and user has moment to see success
    setTimeout(() => {
      onRegistrationComplete?.();
    }, 3500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const typeText = async (text: string, fieldName: keyof typeof formData) => {
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      setFormData(prev => ({ ...prev, [fieldName]: text.slice(0, i) }));
    }
  };

  const handleFirstNameClick = async () => {
    if (isAutoFilling || formData.firstName !== '') return;
    
    setIsAutoFilling(true);
    
    // Clear all fields first
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      specialty: '',
    });

    // Type each field in sequence
    await typeText('Aaron', 'firstName');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    await typeText('Morita', 'lastName');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    await typeText('aaron.morita1@gmail.com', 'email');
    await new Promise(resolve => setTimeout(resolve, 200));
    
    await typeText('3605372182', 'specialty');
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Check the consent checkbox
    setAgreedToTerms(true);
    
    setIsAutoFilling(false);
  };

  return (
    <div className="bg-white rounded-2xl p-8 shadow-xl relative overflow-hidden">
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            key="success"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring",
              stiffness: 200,
              damping: 20
            }}
            className="text-center py-4"
          >
            {/* Animated particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                animate={{ 
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0],
                  x: Math.cos((i / 12) * Math.PI * 2) * 100,
                  y: Math.sin((i / 12) * Math.PI * 2) * 100,
                }}
                transition={{ 
                  duration: 1.5,
                  delay: 0.2,
                  ease: "easeOut"
                }}
                className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full"
                style={{ backgroundColor: '#C5203F', transformOrigin: 'center' }}
              />
            ))}

            {/* Success icon with pulse */}
            <motion.div 
              className="flex justify-center mb-6 relative"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
              }}
            >
              <motion.div
                animate={{ 
                  boxShadow: [
                    '0 0 0 0 rgba(197, 32, 63, 0.4)',
                    '0 0 0 20px rgba(197, 32, 63, 0)',
                    '0 0 0 0 rgba(197, 32, 63, 0)'
                  ]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
                className="w-20 h-20 rounded-full flex items-center justify-center relative" style={{ backgroundColor: '#C5203F' }}
              >
                <CheckCircle2 className="w-10 h-10 text-white relative z-10" />
                
                {/* Sparkle effects */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: 180 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="w-5 h-5" style={{ color: '#C5203F' }} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0], rotate: -180 }}
                  transition={{ duration: 1, delay: 0.7 }}
                  className="absolute -bottom-2 -left-2"
                >
                  <Sparkles className="w-4 h-4" style={{ color: '#C5203F' }} />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-[#030213] mb-3">Registration Confirmed!</h3>
              <p className="text-gray-600 leading-relaxed">
                Thank you for registering. We've sent the webinar details to <br/>
                <span style={{ color: '#C5203F' }}>{formData.email}</span>
              </p>
              
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-6 p-4 rounded-xl border" style={{ backgroundColor: 'rgba(197, 32, 63, 0.1)', borderColor: '#C5203F', color: '#C5203F' }}
              >
                <div className="flex items-center justify-center text-sm" style={{ color: '#C5203F' }}>
                  <Calendar className="w-4 h-4 mr-2" style={{ color: '#C5203F' }} />
                  <span>March 15, 2026 at 2:00 PM ET</span>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 1 }}
            exit={{ 
              scale: 0.95,
              opacity: 0,
              filter: "blur(4px)"
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#C5203F' }}>
                <CalendarDays className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-[#030213]">Upcoming Webinar</h3>
                <p className="text-sm text-gray-600">March 15, 2026 | 2:00 PM ET</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    onClick={handleFirstNameClick}
                    required
                    className="border-gray-300 cursor-pointer"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="border-gray-300"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="border-gray-300"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialty">NPI Number</Label>
                <Input
                  id="specialty"
                  name="specialty"
                  value={formData.specialty}
                  onChange={handleChange}
                  required
                  placeholder="e.g., 1234567890"
                  className="border-gray-300"
                />
              </div>

              <div className="flex items-start mt-6">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="w-3 h-3 rounded border-gray-300 focus:ring-2"
                  style={{
                    accentColor: '#C5203F',
                    marginRight: '12px',
                    marginTop: '4px'
                  }}
                />
                <label 
                  htmlFor="terms" 
                  className="text-xs text-gray-600 cursor-pointer select-none leading-relaxed"
                >
                  I consent to receive educational communications and updates about YEZTUGO from the sponsor. I understand I may unsubscribe at any time and my data will be handled in accordance with applicable privacy policies.
                </label>
              </div>

              <Button 
                type="submit" 
                className="w-full text-white h-12 mt-4 hover:opacity-90 transition-opacity" style={{ backgroundColor: '#C5203F' }}
              >
                Reserve Your Spot
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
