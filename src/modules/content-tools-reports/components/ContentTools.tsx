import React, { useState } from 'react';
import {
  Sparkles,
  FileText,
  BookOpen,
  HelpCircle,
  Copy,
  Check,
  Download,
  Info,
  Clock,
  Layers,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  Settings
} from 'lucide-react';
import {
  PRESET_SAMPLE_TEXTS,
  INITIAL_LESSON_OUTLINE,
  INITIAL_QUIZ_DRAFT
} from '../mockData';
import type {
  DifficultyLevel,
  ContentTone,
  GenerationOptions,
  LessonOutline,
  QuizDraft
} from '../types';

export const ContentTools: React.FC = () => {
  const [inputText, setInputText] = useState<string>(PRESET_SAMPLE_TEXTS[0].text);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('ai-ml-intro');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationStep, setGenerationStep] = useState<number>(0);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeResultTab, setActiveResultTab] = useState<'outline' | 'quiz' | 'both'>('both');
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>({
    'mod-1': true,
    'mod-2': true
  });

  const [options, setOptions] = useState<GenerationOptions>({
    difficulty: 'Intermediate',
    tone: 'Interactive',
    numQuestions: 3,
    includeExplanations: true,
    targetAudience: 'Software Engineers & Students'
  });

  const [lessonOutline, setLessonOutline] = useState<LessonOutline>(INITIAL_LESSON_OUTLINE);
  const [quizDraft, setQuizDraft] = useState<QuizDraft>(INITIAL_QUIZ_DRAFT);
  const [lastGeneratedAt, setLastGeneratedAt] = useState<string>('Initial Sample');

  const handlePresetSelect = (presetId: string) => {
    setSelectedPresetId(presetId);
    const preset = PRESET_SAMPLE_TEXTS.find((p) => p.id === presetId);
    if (preset) {
      setInputText(preset.text);
    }
  };

  const handleOptionChange = <K extends keyof GenerationOptions>(
    key: K,
    value: GenerationOptions[K]
  ) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const toggleModule = (id: string) => {
    setExpandedModules((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (text: string, sectionName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(sectionName);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleGenerateWorkflow = () => {
    if (!inputText.trim()) return;

    setIsGenerating(true);
    setGenerationStep(1);

    // Simulated workflow step 1: Parsing text
    setTimeout(() => {
      setGenerationStep(2);
      // Simulated workflow step 2: Extracting concepts & outline
      setTimeout(() => {
        setGenerationStep(3);
        // Simulated workflow step 3: Generating quiz draft questions
        setTimeout(() => {
          // Dynamic mock generation based on input text title/content
          const titleSnippet = inputText.split('\n')[0].substring(0, 45).replace(/[#*]/g, '').trim() || 'Educational Module';

          const newOutline: LessonOutline = {
            title: titleSnippet,
            overview: `Structured lesson outline synthesized from instructor material. Optimized for ${options.difficulty} learners.`,
            estimatedHours: Math.max(1, Math.ceil(inputText.length / 800)),
            targetAudience: options.targetAudience,
            prerequisites: ['General domain awareness', 'Prior introductory reading'],
            modules: [
              {
                id: 'mod-dyn-1',
                title: 'Module 1: Core Concepts & Principles',
                description: 'Foundational theory and primary definitions extracted from text.',
                topics: [
                  {
                    id: 'top-dyn-1',
                    title: 'Key Definitions and Principles',
                    durationMinutes: 25,
                    summary: inputText.substring(0, 160) + '...',
                    keyTakeaways: [
                      'Primary definition and domain scope',
                      'Essential terms and conceptual framework'
                    ]
                  },
                  {
                    id: 'top-dyn-2',
                    title: 'Practical Application & Use Cases',
                    durationMinutes: 35,
                    summary: 'Explores operational mechanics and real-world implications.',
                    keyTakeaways: [
                      'How principles translate into practical scenarios',
                      'Trade-offs and key considerations'
                    ]
                  }
                ]
              },
              {
                id: 'mod-dyn-2',
                title: 'Module 2: Synthesis and Evaluation',
                description: 'Higher-level analysis and critical evaluation metrics.',
                topics: [
                  {
                    id: 'top-dyn-3',
                    title: 'Evaluation Metrics & Best Practices',
                    durationMinutes: 40,
                    summary: 'Standardized methods to measure success and avoid common pitfalls.',
                    keyTakeaways: [
                      'Core metric evaluation strategies',
                      'Optimization workflows'
                    ]
                  }
                ]
              }
            ]
          };

          const newQuiz: QuizDraft = {
            title: `${titleSnippet} - Comprehensive Quiz`,
            totalQuestions: options.numQuestions,
            durationMinutes: options.numQuestions * 4,
            passingScorePercentage: 80,
            questions: Array.from({ length: options.numQuestions }).map((_, idx) => ({
              id: `q-dyn-${idx + 1}`,
              question: `[Sample Question ${idx + 1}] Based on the provided content: What is the primary focus of ${titleSnippet}?`,
              options: [
                'Establishing standardized operational guidelines and data flows',
                'Replacing human evaluation entirely with static code rules',
                'Decreasing visibility into system architecture',
                'None of the above'
              ],
              correctAnswerIndex: 0,
              explanation: options.includeExplanations
                ? `Rule-based mock response: The text directly emphasizes structured operational guidelines and domain consistency.`
                : '',
              difficulty: options.difficulty
            }))
          };

          setLessonOutline(newOutline);
          setQuizDraft(newQuiz);
          setLastGeneratedAt(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
          setIsGenerating(false);
          setGenerationStep(0);
          setExpandedModules({ 'mod-dyn-1': true, 'mod-dyn-2': true });
        }, 800);
      }, 700);
    }, 600);
  };

  const exportAsJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ outline: lessonOutline, quiz: quizDraft }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `content-draft-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Instructions */}
      <div className="bg-gradient-to-r from-sky-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-40 h-40 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 text-sky-200 border border-sky-400/30 rounded-full text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-sky-300" />
              Instructor Content Tools
            </div>
            <h2 className="text-2xl font-bold">Lesson Outline & Quiz Draft Synthesizer</h2>
            <p className="text-sky-100 text-sm max-w-2xl mt-1">
              Paste course text or choose sample educational materials below to generate a structured module outline and sample quiz draft using our mock workflow engine.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-slate-950/40 p-3 rounded-xl border border-white/10 text-xs text-sky-200 shrink-0">
            <Info className="w-4 h-4 text-sky-400 shrink-0" />
            <div>
              <p className="font-semibold text-white">Mock Processing Workflow</p>
              <p className="text-slate-300">Demonstration mode. No live LLM API key required.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Input Section & Generation Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Text Area & Sample Presets */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <label htmlFor="educational-text-input" className="text-sm font-semibold text-slate-800 flex items-center gap-2">
              <FileText className="w-4 h-4 text-sky-600" />
              Source Educational Content
            </label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500">Preset Samples:</span>
              <div className="flex gap-1">
                {PRESET_SAMPLE_TEXTS.map((preset) => (
                  <button
                    key={preset.id}
                    onClick={() => handlePresetSelect(preset.id)}
                    className={`text-xs px-2.5 py-1 rounded-md font-medium transition-colors ${
                      selectedPresetId === preset.id
                        ? 'bg-sky-100 text-sky-700 font-semibold border border-sky-300'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {preset.id === 'ai-ml-intro' ? 'Machine Learning' : preset.id === 'ux-design-principles' ? 'UI/UX Design' : 'Cloud Basics'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <textarea
              id="educational-text-input"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
                setSelectedPresetId('');
              }}
              placeholder="Paste or type educational content, lesson transcripts, or course notes here..."
              className="w-full h-56 p-4 text-sm text-slate-800 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none resize-y leading-relaxed font-mono"
            />
            <div className="flex justify-between items-center text-xs text-slate-400 mt-1">
              <span>{inputText.length} characters</span>
              <span>{inputText.split(/\s+/).filter(Boolean).length} words</span>
            </div>
          </div>
        </div>

        {/* Configuration Options */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Settings className="w-4 h-4 text-sky-600" />
              Synthesis Configuration
            </h3>

            {/* Target Difficulty */}
            <div>
              <label htmlFor="difficulty-select" className="text-xs font-medium text-slate-700 block mb-1">Target Difficulty Level</label>
              <select
                id="difficulty-select"
                value={options.difficulty}
                onChange={(e) => handleOptionChange('difficulty', e.target.value as DifficultyLevel)}
                className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-slate-800 outline-none"
              >
                <option value="Beginner">Beginner (Introductory)</option>
                <option value="Intermediate">Intermediate (Standard)</option>
                <option value="Advanced">Advanced (In-depth)</option>
              </select>
            </div>

            {/* Tone */}
            <div>
              <label htmlFor="tone-select" className="text-xs font-medium text-slate-700 block mb-1">Pedagogical Tone</label>
              <select
                id="tone-select"
                value={options.tone}
                onChange={(e) => handleOptionChange('tone', e.target.value as ContentTone)}
                className="w-full p-2 text-xs border border-slate-200 rounded-lg bg-slate-50 focus:bg-white text-slate-800 outline-none"
              >
                <option value="Academic">Academic & Rigorous</option>
                <option value="Conversational">Conversational & Engaging</option>
                <option value="Concise">Concise & Summary-focused</option>
                <option value="Interactive">Interactive & Applied</option>
              </select>
            </div>

            {/* Number of Quiz Questions */}
            <div>
              <label htmlFor="quiz-count-input" className="text-xs font-medium text-slate-700 block mb-1">Quiz Draft Questions ({options.numQuestions})</label>
              <input
                id="quiz-count-input"
                type="range"
                min="2"
                max="5"
                value={options.numQuestions}
                onChange={(e) => handleOptionChange('numQuestions', parseInt(e.target.value))}
                className="w-full accent-sky-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>2 Questions</span>
                <span>3 Questions</span>
                <span>5 Questions</span>
              </div>
            </div>

            {/* Include Explanations Checkbox */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="explanations"
                checked={options.includeExplanations}
                onChange={(e) => handleOptionChange('includeExplanations', e.target.checked)}
                className="w-4 h-4 text-sky-600 rounded border-slate-300 focus:ring-sky-500"
              />
              <label htmlFor="explanations" className="text-xs text-slate-700 font-medium cursor-pointer">
                Generate answer key explanations
              </label>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleGenerateWorkflow}
              disabled={isGenerating || !inputText.trim()}
              className={`w-full py-3 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
                isGenerating || !inputText.trim()
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-200 hover:shadow-md'
              }`}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing Content...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Outline & Quiz Draft
                </>
              )}
            </button>
            <p className="text-[11px] text-center text-slate-400 mt-2">
              Labeled Mock Generation Workflow
            </p>
          </div>
        </div>
      </div>

      {/* Generation Status Feedback Steps */}
      {isGenerating && (
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 text-slate-800 animate-pulse">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-5 h-5 text-sky-600 animate-spin" />
            <h4 className="font-semibold text-sky-900 text-sm">Simulated Content Generation Workflow</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className={`p-3 rounded-lg border ${generationStep >= 1 ? 'bg-white border-sky-300 text-sky-900' : 'bg-slate-100 text-slate-400 border-transparent'}`}>
              <div className="flex items-center gap-2 font-medium mb-1">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-bold">1</span>
                Parsing Educational Text
              </div>
              <p className="text-slate-500 text-[11px]">Extracting key concepts, topics, and technical terms.</p>
            </div>
            <div className={`p-3 rounded-lg border ${generationStep >= 2 ? 'bg-white border-sky-300 text-sky-900' : 'bg-slate-100 text-slate-400 border-transparent'}`}>
              <div className="flex items-center gap-2 font-medium mb-1">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-bold">2</span>
                Structuring Module Outline
              </div>
              <p className="text-slate-500 text-[11px]">Building lesson hierarchy, learning objectives, and estimates.</p>
            </div>
            <div className={`p-3 rounded-lg border ${generationStep >= 3 ? 'bg-white border-sky-300 text-sky-900' : 'bg-slate-100 text-slate-400 border-transparent'}`}>
              <div className="flex items-center gap-2 font-medium mb-1">
                <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center text-[10px] font-bold">3</span>
                Drafting Sample Assessment
              </div>
              <p className="text-slate-500 text-[11px]">Creating diagnostic quiz items with answer keys.</p>
            </div>
          </div>
        </div>
      )}

      {/* Generated Results Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Results Toolbar */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Generated Output View:</span>
            <div className="flex bg-slate-200/80 p-1 rounded-lg text-xs font-medium">
              <button
                onClick={() => setActiveResultTab('both')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeResultTab === 'both' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                All Drafts
              </button>
              <button
                onClick={() => setActiveResultTab('outline')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeResultTab === 'outline' ? 'bg-white text-sky-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Lesson Outline
              </button>
              <button
                onClick={() => setActiveResultTab('quiz')}
                className={`px-3 py-1 rounded-md transition-all ${
                  activeResultTab === 'quiz' ? 'bg-white text-emerald-700 shadow-xs font-semibold' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Quiz Draft
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">Last updated: {lastGeneratedAt}</span>
            <button
              onClick={exportAsJSON}
              className="px-3 py-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              Export Draft (JSON)
            </button>
          </div>
        </div>

        {/* Output Content Display */}
        <div className="p-6 space-y-8">
          {/* LESSON OUTLINE VIEW */}
          {(activeResultTab === 'both' || activeResultTab === 'outline') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-sky-50 text-sky-600 rounded-lg">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Structured Lesson Outline</h3>
                    <p className="text-xs text-slate-500">Course curriculum breakdown with learning outcomes</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(lessonOutline, null, 2), 'outline')}
                  className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                >
                  {copiedSection === 'outline' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSection === 'outline' ? 'Copied Outline' : 'Copy JSON'}
                </button>
              </div>

              {/* Course Meta Info Header */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-medium">Course Title</span>
                  <span className="text-slate-800 font-bold text-sm">{lessonOutline.title}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Target Audience</span>
                  <span className="text-slate-700 font-medium">{lessonOutline.targetAudience}</span>
                </div>
                <div>
                  <span className="text-slate-400 block font-medium">Est. Completion Duration</span>
                  <span className="text-slate-700 font-medium flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5 text-sky-600" />
                    ~{lessonOutline.estimatedHours} Hours total
                  </span>
                </div>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-3">
                {lessonOutline.modules.map((mod) => {
                  const isExpanded = expandedModules[mod.id] ?? true;
                  return (
                    <div key={mod.id} className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full px-4 py-3 bg-slate-50/80 hover:bg-slate-100/80 flex items-center justify-between text-left transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <Layers className="w-4 h-4 text-sky-600" />
                          <span className="font-semibold text-slate-800 text-sm">{mod.title}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-slate-500">{mod.topics.length} topics</span>
                          {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="p-4 space-y-4 border-t border-slate-200/60">
                          <p className="text-xs text-slate-600 italic">{mod.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {mod.topics.map((topic) => (
                              <div key={topic.id} className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 space-y-2">
                                <div className="flex justify-between items-start">
                                  <h5 className="font-semibold text-xs text-slate-800">{topic.title}</h5>
                                  <span className="text-[10px] px-2 py-0.5 bg-sky-100 text-sky-800 rounded font-medium">
                                    {topic.durationMinutes} min
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600">{topic.summary}</p>
                                <div className="pt-2 border-t border-slate-200/60">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Key Takeaways</span>
                                  <ul className="space-y-1">
                                    {topic.keyTakeaways.map((takeaway, idx) => (
                                      <li key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                                        <span>{takeaway}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* SAMPLE QUIZ DRAFT VIEW */}
          {(activeResultTab === 'both' || activeResultTab === 'quiz') && (
            <div className="space-y-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg">Sample Quiz Draft</h3>
                    <p className="text-xs text-slate-500">Generated assessment questions with answer key and explanations</p>
                  </div>
                </div>
                <button
                  onClick={() => copyToClipboard(JSON.stringify(quizDraft, null, 2), 'quiz')}
                  className="px-2.5 py-1.5 text-xs text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg border border-slate-200 transition-colors flex items-center gap-1"
                >
                  {copiedSection === 'quiz' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedSection === 'quiz' ? 'Copied Quiz' : 'Copy Quiz JSON'}
                </button>
              </div>

              {/* Quiz Header Meta */}
              <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-200/60 flex flex-wrap justify-between items-center gap-4 text-xs">
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{quizDraft.title}</h4>
                  <p className="text-slate-500 mt-0.5">Passing Score Threshold: {quizDraft.passingScorePercentage}%</p>
                </div>
                <div className="flex gap-4 text-slate-700 font-medium">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
                    {quizDraft.totalQuestions} Question Items
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                    Est. {quizDraft.durationMinutes} Minutes
                  </span>
                </div>
              </div>

              {/* Question Items List */}
              <div className="space-y-4">
                {quizDraft.questions.map((q, qIdx) => (
                  <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                    <div className="flex justify-between items-start gap-2">
                      <h5 className="font-semibold text-slate-800 text-sm">
                        <span className="text-emerald-600 font-bold mr-1.5">Q{qIdx + 1}.</span>
                        {q.question}
                      </h5>
                      <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                        {q.difficulty}
                      </span>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {q.options.map((opt, optIdx) => {
                        const isCorrect = optIdx === q.correctAnswerIndex;
                        return (
                          <div
                            key={optIdx}
                            className={`p-2.5 rounded-lg text-xs flex items-center justify-between border ${
                              isCorrect
                                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium'
                                : 'bg-slate-50 border-slate-200 text-slate-700'
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <span className={`w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                                isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                              }`}>
                                {String.fromCharCode(65 + optIdx)}
                              </span>
                              {opt}
                            </span>
                            {isCorrect && (
                              <span className="text-[10px] bg-emerald-200/80 text-emerald-800 font-bold px-1.5 py-0.5 rounded shrink-0">
                                Correct Answer
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Explanation Callout */}
                    {q.explanation && (
                      <div className="p-3 bg-amber-50/60 border border-amber-200/60 rounded-lg text-xs text-amber-900 flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold block mb-0.5 text-amber-950">Explanation & Answer Rationale:</span>
                          <span className="text-amber-800 leading-relaxed">{q.explanation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentTools;
