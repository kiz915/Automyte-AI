"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/store";
import { ArrowRight, ChevronLeft, Sparkles, Check, Play } from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);

  // Form states
  const [userName, setUserName] = useState("");
  const [experience, setExperience] = useState("");
  const [role, setRole] = useState("");
  const [stage, setStage] = useState(2); // Slider index: 0=Pre-idea, 1=Idea, 2=Pre-MVP, 3=MVP, 4=Customers, 5=Revenue, 6=Public
  const [companyName, setCompanyName] = useState("");

  // Q&A states
  const [questions, setQuestions] = useState([
    { id: 1, text: "Who is the first ideal customer you want your startup to win?", answer: "" },
    { id: 2, text: "How do you expect your company to make money first?", answer: "" },
    { id: 3, text: "What do you believe is your startup's strongest early advantage?", answer: "" }
  ]);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);

  const stages = ["Pre-idea", "Idea", "Pre-MVP", "MVP", "Customers", "Revenue", "Public"];

  const handleNextStep = () => {
    if (step === 1 && !userName.trim()) return;
    if (step === 2 && !experience) return;
    if (step === 3 && !role) return;
    if (step === 5 && !companyName.trim()) return;

    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => Math.max(1, prev - 1));
  };

  const handleAnswerSubmit = () => {
    if (!questions[activeQuestionIdx].answer.trim()) return;
    
    if (activeQuestionIdx < questions.length - 1) {
      setActiveQuestionIdx(prev => prev + 1);
    } else {
      // Trigger briefing generation spinner
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setStep(7); // Go to summary
      }, 3000);
    }
  };

  const handleOnboardingComplete = () => {
    // Save to store
    try {
      updateProfile({
        vision_mission: `Build a highly scalable platform for ${targetAudienceDescription()}.`,
        problem: questions[0].answer,
        solution: `An automated B2B system targeting ${role.toLowerCase()} operations.`,
        target_audience: targetAudienceDescription(),
        business_model: questions[1].answer,
        pricing: "$29/mo premium membership",
        okrs: [
          { objective: "Develop MVP platform", key_results: ["Complete feature sets", "Launch test campaigns"], progress: 10 }
        ]
      });
    } catch (e) {
      console.error("Failed to update profile:", e);
    }

    router.push("/home");
  };

  const targetAudienceDescription = () => {
    return questions[0].answer || "general tech founders";
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-6 font-sans">
      
      {/* Header logo */}
      <div className="absolute top-8 left-8 flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-ink flex items-center justify-center">
          <span className="text-surface-raised text-xs font-bold">A</span>
        </div>
        <span className="text-[18px] font-semibold tracking-tight text-ink">Automyte</span>
      </div>

      <div className="w-full max-w-xl bg-white border border-border rounded-2xl p-8 shadow-sm relative overflow-hidden">
        
        {/* Progress tracker bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-surface">
          <div 
            className="h-full bg-accent-hover transition-all duration-300"
            style={{ width: `${(step / 7) * 100}%` }}
          />
        </div>

        {/* STEP 1: Name Setup */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-accent-hover uppercase tracking-wider">Welcome</span>
              <h1 className="text-2xl font-semibold tracking-tight text-ink">What should we call you?</h1>
              <p className="text-[13px] text-ink-faint">We will use this name to address you across the workspace.</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                required
                className="w-full h-[44px] px-4 rounded-xl border border-border text-[14px] focus:outline-none focus:border-ink/20 bg-surface/30"
              />
              <button
                onClick={handleNextStep}
                disabled={!userName.trim()}
                className="flex items-center justify-center gap-2 w-full h-[44px] rounded-xl bg-ink text-ink-inverted text-[14px] font-[500] hover:bg-[#333] transition-colors disabled:opacity-30 cursor-pointer"
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Product Build Experience */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-ink">What's your experience building products?</h1>
              <p className="text-[13px] text-ink-faint">Help us understand how to coordinate agent support for you.</p>
            </div>
            <div className="space-y-3">
              {[
                { id: "code", label: "I write code myself" },
                { id: "manage", label: "I manage engineers with a dev team" },
                { id: "none", label: "I'm not involved on the technical side" }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setExperience(opt.label)}
                  className={`w-full p-4 rounded-xl border text-left text-[14px] font-medium flex items-center justify-between transition-all cursor-pointer ${
                    experience === opt.label 
                      ? "border-accent-hover bg-accent-subtle/20 text-ink font-semibold" 
                      : "border-border hover:bg-surface/50 text-ink-secondary"
                  }`}
                >
                  {opt.label}
                  {experience === opt.label && <Check className="w-4 h-4 text-accent-hover" />}
                </button>
              ))}
              <div className="flex justify-between items-center pt-4">
                <button onClick={handlePrevStep} className="text-[13.5px] font-medium text-ink-secondary flex items-center gap-1 cursor-pointer bg-transparent border-0">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button 
                  onClick={handleNextStep} 
                  disabled={!experience}
                  className="h-[38px] px-5 rounded-lg bg-ink text-ink-inverted text-[13px] font-[500] hover:bg-[#333] transition-colors cursor-pointer border-0"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Role / Persona Description */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-ink">Which best describes you?</h1>
              <p className="text-[13px] text-ink-faint">Choose your primary functional background.</p>
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {["Product", "Engineering", "Design", "Marketing", "Sales", "Operations", "Founder / Executive", "Other"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setRole(opt)}
                  className={`p-3 rounded-xl border text-left text-[13px] font-medium flex items-center justify-between transition-all cursor-pointer ${
                    role === opt 
                      ? "border-accent-hover bg-accent-subtle/20 text-ink font-semibold" 
                      : "border-border hover:bg-surface/50 text-ink-secondary"
                  }`}
                >
                  {opt}
                  {role === opt && <Check className="w-3.5 h-3.5 text-accent-hover" />}
                </button>
              ))}
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-border-subtle">
              <button onClick={handlePrevStep} className="text-[13.5px] font-medium text-ink-secondary flex items-center gap-1 cursor-pointer bg-transparent border-0">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={handleNextStep} 
                disabled={!role}
                className="h-[38px] px-5 rounded-lg bg-ink text-ink-inverted text-[13px] font-[500] hover:bg-[#333] transition-colors cursor-pointer border-0"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Idea Stage Slider */}
        {step === 4 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight text-ink">What stage is your idea?</h1>
              <p className="text-[13px] text-ink-faint">We adjust project roadmaps based on your development stage.</p>
            </div>
            <div className="space-y-6 py-6">
              {/* Slider Input */}
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="6"
                  value={stage}
                  onChange={(e) => setStage(parseInt(e.target.value))}
                  className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer accent-accent-hover"
                />
                <div className="flex justify-between text-[11px] text-ink-muted font-mono mt-2">
                  {stages.map((stg, i) => (
                    <span key={stg} className={stage === i ? "text-ink font-semibold" : ""}>
                      {stg}
                    </span>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-surface border border-border-subtle text-center text-[13.5px] text-ink-secondary font-medium">
                Current Stage: <span className="text-accent-hover font-semibold">{stages[stage]}</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-border-subtle">
              <button onClick={handlePrevStep} className="text-[13.5px] font-medium text-ink-secondary flex items-center gap-1 cursor-pointer bg-transparent border-0">
                <ChevronLeft className="w-4 h-4" /> Back
              </button>
              <button 
                onClick={handleNextStep}
                className="h-[38px] px-5 rounded-lg bg-ink text-ink-inverted text-[13px] font-[500] hover:bg-[#333] transition-colors cursor-pointer border-0"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Company Name */}
        {step === 5 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-accent-hover uppercase tracking-wider">Company Profile</span>
              <h1 className="text-2xl font-semibold tracking-tight text-ink">Create your company</h1>
              <p className="text-[13px] text-ink-faint">Enter the name of your startup or product idea.</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Enter company name"
                required
                className="w-full h-[44px] px-4 rounded-xl border border-border text-[14px] focus:outline-none focus:border-ink/20 bg-surface/30"
              />
              <div className="flex justify-between items-center pt-4">
                <button onClick={handlePrevStep} className="text-[13.5px] font-medium text-ink-secondary flex items-center gap-1 cursor-pointer bg-transparent border-0">
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button 
                  onClick={handleNextStep}
                  disabled={!companyName.trim()}
                  className="h-[38px] px-5 rounded-lg bg-ink text-ink-inverted text-[13px] font-[500] hover:bg-[#333] transition-colors cursor-pointer border-0"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: Dynamic Briefing Q&A */}
        {step === 6 && (
          <div className="space-y-6">
            {isGenerating ? (
              /* Generating Brief Spinner */
              <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-10 h-10 border-4 border-accent-subtle border-t-accent-hover rounded-full animate-spin" />
                <h2 className="text-[16px] font-semibold text-ink">Building company briefing...</h2>
                <p className="text-[12px] text-ink-faint max-w-xs">AI executives are synthesizing your answers and drafting your startup roadmap.</p>
              </div>
            ) : (
              /* Active Question Form */
              <div className="space-y-5">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-accent-hover uppercase tracking-wider">
                    Question {activeQuestionIdx + 1} of {questions.length}
                  </span>
                  <h1 className="text-xl font-semibold tracking-tight text-ink">
                    {questions[activeQuestionIdx].text}
                  </h1>
                </div>
                <textarea
                  value={questions[activeQuestionIdx].answer}
                  onChange={(e) => {
                    const newQs = [...questions];
                    newQs[activeQuestionIdx].answer = e.target.value;
                    setQuestions(newQs);
                  }}
                  placeholder="Type your answer here..."
                  className="w-full h-[120px] p-3 rounded-xl border border-border text-[13.5px] resize-none focus:outline-none focus:border-ink/20 bg-surface/30"
                />
                <div className="flex justify-between items-center pt-2">
                  <button 
                    onClick={() => {
                      if (activeQuestionIdx > 0) {
                        setActiveQuestionIdx(prev => prev - 1);
                      } else {
                        setStep(5);
                      }
                    }} 
                    className="text-[13.5px] font-medium text-ink-secondary flex items-center gap-1 cursor-pointer bg-transparent border-0"
                  >
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                  <button 
                    onClick={handleAnswerSubmit}
                    disabled={!questions[activeQuestionIdx].answer.trim()}
                    className="h-[38px] px-5 rounded-lg bg-ink text-ink-inverted text-[13px] font-[500] hover:bg-[#333] transition-colors cursor-pointer border-0 disabled:opacity-35"
                  >
                    {activeQuestionIdx < questions.length - 1 ? "Next Question" : "Generate Brief"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* STEP 7: Onboarding Summary & Vibe Selector */}
        {step === 7 && (
          <div className="space-y-6">
            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-accent-subtle flex items-center justify-center mx-auto mb-2 text-accent-hover">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <h1 className="text-2xl font-semibold tracking-tight text-ink">Your briefing is finalized!</h1>
              <p className="text-[13px] text-ink-faint">Here is the strategic summary compiled by your AI Executives.</p>
            </div>

            {/* Business Brief Box */}
            <div className="bg-surface/50 border border-border p-4 rounded-xl space-y-3.5 text-left max-h-[220px] overflow-y-auto">
              <div>
                <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Company</p>
                <p className="text-[13px] text-ink font-semibold">{companyName}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Target Customer</p>
                <p className="text-[13px] text-ink-secondary leading-relaxed">{questions[0].answer}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Monetization</p>
                <p className="text-[13px] text-ink-secondary leading-relaxed">{questions[1].answer}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">Key Advantage</p>
                <p className="text-[13px] text-ink-secondary leading-relaxed">{questions[2].answer}</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleOnboardingComplete}
                className="flex items-center justify-center gap-2 w-full h-[44px] rounded-xl bg-ink text-ink-inverted text-[14px] font-[500] hover:bg-[#333] transition-colors cursor-pointer border-0"
              >
                Go to Workspace
                <Play className="w-4 h-4 ml-1 fill-ink-inverted text-ink-inverted" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
