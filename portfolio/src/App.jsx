import React, { useState, useEffect } from 'react';
import { 
  Linkedin, 
  Mail, 
  Award, 
  Briefcase, 
  GraduationCap, 
  TrendingUp, 
  Users, 
  Target,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
  Phone,
  Building2,
  Presentation,
  CheckCircle2,
  BookOpen,
  Shield,
  Heart,
  Activity,
  PlayCircle,
  Clock,
  AlertCircle,
  CheckCircle,
  RotateCcw,
  ArrowLeft,
  Languages
} from 'lucide-react';

// --- DATA: BILINGUAL MOCK EXAM QUESTIONS ---
// Now supports { en: "String", hi: "String" } format for questions and options

const generateQuestions = (category) => {
  const baseQuestions = {
    'life': [
      { 
        q: { en: "What is the primary purpose of Life Insurance?", hi: "जीवन बीमा का मुख्य उद्देश्य क्या है?" }, 
        options: { en: ["Investment", "Risk Transfer", "Tax Saving", "Gambling"], hi: ["निवेश", "जोखिम हस्तांतरण (Risk Transfer)", "कर बचत", "जुआ"] }, 
        ans: 1 
      },
      { 
        q: { en: "Which of the following is NOT a tangible good?", hi: "निम्नलिखित में से कौन सी 'मूर्त' (tangible) वस्तु नहीं है?" }, 
        options: { en: ["Car", "Insurance Policy", "Gold", "House"], hi: ["कार", "बीमा पॉलिसी", "सोना", "घर"] }, 
        ans: 1 
      },
      { 
        q: { en: "Who regulates the Insurance business in India?", hi: "भारत में बीमा कारोबार को कौन नियंत्रित करता है?" }, 
        options: { en: ["RBI", "SEBI", "IRDAI", "Govt of India"], hi: ["आरबीआई (RBI)", "सेबी (SEBI)", "इरडा (IRDAI)", "भारत सरकार"] }, 
        ans: 2 
      },
      { 
        q: { en: "What is the maximum grace period for a yearly premium payment?", hi: "वार्षिक प्रीमियम भुगतान के लिए अधिकतम रियायती अवधि (grace period) क्या है?" }, 
        options: { en: ["15 days", "30 days", "45 days", "60 days"], hi: ["15 दिन", "30 दिन", "45 दिन", "60 दिन"] }, 
        ans: 1 
      },
      { 
        q: { en: "In ULIPs, the investment risk is borne by:", hi: "यूलिप (ULIP) में निवेश का जोखिम कौन उठाता है?" }, 
        options: { en: ["The Insurer", "The Insured", "IRDAI", "The Agent"], hi: ["बीमाकर्ता", "बीमित व्यक्ति (Insured)", "इरडा (IRDAI)", "एजेंट"] }, 
        ans: 1 
      },
      { 
        q: { en: "The person who proposes the life insurance policy is called:", hi: "जीवन बीमा पॉलिसी का प्रस्ताव करने वाले व्यक्ति को क्या कहा जाता है?" }, 
        options: { en: ["Life Assured", "Proposer", "Nominee", "Beneficiary"], hi: ["बीमित व्यक्ति", "प्रस्ताव्क (Proposer)", "नामित (Nominee)", "लाभार्थी"] }, 
        ans: 1 
      },
      { 
        q: { en: "Section 80C of the Income Tax Act relates to:", hi: "आयकर अधिनियम की धारा 80C किससे संबंधित है?" }, 
        options: { en: ["Tax Deduction on Premium", "Tax on Maturity", "Capital Gains", "GST"], hi: ["प्रीमियम पर कर कटौती", "परिपक्वता पर कर", "पूंजीगत लाभ", "जीएसटी"] }, 
        ans: 0 
      },
      { 
        q: { en: "What does HLV stand for in insurance underwriting?", hi: "बीमा अंडरराइटिंग में HLV का क्या अर्थ है?" }, 
        options: { en: ["High Level Value", "Human Life Value", "Health Life Value", "Human Liability Value"], hi: ["हाई लेवल वैल्यू", "ह्यूमन लाइफ वैल्यू (मानव जीवन मूल्य)", "हेल्थ लाइफ वैल्यू", "ह्यूमन लायबिलिटी वैल्यू"] }, 
        ans: 1 
      },
      { 
        q: { en: "Which policy covers risk for a specific period only?", hi: "कौन सी पॉलिसी केवल एक विशिष्ट अवधि के लिए जोखिम कवर करती है?" }, 
        options: { en: ["Whole Life", "Endowment", "Term Insurance", "Money Back"], hi: ["आजीवन बीमा (Whole Life)", "बंदोबस्ती (Endowment)", "मियादी बीमा (Term Insurance)", "मनी बैक"] }, 
        ans: 2 
      },
      { 
        q: { en: "What is 'Free Look Period' in a life insurance policy?", hi: "जीवन बीमा पॉलिसी में 'फ्री लुक पीरियड' (Free Look Period) कितने दिन का होता है?" }, 
        options: { en: ["10 days", "15 days", "30 days", "60 days"], hi: ["10 दिन", "15 दिन", "30 दिन", "60 दिन"] }, 
        ans: 1 
      },
    ],
    'general': [
      { 
        q: { en: "In General Insurance, the principle of Indemnity means:", hi: "साधारण बीमा में 'क्षतिपूर्ति' (Indemnity) के सिद्धांत का क्या अर्थ है?" }, 
        options: { en: ["Profit making", "Make good the loss", "Double benefit", "No claim"], hi: ["लाभ कमाना", "नुकसान की भरपाई करना (Make good the loss)", "दोहरा लाभ", "कोई दावा नहीं"] }, 
        ans: 1 
      },
      { 
        q: { en: "Third Party Liability is mandatory for which class of vehicles?", hi: "तृतीय पक्ष दायित्व (Third Party Liability) किस वर्ग के वाहनों के लिए अनिवार्य है?" }, 
        options: { en: ["Private Cars only", "Commercial Vehicles only", "All Motor Vehicles", "Two Wheelers only"], hi: ["केवल निजी कारें", "केवल वाणिज्यिक वाहन", "सभी मोटर वाहन", "केवल दोपहिया वाहन"] }, 
        ans: 2 
      },
      { 
        q: { en: "What is 'Subrogation'?", hi: "'प्रत्यासन' (Subrogation) क्या है?" }, 
        options: { en: ["Transfer of rights", "Sharing of loss", "Contribution", "Good faith"], hi: ["अधिकारों का हस्तांतरण (Transfer of rights)", "नुकसान साझा करना", "अंशदान", "सद्भावना"] }, 
        ans: 0 
      },
      { 
        q: { en: "Fire insurance policy usually covers loss due to:", hi: "अग्नि बीमा पॉलिसी आमतौर पर किसके कारण होने वाले नुकसान को कवर करती है?" }, 
        options: { en: ["Theft", "Fire & Lightning", "War", "Nuclear peril"], hi: ["चोरी", "आग और बिजली", "युद्ध", "परमाणु खतरा"] }, 
        ans: 1 
      },
      { 
        q: { en: "What is the principle of 'Uberrima Fides'?", hi: "'उबेरिम फाइड्स' (Uberrima Fides) का सिद्धांत क्या है?" }, 
        options: { en: ["Utmost Good Faith", "Let the buyer beware", "Indemnity", "Insurable Interest"], hi: ["परम सद्भाव (Utmost Good Faith)", "क्रेता सावधान रहे", "क्षतिपूर्ति", "बीमा योग्य हित"] }, 
        ans: 0 
      },
      { 
        q: { en: "Health insurance usually has a waiting period for:", hi: "स्वास्थ्य बीमा में आमतौर पर किसके लिए प्रतीक्षा अवधि (waiting period) होती है?" }, 
        options: { en: ["Accidents", "Pre-existing diseases", "First 24 hours", "Critical Illness only"], hi: ["दुर्घटनाएं", "पूर्व-मौजूदा बीमारियां (Pre-existing diseases)", "पहले 24 घंटे", "केवल गंभीर बीमारी"] }, 
        ans: 1 
      },
      { 
        q: { en: "Which document is the evidence of the contract?", hi: "अनुबंध का सबूत कौन सा दस्तावेज है?" }, 
        options: { en: ["Proposal Form", "Policy Document", "Cover Note", "Claim Form"], hi: ["प्रस्ताव फॉर्म", "पॉलिसी दस्तावेज", "कवर नोट", "दावा फॉर्म"] }, 
        ans: 1 
      },
      { 
        q: { en: "Marine Cargo insurance covers goods during:", hi: "समुद्री माल बीमा (Marine Cargo) माल को कब कवर करता है?" }, 
        options: { en: ["Manufacturing", "Transit", "Storage only", "Sale"], hi: ["विनिर्माण", "पारगमन/परिवहन (Transit)", "केवल भंडारण", "बिक्री"] }, 
        ans: 1 
      },
      { 
        q: { en: "In burglary insurance, what must be present for a claim?", hi: " सेंधमारी (Burglary) बीमा में दावे के लिए क्या होना आवश्यक है?" }, 
        options: { en: ["Fire", "Forceful Entry", "Employee fraud", "Lost keys"], hi: ["आग", "बलपूर्वक प्रवेश (Forceful Entry)", "कर्मचारी धोखाधड़ी", "खोई हुई चाबियाँ"] }, 
        ans: 1 
      },
      { 
        q: { en: "What is a 'Deductible'?", hi: "'डिडक्टिबल' (Deductible) क्या है?" }, 
        options: { en: ["Amount paid by Insurer", "Amount borne by Insured", "Bonus", "Commission"], hi: ["बीमाकर्ता द्वारा भुगतान की गई राशि", "बीमित व्यक्ति द्वारा वहन की गई राशि", "बोनस", "कमीशन"] }, 
        ans: 1 
      },
    ],
    'health': [
      { 
        q: { en: "What is TPA in health insurance?", hi: "स्वास्थ्य बीमा में TPA क्या है?" }, 
        options: { en: ["Third Party Administrator", "Total Policy Amount", "Tax Paying Agent", "Term Plan Assurance"], hi: ["थर्ड पार्टी एडमिनिस्ट्रेटर", "कुल पॉलिसी राशि", "कर भुगतान एजेंट", "टर्म प्लान एश्योरेंस"] }, 
        ans: 0 
      },
      { 
        q: { en: "Which of the following is a standard exclusion in health policies?", hi: "निम्नलिखित में से कौन सा स्वास्थ्य पॉलिसियों में एक मानक अपवर्जन (exclusion) है?" }, 
        options: { en: ["Cataract", "Cosmetic Surgery", "Typhoid", "Accidents"], hi: ["मोतियाबिंद", "कॉस्मेटिक सर्जरी", "टाइफाइड", "दुर्घटनाएं"] }, 
        ans: 1 
      },
      { 
        q: { en: "Cashless facility is available at:", hi: "कैशलेस सुविधा कहाँ उपलब्ध होती है?" }, 
        options: { en: ["Any Hospital", "Network Hospitals", "Government Hospitals only", "Clinics"], hi: ["कोई भी अस्पताल", "नेटवर्क अस्पताल", "केवल सरकारी अस्पताल", "क्लीनिक"] }, 
        ans: 1 
      },
      { 
        q: { en: "What is 'Portability' in health insurance?", hi: "स्वास्थ्य बीमा में 'पोर्टेबिलिटी' (Portability) क्या है?" }, 
        options: { en: ["Moving abroad", "Switching insurers without losing benefits", "Changing nominees", "Increasing sum assured"], hi: ["विदेश जाना", "लाभ खोए बिना बीमाकर्ता बदलना", "नामित व्यक्ति बदलना", "बीमा राशि बढ़ाना"] }, 
        ans: 1 
      },
      { 
        q: { en: "Critical Illness policy provides:", hi: "गंभीर बीमारी (Critical Illness) पॉलिसी क्या प्रदान करती है?" }, 
        options: { en: ["Reimbursement", "Lump sum benefit", "Cashless only", "Daily allowance"], hi: ["प्रतिपूर्ति", "एकमुश्त राशि लाभ (Lump sum)", "केवल कैशलेस", "दैनिक भत्ता"] }, 
        ans: 1 
      },
      { 
        q: { en: "Section 80D provides tax benefit for:", hi: "धारा 80D किसके लिए कर लाभ प्रदान करती है?" }, 
        options: { en: ["Life Insurance", "Health Insurance", "Home Loan", "Education Loan"], hi: ["जीवन बीमा", "स्वास्थ्य बीमा", "गृह ऋण", "शिक्षा ऋण"] }, 
        ans: 1 
      },
      { 
        q: { en: "What is 'Domiciliary Hospitalization'?", hi: "'डोमिसिलरी हॉस्पिटलाइजेशन' क्या है?" }, 
        options: { en: ["Treatment at home", "Treatment abroad", "OPD treatment", "Day care procedure"], hi: ["घर पर इलाज", "विदेश में इलाज", "ओपीडी उपचार", "डे केयर प्रक्रिया"] }, 
        ans: 0 
      },
      { 
        q: { en: "Pre-hospitalization expenses are usually covered for:", hi: "अस्पताल में भर्ती होने से पहले के खर्च (Pre-hospitalization) आमतौर पर कितने दिनों के लिए कवर होते हैं?" }, 
        options: { en: ["10 days", "30 days", "60 days", "90 days"], hi: ["10 दिन", "30 दिन", "60 दिन", "90 दिन"] }, 
        ans: 1 
      },
      { 
        q: { en: "No Claim Bonus (NCB) in health insurance results in:", hi: "स्वास्थ्य बीमा में नो क्लेम बोनस (NCB) का क्या परिणाम होता है?" }, 
        options: { en: ["Cash back", "Increased Sum Assured", "Lower Premium next year", "Gift vouchers"], hi: ["कैश बैक", "बीमा राशि में वृद्धि (या कम प्रीमियम)", "अगले साल कम प्रीमियम", "गिफ्ट वाउचर"] }, 
        ans: 1 
      },
      { 
        q: { en: "Family Floater plan means:", hi: "फैमिली फ्लोटर (Family Floater) प्लान का क्या अर्थ है?" }, 
        options: { en: ["Separate cover for all", "Single Sum Assured shared by family", "Only for children", "Only for parents"], hi: ["सभी के लिए अलग कवर", "परिवार द्वारा साझा की गई एकल बीमा राशि", "केवल बच्चों के लिए", "केवल माता-पिता के लिए"] }, 
        ans: 1 
      },
    ]
  };

  const selectedSet = baseQuestions[category] || baseQuestions['life'];
  
  let fullExam = [];
  for (let i = 0; i < 50; i++) {
    const baseQ = selectedSet[i % selectedSet.length];
    fullExam.push({
      id: i + 1,
      // Pass bilingual objects directly
      question: baseQ.q,
      options: baseQ.options,
      correctAnswer: baseQ.ans,
      // Suffix generation needs to handle bilingual strings if we want variations
      // For simplicity in this demo, we reuse the exact questions cyclically
      // to ensure perfect translations are shown.
    });
  }
  return fullExam;
};


// --- COMPONENT: EXAM ENGINE ---
const ExamEngine = ({ type, title, onExit }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({}); 
  const [timeLeft, setTimeLeft] = useState(60 * 60); 
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [language, setLanguage] = useState('en'); // 'en' or 'hi'

  useEffect(() => {
    const qData = generateQuestions(type);
    setQuestions(qData);
  }, [type]);

  useEffect(() => {
    if (isSubmitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted]);

  const handleOptionSelect = (optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestionIndex].id]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setIsSubmitted(true);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getPassStatus = () => {
    const percentage = (score / 50) * 100;
    return percentage >= 35 ? "PASSED" : "FAILED";
  };

  if (questions.length === 0) return <div className="p-10 text-center">Loading Exam...</div>;

  const currentQ = questions[currentQuestionIndex];

  // --- VIEW: EXAM RESULT ---
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className={`p-6 text-center text-white ${getPassStatus() === 'PASSED' ? 'bg-green-600' : 'bg-red-600'}`}>
            <h2 className="text-3xl font-bold mb-2">{title} Results</h2>
            <div className="text-6xl font-extrabold mb-2">{Math.round((score / 50) * 100)}%</div>
            <div className="text-xl font-medium tracking-wider">{getPassStatus()}</div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-2 gap-6 mb-8 text-center">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-slate-500 text-sm uppercase font-bold mb-1">Score</div>
                <div className="text-2xl font-bold text-slate-800">{score} / 50</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-slate-500 text-sm uppercase font-bold mb-1">Time Taken</div>
                <div className="text-2xl font-bold text-slate-800">{formatTime(3600 - timeLeft)}</div>
              </div>
            </div>

            <p className="text-center text-slate-600 mb-8">
              {getPassStatus() === 'PASSED' 
                ? (language === 'en' ? "Congratulations! You have cleared the mock exam." : "बधाई हो! आपने मॉक परीक्षा पास कर ली है।")
                : (language === 'en' ? "Keep practicing! You need 35% to pass." : "अभ्यास जारी रखें! पास होने के लिए आपको 35% की आवश्यकता है।")}
            </p>

            <div className="flex flex-col gap-3">
              <button 
                onClick={onExit}
                className="w-full py-3 bg-slate-900 text-white rounded-lg font-bold hover:bg-slate-800 transition-colors"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- VIEW: ACTIVE EXAM ---
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Bar */}
      <div className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-10 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <button onClick={onExit} className="text-slate-500 hover:text-red-600 transition-colors" title="Exit Exam">
            <X size={24} />
          </button>
          <div>
            <h1 className="font-bold text-slate-900 text-sm md:text-base hidden md:block">{title}</h1>
            <h1 className="font-bold text-slate-900 text-sm md:text-base md:hidden">Exam</h1>
            <span className="text-xs text-slate-500">IC-38 Certification Mock</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
           {/* Language Switcher */}
           <button 
             onClick={toggleLanguage}
             className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition-colors"
           >
             <Languages size={16} />
             <span>{language === 'en' ? 'English' : 'हिंदी'}</span>
           </button>

           <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-600 animate-pulse' : 'text-blue-700'}`}>
             <Clock size={20} />
             {formatTime(timeLeft)}
           </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-4 gap-4">
        
        {/* Left: Question Area */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-10 flex flex-col">
          <div className="mb-6 flex justify-between items-start">
             <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
               Question {currentQuestionIndex + 1} of 50
             </span>
          </div>

          <h2 className="text-xl md:text-2xl font-medium text-slate-900 mb-8 leading-relaxed">
            {currentQ.question[language]}
          </h2>

          <div className="space-y-4 mb-8">
            {currentQ.options[language].map((option, idx) => (
              <label 
                key={idx}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  answers[currentQ.id] === idx 
                    ? 'border-blue-600 bg-blue-50' 
                    : 'border-slate-100 hover:border-blue-200 hover:bg-slate-50'
                }`}
              >
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                   answers[currentQ.id] === idx ? 'border-blue-600' : 'border-slate-300'
                }`}>
                  {answers[currentQ.id] === idx && (
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  )}
                </div>
                <input 
                  type="radio" 
                  name={`q-${currentQuestionIndex}`} 
                  className="hidden" 
                  checked={answers[currentQ.id] === idx}
                  onChange={() => handleOptionSelect(idx)}
                />
                <span className="text-slate-700 text-lg">{option}</span>
              </label>
            ))}
          </div>

          {/* Nav Buttons */}
          <div className="mt-auto pt-6 border-t border-slate-100 flex justify-between">
            <button 
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              disabled={currentQuestionIndex === 0}
              className="px-6 py-2 rounded-lg text-slate-600 font-medium hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft size={18} /> {language === 'en' ? 'Previous' : 'पिछला'}
            </button>
            
            {currentQuestionIndex === 49 ? (
              <button 
                onClick={handleSubmit}
                className="px-8 py-2 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
              >
                {language === 'en' ? 'Submit Exam' : 'परीक्षा जमा करें'}
              </button>
            ) : (
              <button 
                onClick={() => setCurrentQuestionIndex(prev => Math.min(49, prev + 1))}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                {language === 'en' ? 'Next' : 'अगला'} <ChevronRight size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Right: Question Palette (Desktop only mostly) */}
        <div className="w-full md:w-80 bg-white rounded-2xl shadow-sm border border-slate-200 p-4 h-fit hidden md:block">
          <h3 className="text-sm font-bold text-slate-500 uppercase mb-4">Question Palette</h3>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isCurrent = currentQuestionIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentQuestionIndex(idx)}
                  className={`w-10 h-10 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                    isCurrent ? 'ring-2 ring-blue-600 ring-offset-2 bg-white text-blue-600 border border-blue-200' :
                    isAnswered ? 'bg-blue-600 text-white border border-blue-600' :
                    'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              )
            })}
          </div>
          <div className="mt-6 space-y-2">
             <div className="flex items-center gap-2 text-xs text-slate-500">
               <div className="w-4 h-4 rounded bg-blue-600"></div> Answered
             </div>
             <div className="flex items-center gap-2 text-xs text-slate-500">
               <div className="w-4 h-4 rounded bg-slate-100 border border-slate-200"></div> Not Answered
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PORTFOLIO COMPONENT ---
const Portfolio = () => {
  const [activeView, setActiveView] = useState('portfolio'); // 'portfolio', 'life', 'general', 'health'
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // If exam is active, render Exam Engine
  if (activeView !== 'portfolio') {
    let title = "";
    if (activeView === 'life') title = "IC-38 Life Insurance Exam";
    if (activeView === 'general') title = "IC-38 General Insurance Exam";
    if (activeView === 'health') title = "IC-38 Health Insurance Exam";
    
    return <ExamEngine type={activeView} title={title} onExit={() => setActiveView('portfolio')} />;
  }

  // --- STANDARD PORTFOLIO VIEW ---
  const navigation = [
    { name: 'About', href: '#about' },
    { name: 'Training Modules', href: '#services' },
    { name: 'Experience', href: '#experience' },
    { name: 'Insights', href: '#blog' },
    { name: 'Mock Exams', href: '#mock-exams' },
  ];

  // Corporate Training Modules
  const trainingModules = [
    {
      title: "Corporate Sales Mastery",
      icon: TrendingUp,
      description: "End-to-end sales training designed to increase conversion rates and ticket size in the BFSI sector.",
      features: ["Advanced Needs Analysis", "Objection Handling Scripts", "Closing Psychology"]
    },
    {
      title: "Leadership & Recruitment",
      icon: Users,
      description: "Strategic frameworks for managers to build, mentor, and retain high-performing agency teams.",
      features: ["Recruitment Funnels", "Retention Strategies", "Performance Coaching"]
    },
    {
      title: "Strategic Execution (4DX)",
      icon: Target,
      description: "Implementation workshops for the 4 Disciplines of Execution to drive accountability and results.",
      features: ["WIG Formulation", "Scoreboard Design", "Cadence of Accountability"]
    },
    {
      title: "Financial Product Expert",
      icon: Presentation,
      description: "Deep-dive technical training on Life Insurance, ULIPs, and Wealth Management solutions.",
      features: ["Product Deconstruction", "Tax Planning", "Competitor Analysis"]
    }
  ];

  // Mock Exams Data
  const examModules = [
    {
      id: 'life',
      title: "IC-38 Life Insurance Agent",
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
      description: "Comprehensive practice test covering life insurance principles, regulations, and policy frameworks.",
      questions: "50 Questions",
      time: "60 Mins"
    },
    {
      id: 'general',
      title: "IC-38 General Insurance Agent",
      icon: Shield,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      description: "Mock exam focused on non-life sectors including motor, health, and property insurance standards.",
      questions: "50 Questions",
      time: "60 Mins"
    },
    {
      id: 'health',
      title: "IC-38 Health Insurance Agent",
      icon: Activity,
      color: "text-green-600",
      bgColor: "bg-green-100",
      description: "Specialized test for health insurance regulations, mediclaim policies, and critical illness covers.",
      questions: "50 Questions",
      time: "60 Mins"
    }
  ];

  // Data derived from Resume
  const experience = [
    {
      company: "Kotak Mahindra Life Insurance",
      role: "Business Development Training Manager",
      period: "Feb 2023 - Present",
      location: "India",
      description: "Driving sales growth through recruitment, mentoring, and strategic market development.",
      achievements: [
        "Led sales team to significant revenue growth.",
        "Implemented structured training improving customer acquisition.",
        "Developed innovative sales strategies for the Insurance sector."
      ]
    },
    {
      company: "ONE MY CHOICE",
      role: "Territory Sales In-charge (Rajasthan & MP)",
      period: "Feb 2021 - Feb 2023",
      location: "Rajasthan, India",
      description: "Responsible for driving sales growth, managing teams, and expanding business operations.",
      achievements: [
        "Expanded business operations, opening multiple new branches.",
        "Achieved Best Team Leader Award.",
        "Managed Channel Partner Development and Market Expansion."
      ]
    },
    {
      company: "Tata Capital Ltd",
      role: "Area Sales Manager",
      period: "June 2019 - Dec 2019",
      location: "Rajasthan, UP",
      description: "Managed financial advisors, driving sales in consumer loans and commercial finance.",
      achievements: [
        "Promoted from Assistant Branch Manager to Branch Manager in 6 months.",
        "Implemented 4DX execution settings improving efficiency.",
        "Organized business seminars for wealth management."
      ]
    },
    {
      company: "LIC of India",
      role: "Financial Planning Consultant",
      period: "Oct 2015 - April 2019",
      location: "India",
      description: "Provided financial consultation regarding term plans, ULIPs, and retirement policies.",
      achievements: [
        "Recognized for outstanding client service and retention.",
        "Expertise in wealth management and tax saving solutions."
      ]
    }
  ];

  // Real LinkedIn Posts
  const blogPosts = [
    {
      id: 1,
      title: "JFM Year-End Sales Strategy",
      preview: "As we approach the critical JFM (Jan-Feb-March) quarter, having a robust sales strategy is non-negotiable for success...",
      date: "Posted on LinkedIn",
      likes: 42,
      comments: 8,
      image: "blue",
      url: "https://www.linkedin.com/posts/supersunil_jfm-yearend-salesstrategy-activity-7425771786576932865-nTyi"
    },
    {
      id: 2,
      title: "Recruitment & Career Growth",
      preview: "Is job hopping the new normal? Discussing the impact of frequent transitions on long-term career growth and stability...",
      date: "Posted on LinkedIn",
      likes: 35,
      comments: 12,
      image: "gold",
      url: "https://www.linkedin.com/posts/supersunil_recruitment-jobhopping-careergrowth-activity-7425772803825745920-f-U_"
    },
    {
      id: 3,
      title: "Work-Life Balance: The Sunday Reset",
      preview: "Productivity isn't just about grinding 24/7. Here is why the Sunday Reset is crucial for sustained success and mental health...",
      date: "Posted on LinkedIn",
      likes: 56,
      comments: 5,
      image: "dark",
      url: "https://www.linkedin.com/posts/supersunil_worklifebalance-sundayreset-productivity-activity-7426183441043374081-W-M6"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <span className="font-bold text-xl tracking-tight text-slate-800">Sunil Meena</span>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-slate-600 hover:text-blue-900 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2"
              >
                <Briefcase size={16} />
                Hire for Training
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-slate-600 hover:text-slate-900">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-900 hover:bg-slate-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-800/30 border border-blue-500/30 text-blue-300 text-sm font-medium mb-6">
                  <Award size={16} />
                  <span>Corporate Trainer & Sales Consultant</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  Empower Your Workforce with <span className="text-blue-400">High-Impact Training</span>
                </h1>
                <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-2xl mx-auto md:mx-0">
                  Specialized in building high-performance sales teams, implementing 4DX strategies, and delivering customized corporate training modules for the BFSI sector.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a href="#contact" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all flex items-center justify-center gap-2">
                    <Building2 size={18} />
                    Hire Me for Training
                  </a>
                  <a href="#services" className="px-8 py-3 bg-transparent border border-white/20 hover:bg-white/10 text-white rounded-lg font-semibold transition-all">
                    Explore Modules
                  </a>
                </div>
              </div>
              
              {/* Profile Image Placeholder */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0">
                <div className="absolute inset-0 bg-blue-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-full h-full rounded-full border-4 border-white/10 overflow-hidden shadow-2xl bg-slate-800 flex items-center justify-center">
                    <img 
                    src="sunil.png" 
                    alt="Sunil Meena" 
                    className="w-full h-full object-cover" 
                    />
                </div>
                <div className="absolute bottom-4 right-4 bg-white text-slate-900 p-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-semibold">Results Driven</p>
                    <p className="text-sm font-bold">Revenue Growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services / Modules Section */}
      <div id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">Services Offered</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-4">Corporate Training Solutions</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-slate-600 max-w-2xl mx-auto mt-4">
              Customized training programs designed to align with your organization's goals and drive measurable results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {trainingModules.map((module, index) => (
              <div key={index} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <module.icon size={28} />
                  </div>
                  <span className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1 rounded-full">MODULE {index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{module.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">{module.description}</p>
                <div className="space-y-3">
                  {module.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                      <CheckCircle2 size={16} className="text-green-500" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Experience Section */}
      <div id="experience" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Professional Track Record</h2>
              <div className="w-20 h-1 bg-blue-600 rounded-full"></div>
            </div>
            <a href="https://www.linkedin.com/in/supersunil" className="hidden md:flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 mt-4 md:mt-0">
              View on LinkedIn <ExternalLink size={16} />
            </a>
          </div>

          <div className="space-y-12">
            {experience.map((job, index) => (
              <div key={index} className="relative pl-8 md:pl-0">
                {/* Timeline Line (Desktop) */}
                <div className="hidden md:block absolute left-[50%] top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2"></div>
                
                <div className={`md:flex items-center justify-between gap-12 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-sm md:-translate-x-1/2 mt-1.5 md:mt-0"></div>

                  {/* Date */}
                  <div className={`md:w-1/2 mb-2 md:mb-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-bold">
                      {job.period}
                    </span>
                  </div>

                  {/* Card */}
                  <div className="md:w-1/2 bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="text-xl font-bold text-slate-900">{job.role}</h3>
                    <div className="text-slate-600 font-medium mb-4 flex items-center gap-2">
                      <Briefcase size={16} /> {job.company}
                    </div>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                      {job.description}
                    </p>
                    <ul className="space-y-2">
                      {job.achievements.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog / LinkedIn Integration Section */}
      <div id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Trainer's Insights</h2>
              <p className="text-slate-600">Thought leadership on Sales, Recruitment, and Strategy</p>
            </div>
            <a 
              href="https://www.linkedin.com/in/supersunil" 
              target="_blank" 
              rel="noreferrer"
              className="px-4 py-2 bg-[#0077b5] text-white rounded-md flex items-center gap-2 hover:bg-[#006097] transition-colors"
            >
              <Linkedin size={18} />
              <span className="hidden sm:inline">Follow on LinkedIn</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <a 
                key={post.id} 
                href={post.url} 
                target="_blank" 
                rel="noreferrer"
                className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                {/* Mock Image Header */}
                <div className={`h-32 w-full ${
                  post.image === 'blue' ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 
                  post.image === 'gold' ? 'bg-gradient-to-r from-amber-500 to-amber-300' : 
                  'bg-slate-800'
                } relative`}>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-slate-800">
                    ARTICLE
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-700 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm mb-4 flex-1">
                    {post.preview}
                  </p>
                  
                  <div className="border-t border-slate-100 pt-4 mt-auto">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{post.date}</span>
                      <div className="flex items-center gap-3">
                         <span>👍 {post.likes}</span>
                         <span>💬 {post.comments}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

       {/* Mock Exams Section - NEW */}
       <div id="mock-exams" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase">Student Corner</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-4 mb-4">IC-38 Mock Exams</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
            <p className="text-slate-600 max-w-2xl mx-auto mt-4">
              Prepare for your IRDAI Agent examination with our free, comprehensive practice tests. Select your specialization below to begin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {examModules.map((exam, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="p-8">
                  <div className={`w-14 h-14 ${exam.bgColor} ${exam.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <exam.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{exam.title}</h3>
                  <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                    {exam.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500 font-semibold mb-6">
                    <div className="flex items-center gap-1">
                      <BookOpen size={16} /> {exam.questions}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target size={16} /> {exam.time}
                    </div>
                  </div>

                  <button 
                    onClick={() => setActiveView(exam.id)}
                    className="w-full py-3 rounded-lg border-2 border-slate-900 text-slate-900 font-bold hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <PlayCircle size={18} /> Start Mock Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-12">Education</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-bold text-lg">KL University</h3>
              <p className="text-slate-600">MBA, HR / Marketing</p>
              <p className="text-slate-400 text-sm mt-2">2023 - 2025</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <GraduationCap size={24} />
              </div>
              <h3 className="font-bold text-lg">University of Rajasthan</h3>
              <p className="text-slate-600">Bachelor of Arts</p>
              <p className="text-slate-400 text-sm mt-2">2019 - 2023</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section - UPDATED for Corporate */}
      <div id="contact" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-xs font-bold mb-4">WORK WITH SUNIL</div>
              <h2 className="text-3xl font-bold mb-6">Partner for Growth</h2>
              <p className="text-slate-400 mb-8 text-lg">
                Looking to upskill your sales team or need a keynote speaker for your next corporate event? Fill out the form to discuss your requirements.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Email</p>
                    <a href="mailto:sunilmeena7775@gmail.com" className="text-lg font-semibold hover:text-blue-400 transition-colors">sunilmeena7775@gmail.com</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                    <Linkedin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/supersunil" className="text-lg font-semibold hover:text-blue-400 transition-colors">linkedin.com/in/supersunil</a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400">Location</p>
                    <p className="text-lg font-semibold">Jaipur, Rajasthan, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 text-slate-900">
              <h3 className="text-xl font-bold mb-6">Hire for Training / Consulting</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                    <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Company Name" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="work@company.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Interested In</label>
                  <select className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                    <option>Corporate Sales Training</option>
                    <option>Leadership Workshop</option>
                    <option>4DX Implementation</option>
                    <option>Keynote Speaking</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                  <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Tell me about your training needs..."></textarea>
                </div>
                <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2">
                  Send Inquiry <ChevronRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-slate-950 text-slate-600 py-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Sunil Meena. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Portfolio;