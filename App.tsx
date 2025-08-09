import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Layout from './components/Layout';
import MAXAssistant from './components/AIAssistant';
import MAXFab from './components/MAXFab';
import { TREATMENTS, ALL_ARTICLES } from './constants';
import type { TreatmentProduct, TreatmentArticle, Question, Treatments, Questionnaire } from './types';
import { Icon, ChevronRightIcon } from './components/Icons';
import { generateContent } from './services/geminiService';


const HomePage: React.FC = () => {
    const handleGetStartedClick = () => {
        const treatmentsSection = document.getElementById('treatments');
        treatmentsSection?.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <div>
            {/* Using an inline style tag for the keyframes animation to keep it self-contained */}
            <section 
                className="text-white relative overflow-hidden bg-cover bg-center hero-kenburns" 
                style={{ 
                    height: '70vh', 
                    backgroundImage: "url('/hero.jpg')" 
                }}>
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white text-shadow-lg">Discreet, Doctor-Trusted Men's Health</h1>
                    <p className="mt-4 max-w-2xl text-lg sm:text-xl text-gray-200 text-shadow">Access genuine treatments for hair loss, ED, and more. All from the comfort of home.</p>
                    <button onClick={handleGetStartedClick} className="mt-8 bg-amber-500 text-slate-900 font-bold px-8 py-3 rounded-lg text-lg hover:bg-amber-400 transition-all duration-300 transform hover:scale-105">
                        Get Started
                    </button>
                </div>
            </section>

            <section id="treatments" className="py-20 bg-gray-50">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">Treatments for the modern man.</h2>
                        <p className="mt-4 text-lg text-gray-600">Confidential, convenient, and delivered to your door.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Object.entries(TREATMENTS).map(([key, treatment]) => (
                            <Link to={`/treatment/${key}`} key={key} className="block bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 group">
                                <div className="flex items-center mb-4">
                                    <div className="bg-slate-100 rounded-lg p-3 mr-4">
                                        <Icon classes={`${treatment.icon} text-slate-700 text-2xl`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800">{treatment.name}</h3>
                                        <p className="text-sm text-gray-500">{treatment.tagline}</p>
                                    </div>
                                </div>
                                <div className="text-right text-amber-600 font-semibold group-hover:underline">
                                    Learn More <ChevronRightIcon className="inline w-4 h-4" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                     <h2 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">How It Works</h2>
                     <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">A simple, three-step process to get the treatment you need, discreetly and affordably.</p>
                    <div className="grid md:grid-cols-3 gap-8 mt-12 text-left">
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <div className="bg-amber-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg mr-4">1</div>
                                <h3 className="text-xl font-semibold text-slate-800">Online Consultation</h3>
                            </div>
                            <p className="text-gray-600">Complete a quick, confidential questionnaire about your health and symptoms. It’s free and takes just a few minutes.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                             <div className="flex items-center mb-4">
                                <div className="bg-amber-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg mr-4">2</div>
                                <h3 className="text-xl font-semibold text-slate-800">Doctor Review</h3>
                            </div>
                            <p className="text-gray-600">A UK-licensed clinician will review your information to ensure treatment is safe and appropriate for you.</p>
                        </div>
                        <div className="bg-gray-50 p-6 rounded-lg">
                            <div className="flex items-center mb-4">
                                <div className="bg-amber-500 text-white rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg mr-4">3</div>
                                <h3 className="text-xl font-semibold text-slate-800">Discreet Delivery</h3>
                            </div>
                            <p className="text-gray-600">If approved, your treatment is shipped directly to your door in plain packaging. Free delivery on all orders.</p>
                        </div>
                    </div>
                </div>
            </section>

             <section className="py-20 bg-slate-800 text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                     <Icon classes="fas fa-quote-left text-amber-400 text-4xl mb-4" />
                     <blockquote className="max-w-3xl mx-auto">
                        <p className="text-2xl font-medium">"I was skeptical about trying again after other products failed, but the Complete Hair Plan from MANNEX has made a visible difference in just a few months. So easy and discreet."</p>
                        <footer className="mt-6 text-lg font-semibold">- James P., London</footer>
                    </blockquote>
                </div>
            </section>
        </div>
    );
};


const TreatmentPage: React.FC = () => {
    const { treatmentId } = useParams<{ treatmentId: string }>();
    const navigate = useNavigate();
    const treatment = treatmentId ? TREATMENTS[treatmentId] : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [treatmentId]);

    if (!treatment) {
        return (
            <div className="container mx-auto p-8 text-center">
                <h2 className="text-2xl font-bold">Treatment not found.</h2>
                <Link to="/" className="text-amber-600 hover:underline mt-4 inline-block">Go back to homepage</Link>
            </div>
        );
    }
    
    const [selectedProduct, setSelectedProduct] = useState<TreatmentProduct | null>(treatment.products.find(p => p.recommended) || treatment.products[0]);

    const handleStartConsultation = () => {
        navigate(`/treatment/${treatmentId}/consultation`);
    }

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-slate-800 text-white py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <img src={treatment.imageUrl} alt={`${treatment.name}`} className="w-full h-full object-cover" />
                </div>
                 <div className="relative z-10">
                    <i className={`${treatment.icon} text-5xl text-amber-400 mb-4`}></i>
                    <h1 className="text-4xl md:text-5xl font-extrabold">{treatment.name}</h1>
                    <p className="mt-2 text-lg text-gray-300 max-w-2xl mx-auto">{treatment.tagline}</p>
                 </div>
            </section>
            
            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
                 <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left/Main Column: Product Selection & Info */}
                    <div className="lg:col-span-2">
                        <h2 className="text-3xl font-bold text-slate-900 mb-6">Choose Your Treatment Plan</h2>
                        
                        {/* Product Selector */}
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                           <div className="space-y-4">
                                {treatment.products.map((product, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setSelectedProduct(product)}
                                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 flex justify-between items-center ${selectedProduct?.name === product.name ? 'border-amber-500 ring-2 ring-amber-500' : 'border-gray-200 hover:border-gray-400'}`}
                                    >
                                        <div>
                                            <h3 className="font-bold text-lg text-slate-800 flex items-center">{product.name} 
                                                {product.recommended && <span className="ml-2 bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded-full">Recommended</span>}
                                            </h3>
                                            <p className="text-gray-600 text-sm">{product.description}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0 ml-4">
                                            <p className="font-bold text-lg text-slate-900">${product.priceSub}/month</p>
                                            <p className="text-sm text-gray-500 line-through">${product.priceOneOff} one-off</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {selectedProduct && (
                                <div className="mt-6 p-6 bg-gray-50 rounded-lg">
                                    <h4 className="text-xl font-bold mb-4">What's included:</h4>
                                    <div className="flex items-start">
                                        <img src={selectedProduct.imageUrl} alt={selectedProduct.name} className="w-24 h-24 rounded-md object-cover mr-4"/>
                                        <div>
                                            <p className="text-gray-700">{selectedProduct.description}</p>
                                            {selectedProduct.patientLeaflet && (
                                                <div className="mt-3">
                                                    <h5 className="font-semibold text-slate-800">{selectedProduct.patientLeaflet.title}</h5>
                                                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{selectedProduct.patientLeaflet.content}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}

                             <div className="mt-8 text-center">
                                <button onClick={handleStartConsultation} className="w-full md:w-auto bg-slate-700 text-white font-bold px-10 py-4 rounded-lg text-lg hover:bg-slate-800 transition-colors duration-300 transform hover:scale-105">
                                    Start Free Consultation
                                </button>
                                <p className="text-xs text-gray-500 mt-2">No commitment. Cancel anytime.</p>
                            </div>
                        </div>

                    </div>
                    
                    {/* Right/Side Column: Learn More */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
                           <h3 className="text-2xl font-bold text-slate-900 mb-4 border-b pb-2">Learn More</h3>
                           <ul className="space-y-4">
                               {treatment.articles.slice(0, 3).map(article => (
                                   <li key={article.id}>
                                       <Link to={`/learn/${article.id}`} className="group">
                                            <p className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">{article.title}</p>
                                            <p className="text-sm text-gray-500">{article.category}</p>
                                       </Link>
                                   </li>
                               ))}
                               <li className="pt-2">
                                   <Link to="/learn" className="font-bold text-amber-600 hover:underline">
                                       View all articles <ChevronRightIcon className="inline w-4 h-4"/>
                                   </Link>
                               </li>
                           </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LearnPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [filteredArticles, setFilteredArticles] = useState<TreatmentArticle[]>(ALL_ARTICLES);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const categories = [...new Set(ALL_ARTICLES.map(a => a.category))];

    useEffect(() => {
        const category = searchParams.get('category');
        setSelectedCategory(category);

        if (category) {
            setFilteredArticles(ALL_ARTICLES.filter(a => a.category === category));
        } else {
            setFilteredArticles(ALL_ARTICLES);
        }
    }, [searchParams]);

    return (
        <div className="bg-white">
            <section className="bg-slate-100 py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Learn</h1>
                    <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600">Expert advice and insights on men's wellness, backed by science.</p>
                </div>
            </section>

             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Category Filters */}
                <div className="flex flex-wrap justify-center gap-2 mb-12">
                    <Link
                        to="/learn"
                        className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${!selectedCategory ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                    >
                        All
                    </Link>
                    {categories.map(cat => (
                         <Link
                            key={cat}
                            to={`/learn?category=${cat}`}
                            className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors ${selectedCategory === cat ? 'bg-slate-800 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                        >
                            {cat}
                        </Link>
                    ))}
                </div>

                 {/* Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map(article => (
                        <Link to={`/learn/${article.id}`} key={article.id} className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                           <div className="p-6">
                               <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">{article.category}</p>
                               <h3 className="mt-2 text-xl font-bold text-slate-900 group-hover:text-amber-700 transition-colors">{article.title}</h3>
                               <p className="mt-3 text-gray-600 text-base line-clamp-3">{article.content}</p>
                           </div>
                           <div className="p-6 bg-gray-50 text-right font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">
                               Read article <ChevronRightIcon className="inline w-4 h-4" />
                           </div>
                        </Link>
                    ))}
                </div>
             </div>
        </div>
    );
};


const ArticlePage: React.FC = () => {
    const { articleId } = useParams<{ articleId: string }>();
    const article = ALL_ARTICLES.find(a => a.id.toString() === articleId);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [articleId]);

    if (!article) {
        return <div className="p-8">Article not found.</div>;
    }
    
    // Find related articles (same category, not the same article)
    const relatedArticles = ALL_ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);
    
    // Find the treatment this article belongs to
    const treatmentKey = Object.keys(TREATMENTS).find(key => TREATMENTS[key].articles.some(a => a.id === article.id));
    const treatment = treatmentKey ? TREATMENTS[treatmentKey] : null;

    return (
        <div className="bg-white py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-4 gap-12">
                    {/* Main Article Content */}
                    <article className="lg:col-span-3">
                         <div className="mb-8">
                            <nav aria-label="breadcrumb">
                                <ol className="flex items-center space-x-2 text-sm text-gray-500">
                                    <li><Link to="/learn" className="hover:underline">Learn</Link></li>
                                    <li><ChevronRightIcon className="w-4 h-4" /></li>
                                    <li><Link to={`/learn?category=${article.category}`} className="hover:underline">{article.category}</Link></li>
                                </ol>
                            </nav>
                            <h1 className="mt-2 text-4xl font-extrabold text-slate-900 tracking-tight">{article.title}</h1>
                        </div>
                        <div className="prose prose-lg max-w-none prose-a:text-amber-600 hover:prose-a:text-amber-800">
                            <p>{article.content}</p>
                        </div>
                    </article>
                    
                     {/* Sidebar */}
                     <aside className="lg:col-span-1">
                        <div className="sticky top-24 space-y-8">
                             {treatment && (
                                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4">Related Treatment</h3>
                                     <div className="flex items-center gap-4">
                                        <div className="bg-slate-100 rounded-lg p-2">
                                            <Icon classes={`${treatment.icon} text-slate-700 text-2xl`} />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold">{treatment.name}</h4>
                                            <Link to={`/treatment/${treatmentKey}`} className="text-sm text-amber-600 hover:underline font-semibold">
                                                View Treatment
                                            </Link>
                                        </div>
                                     </div>
                                </div>
                             )}

                            {relatedArticles.length > 0 && (
                                <div className="bg-white p-6 rounded-lg shadow-sm border">
                                    <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">More in {article.category}</h3>
                                    <ul className="space-y-4">
                                        {relatedArticles.map(relArticle => (
                                           <li key={relArticle.id}>
                                               <Link to={`/learn/${relArticle.id}`} className="group">
                                                    <p className="font-semibold text-slate-800 group-hover:text-amber-600 transition-colors">{relArticle.title}</p>
                                               </Link>
                                           </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

const ConsultationPage: React.FC = () => {
  const { treatmentId } = useParams<{ treatmentId: string }>();
  const navigate = useNavigate();
  const treatment = treatmentId ? TREATMENTS[treatmentId] : null;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [height, setHeight] = useState({ ft: '', in: '' });
  const [weight, setWeight] = useState({ st: '', lbs: '' });
  const [bmi, setBmi] = useState<number | null>(null);
  const [isEligible, setIsEligible] = useState<boolean | null>(null);
  const [ineligibilityMessage, setIneligibilityMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  
  const mainQuestionnaire = treatment?.questionnaire || [];
  const followUpQuestionnaire = treatment?.followUpQuestionnaire || [];
  
  const [activeQuestionnaire, setActiveQuestionnaire] = useState<Questionnaire>(mainQuestionnaire);
  
  const currentQuestion = activeQuestionnaire[currentQuestionIndex];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentQuestionIndex]);

  if (!treatment) {
    return <div>Treatment not found.</div>;
  }
  
  const handleAnswer = (questionId: string, value: any, option?: any) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    // Check for ineligibility
    if (currentQuestion.eligibilityRule && value === currentQuestion.eligibilityRule.ineligibleIf) {
        setIsEligible(false);
        setIneligibilityMessage(currentQuestion.eligibilityRule.message);
        return;
    }
    
    // Check for follow-up questions from options
    if (option?.followUpQuestionId) {
        const followUpQ = followUpQuestionnaire.find(q => q.id === option.followUpQuestionId);
        if (followUpQ) {
            // Prepend the follow-up question to the remaining questions
            const remainingQuestions = activeQuestionnaire.slice(currentQuestionIndex + 1);
            setActiveQuestionnaire([
                ...activeQuestionnaire.slice(0, currentQuestionIndex + 1),
                followUpQ,
                ...remainingQuestions
            ]);
        }
    }
    
    // Move to next question after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < activeQuestionnaire.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // End of questionnaire
        handleSubmit(newAnswers);
      }
    }, 300);
  };
  
  const handleBmiSubmit = () => {
        const heightInches = (parseInt(height.ft) * 12) + parseInt(height.in);
        const weightLbs = (parseInt(weight.st) * 14) + parseInt(weight.lbs);

        if (heightInches > 0 && weightLbs > 0) {
            const bmiValue = (weightLbs / (heightInches * heightInches)) * 703;
            setBmi(bmiValue);
            const newAnswers = { ...answers, bmi: bmiValue.toFixed(1) };
            
            // Example eligibility check for BMI
            if (bmiValue < 27) {
                setIsEligible(false);
                setIneligibilityMessage("Our weight management program is suitable for individuals with a BMI of 27 or greater. We recommend speaking to your GP about other options.");
            } else {
                handleAnswer('bmi_calculator', bmiValue.toFixed(1));
            }
        }
    };

  const handleSubmit = async (finalAnswers: Record<string, any>) => {
    setIsLoading(true);
    setRecommendation('');

    const patientSummary = Object.entries(finalAnswers)
        .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${Array.isArray(value) ? value.join(', ') : value}`)
        .join('\n');

    const prompt = `
        Based on the following patient consultation answers for a ${treatment.name} treatment, provide a brief, reassuring "Doctor's Note" for the patient.
        The note should:
        1. Acknowledge their submission.
        2. Briefly state that based on their answers, they appear to be a good candidate for the treatment.
        3. Recommend a specific product from the list below.
        4. Briefly explain why that product is recommended based on their answers.
        5. DO NOT mention any specific answers they gave. Keep it general.
        6. The tone should be professional, empathetic, and encouraging.
        7. Keep it short, around 2-3 sentences.
        
        Patient Answers:
        ${patientSummary}

        Available Products:
        ${treatment.products.map(p => `- ${p.name}: ${p.description}`).join('\n')}
    `;
    
    const generatedPlan = await generateContent(prompt);
    setRecommendation(generatedPlan);
    setIsLoading(false);
    setIsEligible(true);
  };
  
  const progress = Math.round(((currentQuestionIndex + 1) / activeQuestionnaire.length) * 100);

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion.type) {
      case 'bmi':
        return (
            <div>
                 <p className="text-xl text-slate-700">{currentQuestion.text}</p>
                 <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Height</label>
                         <div className="flex gap-2">
                             <input type="number" value={height.ft} onChange={e => setHeight({...height, ft: e.target.value})} placeholder="ft" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2" />
                             <input type="number" value={height.in} onChange={e => setHeight({...height, in: e.target.value})} placeholder="in" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2" />
                         </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Weight</label>
                        <div className="flex gap-2">
                            <input type="number" value={weight.st} onChange={e => setWeight({...weight, st: e.target.value})} placeholder="st" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2" />
                            <input type="number" value={weight.lbs} onChange={e => setWeight({...weight, lbs: e.target.value})} placeholder="lbs" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2" />
                        </div>
                    </div>
                </div>
                <button onClick={handleBmiSubmit} className="mt-6 w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors">Calculate & Continue</button>
            </div>
        )
      case 'radio':
        return (
          <div>
            <p className="text-xl text-slate-700">{currentQuestion.text}</p>
            <div className="mt-4 space-y-3">
              {currentQuestion.options?.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.id, option.value, option)}
                  className="w-full text-left p-4 bg-white border border-gray-300 rounded-lg hover:bg-amber-50 hover:border-amber-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        );
      case 'checkbox':
        const currentAnswers = answers[currentQuestion.id] || [];
        const toggleAnswer = (value: string) => {
            const newAnswers = currentAnswers.includes(value)
                ? currentAnswers.filter((v: string) => v !== value)
                : [...currentAnswers, value];
            setAnswers({...answers, [currentQuestion.id]: newAnswers });
        }
        return (
             <div>
                <p className="text-xl text-slate-700">{currentQuestion.text}</p>
                <div className="mt-4 space-y-3">
                {currentQuestion.options?.map((option) => (
                    <label key={option.value} className="flex items-center p-4 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-amber-50 transition-colors">
                        <input
                            type="checkbox"
                            checked={currentAnswers.includes(option.value)}
                            onChange={() => toggleAnswer(option.value)}
                            className="h-5 w-5 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                        />
                        <span className="ml-3 text-slate-700">{option.label}</span>
                    </label>
                ))}
                </div>
                <button
                    onClick={() => handleAnswer(currentQuestion.id, answers[currentQuestion.id] || [])}
                    className="mt-6 w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors"
                    disabled={currentAnswers.length === 0 && currentQuestion.required}
                >
                    Continue
                </button>
            </div>
        )
      case 'textarea':
        return (
             <div>
                <p className="text-xl text-slate-700">{currentQuestion.text}</p>
                 <textarea
                    rows={4}
                    value={answers[currentQuestion.id] || ''}
                    onChange={(e) => setAnswers({...answers, [currentQuestion.id]: e.target.value})}
                    className="mt-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm p-2"
                />
                 <button
                    onClick={() => handleAnswer(currentQuestion.id, answers[currentQuestion.id] || '')}
                    className="mt-6 w-full bg-slate-700 text-white font-bold py-3 px-4 rounded-lg hover:bg-slate-800 transition-colors"
                >
                    Continue
                </button>
            </div>
        )
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
          {isEligible === null && (
            <>
            <div className="text-center mb-4">
                <Link to={`/treatment/${treatmentId}`} className="text-slate-600 hover:text-slate-900">&larr; Back to {treatment.name}</Link>
                <h1 className="text-3xl font-bold mt-2 text-slate-800">Online Consultation</h1>
                <p className="text-gray-600">This will help our clinicians understand your needs.</p>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s ease-in-out' }}></div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg transition-all duration-500">
                {renderQuestion()}
            </div>
            </>
          )}

          {isEligible === false && (
               <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                    <Icon classes="fas fa-exclamation-triangle text-red-500 text-5xl mb-4" />
                    <h2 className="text-2xl font-bold text-slate-800">Treatment Not Suitable</h2>
                    <p className="text-slate-600 mt-2">{ineligibilityMessage}</p>
                    <p className="text-slate-600 mt-4 text-sm">Patient safety is our highest priority.</p>
                    <button onClick={() => navigate('/')} className="mt-6 bg-slate-700 text-white font-bold py-3 px-6 rounded-lg hover:bg-slate-800 transition-colors">Back to Home</button>
              </div>
          )}

          {isEligible === true && (
                <div className="bg-white p-8 rounded-xl shadow-lg text-center transition-all duration-500">
                    {isLoading ? (
                        <>
                         <div className="flex justify-center items-center mb-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-800"></div>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-800">Our Doctor is Reviewing Your Answers...</h2>
                        <p className="text-slate-600 mt-2">This will just take a moment.</p>
                        </>
                    ) : (
                         <>
                         <Icon classes="fas fa-check-circle text-green-500 text-5xl mb-4" />
                         <h2 className="text-2xl font-bold text-slate-800">Consultation Complete!</h2>
                         <p className="text-slate-600 mt-2 mb-6">Here is a note from our clinician and your recommended treatment plan.</p>
                         
                         <div className="text-left bg-blue-50 border border-blue-200 p-6 rounded-lg">
                            <h3 className="font-bold text-lg text-slate-900">A Note From Your MANNEX Doctor</h3>
                            <div className="mt-2 text-slate-700 prose" dangerouslySetInnerHTML={{ __html: recommendation }} />
                         </div>

                         <button onClick={() => alert('Proceeding to checkout!')} className="mt-8 bg-amber-500 text-slate-900 font-bold py-3 px-8 rounded-lg hover:bg-amber-400 transition-colors text-lg">
                            Proceed to Checkout
                        </button>
                         </>
                    )}
                </div>
          )}
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [isAssistantOpen, setAssistantOpen] = useState(false);
  const [proactiveMessage, setProactiveMessage] = useState<string | null>(null);
  const location = useLocation();

  // Proactive messaging based on the page
  useEffect(() => {
    let timerId: NodeJS.Timeout;
    // Clear previous message on route change
    setProactiveMessage(null); 

    // Set a new message after a delay
    timerId = setTimeout(() => {
        if(location.pathname.startsWith('/treatment/hair-loss')){
            setProactiveMessage("Seeing signs of hair loss? I can help answer your questions.");
        } else if (location.pathname.startsWith('/treatment/erectile-dysfunction')) {
            setProactiveMessage("Questions about ED? It's more common than you think. Ask me anything.");
        } else if (location.pathname === '/learn') {
            setProactiveMessage("Exploring our articles? Let me know if you're looking for something specific!");
        }
    }, 2000); // 2-second delay

    return () => clearTimeout(timerId); // Cleanup timer on component unmount or location change
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/treatment/:treatmentId" element={<TreatmentPage />} />
        <Route path="/treatment/:treatmentId/consultation" element={<ConsultationPage />} />
        <Route path="/learn" element={<LearnPage />} />
        <Route path="/learn/:articleId" element={<ArticlePage />} />
      </Routes>
       <MAXAssistant isOpen={isAssistantOpen} onClose={() => setAssistantOpen(false)} />
       <MAXFab 
        onOpen={() => setAssistantOpen(true)} 
        proactiveMessage={proactiveMessage} 
        onClearMessage={() => setProactiveMessage(null)} 
       />
    </Layout>
  );
};

export default App;
