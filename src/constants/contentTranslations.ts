// Content translations for Prompt Engineering Studio sections
// These translations are for the educational content pages

import type { Language } from './translations';

export interface ContentTranslations {
  // Introduction Section
  welcomeToStudio: string;
  welcomeToStudioP1: string;
  welcomeToStudioP2: string;
  welcomeToStudioP3: string;
  metaPromptTitle: string;
  metaPromptIntro: string;
  yourTask: string;
  metaPromptInstructions: string;
  metaPromptInstruction1: string;
  metaPromptInstruction2: string;
  metaPromptInstruction3: string;
  metaPromptInstruction4: string;
  metaPromptInstruction5: string;
  metaPromptInstruction6: string;
  metaPromptInstruction7: string;
  metaPromptInput: string;
  metaPromptOutput: string;
  whyPromptEngineeringImportant: string;
  improvedModelPerformance: string;
  improvedModelPerformanceDesc: string;
  reducedBiasHarmful: string;
  reducedBiasHarmfulDesc: string;
  increasedControl: string;
  increasedControlDesc: string;
  enhancedUserExperience: string;
  enhancedUserExperienceDesc: string;
  craftingEffectivePrompts: string;
  craftingEffectivePromptsDesc: string;

  // Prompt Types Section
  understandingPromptTypes: string;
  understandingPromptTypesIntro: string;
  directPromptsZeroShot: string;
  directPromptsZeroShotDesc: string;
  directPromptsZeroShotDetails: string;
  oneFewMultiShotPrompts: string;
  oneFewMultiShotPromptsDesc: string;
  oneFewMultiShotPromptsDetails: string;
  chainOfThoughtPrompts: string;
  chainOfThoughtPromptsDesc: string;
  chainOfThoughtPromptsDetails: string;
  zeroShotCoTPrompts: string;
  zeroShotCoTPromptsDesc: string;
  zeroShotCoTPromptsDetails: string;

  // Use Cases Section
  promptEngineeringUseCases: string;
  promptEngineeringUseCasesIntro: string;
  languageAndTextGeneration: string;
  languageAndTextGenerationDesc: string;
  creativeWriting: string;
  creativeWritingDesc: string;
  creativeWritingExample: string;
  summarization: string;
  summarizationDesc: string;
  summarizationExample: string;
  translation: string;
  translationDesc: string;
  translationExample: string;
  dialogueGeneration: string;
  dialogueGenerationDesc: string;
  dialogueGenerationExample: string;
  questionAnswering: string;
  questionAnsweringDesc: string;
  openEndedQuestions: string;
  openEndedQuestionsDesc: string;
  openEndedQuestionsExample: string;
  specificQuestions: string;
  specificQuestionsDesc: string;
  specificQuestionsExample: string;
  multipleChoiceQuestions: string;
  multipleChoiceQuestionsDesc: string;
  multipleChoiceQuestionsExample: string;
  hypotheticalQuestions: string;
  hypotheticalQuestionsDesc: string;
  hypotheticalQuestionsExample: string;
  opinionBasedQuestions: string;
  opinionBasedQuestionsDesc: string;
  opinionBasedQuestionsExample: string;
  codeGeneration: string;
  codeGenerationDesc: string;
  codeCompletion: string;
  codeCompletionDesc: string;
  codeCompletionExample: string;
  codeTranslation: string;
  codeTranslationDesc: string;
  codeTranslationExample: string;
  codeOptimization: string;
  codeOptimizationDesc: string;
  codeOptimizationExample: string;
  codeDebugging: string;
  codeDebuggingDesc: string;
  codeDebuggingExample: string;
  imageGeneration: string;
  imageGenerationDesc: string;
  photorealisticImages: string;
  photorealisticImagesDesc: string;
  photorealisticImagesExample: string;
  artisticImages: string;
  artisticImagesDesc: string;
  artisticImagesExample: string;
  abstractImages: string;
  abstractImagesDesc: string;
  abstractImagesExample: string;
  imageEditing: string;
  imageEditingDesc: string;
  imageEditingExample: string;

  // Strategies Section
  strategiesForBetterPrompts: string;
  strategiesForBetterPromptsIntro: string;
  setClearGoals: string;
  setClearGoalsDesc: string;
  useActionVerbs: string;
  useActionVerbsDesc: string;
  useActionVerbsExample: string;
  defineFormat: string;
  defineFormatDesc: string;
  defineFormatExample: string;
  targetAudience: string;
  targetAudienceDesc: string;
  targetAudienceExample: string;
  provideContext: string;
  provideContextDesc: string;
  includeRelevantFacts: string;
  includeRelevantFactsDesc: string;
  includeRelevantFactsExample: string;
  referenceSpecificSources: string;
  referenceSpecificSourcesDesc: string;
  referenceSpecificSourcesExample: string;
  defineKeyTerms: string;
  defineKeyTermsDesc: string;
  defineKeyTermsExample: string;
  useFewShotPrompting: string;
  useFewShotPromptingDesc: string;
  provideInputOutputPairs: string;
  provideInputOutputPairsDesc: string;
  provideInputOutputPairsExample: string;
  demonstrateDesiredStyle: string;
  demonstrateDesiredStyleDesc: string;
  demonstrateDesiredStyleExample: string;
  showDetailLevel: string;
  showDetailLevelDesc: string;
  showDetailLevelExample: string;
  beSpecificUnambiguous: string;
  beSpecificUnambiguousDesc: string;
  usePreciseLanguage: string;
  usePreciseLanguageDesc: string;
  usePreciseLanguageExample: string;
  quantifyRequests: string;
  quantifyRequestsDesc: string;
  quantifyRequestsExample: string;
  breakDownTasks: string;
  breakDownTasksDesc: string;
  breakDownTasksExample: string;
  iterateExperiment: string;
  iterateExperimentDesc: string;
  iterateExperimentDetails: string;
  leverageCoT: string;
  leverageCoTDesc: string;
  encourageStepByStep: string;
  encourageStepByStepDesc: string;
  encourageStepByStepExample: string;
  askForExplanation: string;
  askForExplanationDesc: string;
  askForExplanationExample: string;
  guideLogicalSequence: string;
  guideLogicalSequenceDesc: string;
  guideLogicalSequenceExample: string;
  furtherGuidance: string;
  furtherGuidanceDesc: string;
  examplePrompt: string;
  clarityAndSpecificity: string;
  clarityAndSpecificityDesc: string;
  contextAndExamples: string;
  contextAndExamplesDesc: string;
  fineTuningAndAdapting: string;
  fineTuningAndAdaptingDesc: string;
  multiTurnConversations: string;
  multiTurnConversationsDesc: string;
}

export const contentTranslations: Record<Language, ContentTranslations> = {
  en: {
    // Introduction Section
    welcomeToStudio: 'Welcome to Prompt Engineering Studio',
    welcomeToStudioP1:
      'Welcome! This Studio is your comprehensive toolkit for mastering Prompt Engineering – the art and science of crafting highly effective inputs (prompts) to guide Artificial Intelligence (AI) models, like Large Language Models (LLMs), towards precisely the outputs you desire. Whether you\'re new to AI or looking to refine your skills, understanding how to structure your requests is crucial for unlocking AI\'s full potential.',
    welcomeToStudioP2:
      'Effective prompt engineering isn\'t just about asking questions; it\'s about providing clear instructions, relevant context, and specific constraints. It involves thinking strategically about how an AI processes information and how you can guide that process. This studio will walk you through foundational principles, diverse prompt types, common use cases, and advanced strategies to help you achieve significantly better results in your AI interactions.',
    welcomeToStudioP3:
      'Below, you\'ll find an example of a sophisticated "meta-prompt" similar to what powers our Playground section. This illustrates the level of detail and structure that can transform a simple idea into a powerful instruction for an AI:',
    metaPromptTitle: 'Meta-Prompt Example',
    metaPromptIntro:
      '"You are the AI Prompt Engineering Genius Toolkit. Your sole purpose is to transform a user-provided basic idea or simple prompt into a comprehensive, highly structured, and exceptionally specific prompt designed to yield outputs from another AI that are significantly (ideally 10x) more effective, insightful, accurate, and targeted than the original input would achieve.',
    yourTask: 'Your Task:',
    metaPromptInstructions:
      'Receive the user\'s simple idea or base prompt. Analyze its core intent. Identify areas lacking detail, context, structure, or constraints. Then, meticulously rewrite and expand it into a sophisticated prompt using the following principles:',
    metaPromptInstruction1:
      'Define Clear Role/Persona: Assign a specific, relevant role or persona to the target AI if appropriate for the task.',
    metaPromptInstruction2:
      'Specify the Task with Detail: Break down the task into clear steps or components if necessary. Use strong, unambiguous action verbs.',
    metaPromptInstruction3:
      'Add Essential Context: Include relevant background information, parameters, or scenario details required for an accurate and useful response.',
    metaPromptInstruction4:
      'Incorporate Specific Constraints: Define limitations or requirements such as: Length, Format, Style, Tone, Negative Constraints.',
    metaPromptInstruction5: 'Define Desired Output: Describe the expected outcome in detail.',
    metaPromptInstruction6:
      'Suggest Chain-of-Thought/Examples (If Applicable): Include instructions for the AI to show its work or provide examples.',
    metaPromptInstruction7: 'Ensure Clarity and Unambiguity: Every instruction should be easy to understand.',
    metaPromptInput: 'Input: The user will provide a simple statement or short prompt.',
    metaPromptOutput:
      'Output: Provide *only* the generated, enhanced, highly detailed, and structured prompt.',
    whyPromptEngineeringImportant: 'Why is Prompt Engineering Important?',
    improvedModelPerformance: 'Improved Model Performance',
    improvedModelPerformanceDesc:
      'Well-crafted prompts lead to more accurate, relevant, and informative outputs.',
    reducedBiasHarmful: 'Reduced Bias & Harmful Responses',
    reducedBiasHarmfulDesc:
      'Careful prompting helps mitigate bias and minimize undesirable content.',
    increasedControl: 'Increased Control & Predictability',
    increasedControlDesc:
      'Gain better control over AI behavior for consistent and desired outcomes.',
    enhancedUserExperience: 'Enhanced User Experience',
    enhancedUserExperienceDesc:
      'Clear prompts make AI interactions more intuitive and satisfying.',
    craftingEffectivePrompts: 'Crafting Effective Prompts',
    craftingEffectivePromptsDesc:
      'Understanding the model\'s capabilities and preferred format is essential. Here are key elements:',

    // Prompt Types Section
    understandingPromptTypes: 'Understanding Prompt Types',
    understandingPromptTypesIntro:
      'There are various types of prompts used in AI, each serving a specific purpose. Mastering these types allows for more nuanced control over AI responses.',
    directPromptsZeroShot: 'Direct Prompts (Zero-shot)',
    directPromptsZeroShotDesc:
      'Zero-shot prompting involves providing the model with a direct instruction or question without any additional context or examples specific to the immediate task.',
    directPromptsZeroShotDetails:
      'This relies on the model\'s pre-trained knowledge to understand and execute the task.\n\nExamples: Idea generation (e.g., "Generate creative ideas for a sustainable product"), summarization ("Summarize this article about renewable energy"), or translation ("Translate \'Hello, world\' to French").',
    oneFewMultiShotPrompts: 'One-, Few-, and Multi-shot Prompts',
    oneFewMultiShotPromptsDesc:
      'This method involves providing the model with one or more examples (shots) of the desired input-output pairs before presenting the actual prompt.',
    oneFewMultiShotPromptsDetails:
      'This helps the model better understand the task, expected format, and style, leading to more accurate responses.\n\n• One-shot: One example.\n• Few-shot: A small number of examples (typically 2-5).\n• Multi-shot: Many examples, often used for fine-tuning.',
    chainOfThoughtPrompts: 'Chain of Thought (CoT) Prompts',
    chainOfThoughtPromptsDesc:
      'CoT prompting encourages the model to break down complex reasoning into a series of intermediate steps, leading to a more comprehensive and well-structured final output.',
    chainOfThoughtPromptsDetails:
      'Instead of just asking for the answer, you ask the model to "think step by step" or show its reasoning process. This is particularly useful for arithmetic, commonsense reasoning, and symbolic reasoning tasks.',
    zeroShotCoTPrompts: 'Zero-shot CoT Prompts',
    zeroShotCoTPromptsDesc:
      'Combines Chain of Thought prompting with Zero-shot prompting by simply appending "Let\'s think step by step" or a similar phrase to the original zero-shot prompt.',
    zeroShotCoTPromptsDetails:
      'This simple addition can surprisingly improve the model\'s reasoning ability without needing explicit examples of the thought process.',

    // Use Cases Section
    promptEngineeringUseCases: 'Prompt Engineering Use Cases & Examples',
    promptEngineeringUseCasesIntro:
      'Explore specific examples and scenarios demonstrating how prompt engineering helps produce customized and relevant AI outputs across various domains.',
    languageAndTextGeneration: 'Language and Text Generation',
    languageAndTextGenerationDesc: 'Crafting prompts for various text-based tasks.',
    creativeWriting: 'Creative Writing',
    creativeWritingDesc: 'Specify genre, tone, style, and plot points.',
    creativeWritingExample:
      'Write a short, suspenseful story (around 300 words) about a young woman who discovers a magical, glowing portal in her attic during a thunderstorm. The tone should be mysterious and slightly ominous.',
    summarization: 'Summarization',
    summarizationDesc: 'Instruct the AI to generate concise summaries capturing key information.',
    summarizationExample:
      'Summarize the main arguments and key findings of the following news article on recent advancements in AI ethics in three bullet points.',
    translation: 'Translation',
    translationDesc:
      'Specify source and target languages, ensuring meaning and context are preserved.',
    translationExample:
      'Translate the following business email from English to professional German, maintaining a formal tone: "Dear Mr. Schmidt, We are pleased to confirm our meeting for next Tuesday at 10 AM. Please let us know if this time still works for you. Best regards, Jane Doe."',
    dialogueGeneration: 'Dialogue Generation',
    dialogueGenerationDesc: 'Design prompts that simulate conversations, maintaining context.',
    dialogueGenerationExample:
      'You are "TechHelper", a friendly and patient AI chatbot assisting users with software issues. A user says: "My photo editing app keeps crashing when I try to open large files." Respond empathetically and ask for more details to help troubleshoot.',
    questionAnswering: 'Question Answering',
    questionAnsweringDesc: 'Formulating prompts for different types of questions.',
    openEndedQuestions: 'Open-Ended Questions',
    openEndedQuestionsDesc: "Encourage comprehensive answers based on AI's knowledge.",
    openEndedQuestionsExample:
      'Explain the concept of blockchain technology, its key components, and its potential impact on various industries beyond cryptocurrency. Provide at least three distinct examples.',
    specificQuestions: 'Specific Questions',
    specificQuestionsDesc:
      'Target specific information from provided context or internal knowledge.',
    specificQuestionsExample:
      'According to the provided scientific paper (imagine paper is attached), what were the primary limitations acknowledged by the researchers in their study on X?',
    multipleChoiceQuestions: 'Multiple Choice Questions',
    multipleChoiceQuestionsDesc:
      'Prompt AI to analyze options and select the most appropriate answer.',
    multipleChoiceQuestionsExample:
      'Which of the following is NOT a primary greenhouse gas? A) Carbon Dioxide, B) Methane, C) Oxygen, D) Nitrous Oxide. Explain your choice.',
    hypotheticalQuestions: 'Hypothetical Questions',
    hypotheticalQuestionsDesc:
      'Explore hypothetical situations, allowing AI to reason and speculate.',
    hypotheticalQuestionsExample:
      'Imagine a scenario where universal basic income (UBI) is implemented globally. What are three potential positive and three potential negative socio-economic consequences? Provide brief reasoning for each.',
    opinionBasedQuestions: 'Opinion-Based Questions (with caveats)',
    opinionBasedQuestionsDesc:
      "Elicit AI's perspective (as a simulation) with reasoning. Note: AIs don't have personal opinions but can synthesize information to form a reasoned stance.",
    opinionBasedQuestionsExample:
      'Discuss the ethical considerations of using AI in hiring processes. Present arguments for and against, and conclude with a balanced perspective on responsible implementation.',
    codeGeneration: 'Code Generation',
    codeGenerationDesc: 'Guiding AI in various coding tasks.',
    codeCompletion: 'Code Completion',
    codeCompletionDesc: 'Provide partial code and prompt AI to complete it.',
    codeCompletionExample:
      'Complete the following Python function that takes a list of numbers and returns a new list containing only the even numbers:\n```python\ndef get_even_numbers(numbers):\n  # Your code here\n```',
    codeTranslation: 'Code Translation',
    codeTranslationDesc: 'Specify source and target languages, preserving functionality.',
    codeTranslationExample:
      'Translate the following Python code snippet to JavaScript, ensuring equivalent functionality. The Python code calculates the sum of an array:\n```python\ndef sum_array(arr):\n  total = 0\n  for x in arr:\n    total += x\n  return total\n```',
    codeOptimization: 'Code Optimization',
    codeOptimizationDesc: 'Prompt AI to analyze code and suggest improvements.',
    codeOptimizationExample:
      'Analyze the following Python code for calculating Fibonacci numbers recursively. Identify potential performance bottlenecks and suggest an optimized version, explaining the improvements.\n```python\ndef fib_recursive(n):\n  if n <= 1:\n    return n\n  else:\n    return fib_recursive(n-1) + fib_recursive(n-2)\n```',
    codeDebugging: 'Code Debugging',
    codeDebuggingDesc:
      'Provide code with errors and prompt AI to identify and suggest solutions.',
    codeDebuggingExample:
      'The following Java code is supposed to read a file line by line, but it throws a NullPointerException. Identify the bug, explain its cause, and provide the corrected code.\n[Paste buggy Java code here]',
    imageGeneration: 'Image Generation',
    imageGenerationDesc: 'Crafting prompts for AI image generators.',
    photorealisticImages: 'Photorealistic Images',
    photorealisticImagesDesc:
      'Describe desired image in detail (objects, scenery, lighting, style).',
    photorealisticImagesExample:
      'A highly detailed, photorealistic image of a majestic snow leopard resting on a rocky outcrop in the Himalayas during a golden hour sunset. The lighting should be warm and dramatic, highlighting the texture of its fur. Shot with a telephoto lens, shallow depth of field.',
    artisticImages: 'Artistic Images',
    artisticImagesDesc: 'Specify art styles, techniques, and subject matter.',
    artisticImagesExample:
      'An impressionist painting capturing the vibrant chaos of a bustling Parisian street market on a rainy afternoon. Focus on reflections on wet cobblestones and blurred figures with colorful umbrellas. Style of Monet.',
    abstractImages: 'Abstract Images',
    abstractImagesDesc:
      'Encourage AI to generate images open to interpretation using shapes, colors, textures.',
    abstractImagesExample:
      "An abstract digital artwork representing the concept of 'serendipity'. Use flowing, interconnected lines in shades of teal and gold, with soft, glowing light sources. Evoke a feeling of unexpected discovery.",
    imageEditing: 'Image Editing',
    imageEditingDesc: 'Provide an image and specify desired modifications.',
    imageEditingExample:
      "(Assuming an image is provided) For the uploaded image of a cat sitting on a chair: Change the background to a lush, green forest. Add a whimsical, small butterfly resting on the cat's nose. Ensure the lighting on the cat matches the new forest background.",

    // Strategies Section
    strategiesForBetterPrompts: 'Strategies for Writing Better Prompts',
    strategiesForBetterPromptsIntro:
      'Developing effective prompts requires a strategic approach. Consider these tactics to enhance your prompt engineering skills and achieve superior AI outputs.',
    setClearGoals: '1. Set Clear Goals and Objectives',
    setClearGoalsDesc: 'Define precisely what you want the AI to achieve.',
    useActionVerbs: 'Use action verbs',
    useActionVerbsDesc: 'Specify the desired action clearly.',
    useActionVerbsExample:
      'Generate a bulleted list summarizing the key advantages of renewable energy sources over fossil fuels.',
    defineFormat: 'Define the desired length and format',
    defineFormatDesc: 'Be explicit about output structure.',
    defineFormatExample:
      'Compose a 250-word product description for a new ergonomic office chair, highlighting its three main benefits. Format as three short paragraphs.',
    targetAudience: 'Specify the target audience',
    targetAudienceDesc: 'Tailor the language and tone.',
    targetAudienceExample:
      'Explain the concept of photosynthesis in simple terms suitable for a 5th-grade student. Use an analogy to help understanding.',
    provideContext: '2. Provide Context and Background Information',
    provideContextDesc:
      'Give the AI the necessary information to understand the request fully.',
    includeRelevantFacts: 'Include relevant facts and data',
    includeRelevantFactsDesc: 'Ground the AI with specifics.',
    includeRelevantFactsExample:
      'Given that the global average internet speed is X Mbps and our target market has an average of Y Mbps, propose three strategies to optimize our web application for faster loading times in this market.',
    referenceSpecificSources: 'Reference specific sources or documents',
    referenceSpecificSourcesDesc: '(If applicable) Guide the AI to use provided materials.',
    referenceSpecificSourcesExample:
      'Based on the attached Q3 financial report, identify the top three revenue-generating product lines and analyze their growth trends compared to Q2.',
    defineKeyTerms: 'Define key terms and concepts',
    defineKeyTermsDesc: 'Ensure understanding, especially for niche topics.',
    defineKeyTermsExample:
      "Explain the concept of 'Decentralized Autonomous Organizations (DAOs)' in the context of blockchain technology. Define what a DAO is, how it typically operates, and one potential use case.",
    useFewShotPrompting: '3. Use Few-Shot Prompting Effectively',
    useFewShotPromptingDesc: 'Provide examples to guide the AI on style, format, and content.',
    provideInputOutputPairs: 'Provide input-output pairs',
    provideInputOutputPairsDesc: 'Show the AI exactly what kind of transformation you expect.',
    provideInputOutputPairsExample: `Translate the following sentences from English to French:
English: "Hello, how are you?"
French: "Bonjour, comment ça va?"
English: "I am learning to code."
French: "J'apprends à coder."
English: "The weather is nice today."
French:`,
    demonstrateDesiredStyle: 'Demonstrate the desired style or tone',
    demonstrateDesiredStyleDesc: 'Examples can convey nuances better than descriptions.',
    demonstrateDesiredStyleExample: `Rewrite the following customer complaint in a polite and empathetic tone.
Original: "Your app is terrible and it never works!"
Empathetic Rewrite: "I understand you're experiencing some frustration with the app, and I'm sorry to hear it's not working as expected. Could you tell me more about the specific issues?"
Original: "This product broke after one day, I want a refund NOW!"
Empathetic Rewrite:`,
    showDetailLevel: 'Show the desired level of detail',
    showDetailLevelDesc: 'Illustrate how concise or expansive the output should be.',
    showDetailLevelExample: `Summarize the following paragraph in one sentence.
Paragraph: [Long paragraph about a historical event]
One-sentence summary: [Concise summary of the event]
Paragraph: [Another long paragraph]
One-sentence summary:`,
    beSpecificUnambiguous: '4. Be Specific and Unambiguous',
    beSpecificUnambiguousDesc:
      'Clarity avoids misinterpretation and leads to more accurate results.',
    usePreciseLanguage: 'Use precise language',
    usePreciseLanguageDesc: 'Avoid vague terms. Be direct.',
    usePreciseLanguageExample: `Instead of: "Tell me about dogs."
Use: "List five common dog breeds known for being good family pets and briefly describe the typical temperament of each."`,
    quantifyRequests: 'Quantify your requests',
    quantifyRequestsDesc: 'Use numbers when possible.',
    quantifyRequestsExample: `Instead of: "Write a short article."
Use: "Write an article of approximately 300 words about the benefits of regular exercise."`,
    breakDownTasks: 'Break down complex tasks',
    breakDownTasksDesc: 'Divide a large request into smaller, manageable steps.',
    breakDownTasksExample: `Instead of: "Create a marketing campaign."
Use: "Develop a marketing campaign proposal for a new vegan protein bar. Include:
1. Target audience profile (age, interests, lifestyle).
2. Three key marketing messages.
3. Suggested marketing channels (social media, influencers, etc.).
4. Two unique promotional ideas."`,
    iterateExperiment: '5. Iterate and Experiment',
    iterateExperimentDesc: 'Prompt engineering is often an iterative process.',
    iterateExperimentDetails: `• Try different phrasings and keywords: Rephrase your prompt using synonyms or alternative sentence structures. Small changes can have big impacts.
• Adjust the level of detail and specificity: Add or remove information to fine-tune the output.
• Test different prompt lengths: Experiment with both shorter, concise prompts and longer, more detailed ones to find the optimal balance for your task.
• Analyze outputs and refine: Pay attention to what the AI generates. If it's not what you want, revise your prompt and try again.`,
    leverageCoT: '6. Leverage Chain of Thought (CoT) Prompting for Complex Tasks',
    leverageCoTDesc: 'Encourage the AI to "think step by step" for better reasoning.',
    encourageStepByStep: 'Encourage step-by-step reasoning',
    encourageStepByStepDesc: 'Explicitly ask the AI to break down its process.',
    encourageStepByStepExample:
      'Solve this word problem by showing your steps: A train leaves City A at 2:00 PM traveling at 60 mph. Another train leaves City B at 3:00 PM traveling towards City A at 80 mph. If City A and City B are 410 miles apart, at what time will they meet? Let\'s think step by step.',
    askForExplanation: 'Ask the model to explain its reasoning',
    askForExplanationDesc:
      "This helps in understanding the AI's thought process and can improve result quality.",
    askForExplanationExample:
      'Classify the sentiment of the following movie review as positive, negative, or neutral, and explain your reasoning: \'While the visuals were stunning, the plot felt underdeveloped and the ending was abrupt.\'',
    guideLogicalSequence: 'Guide the model through a logical sequence',
    guideLogicalSequenceDesc: 'For complex decision-making, outline the thought process.',
    guideLogicalSequenceExample:
      'To determine if this research paper is relevant to my study on \'AI in healthcare diagnostics\', please consider the following and explain your findings for each: 1. Does the abstract mention diagnostics or imaging? 2. Are the methodologies described related to machine learning or deep learning? 3. Is the publication date within the last 3 years? Based on this, is it highly relevant, moderately relevant, or not relevant?',
    furtherGuidance: 'Further Guidance',
    furtherGuidanceDesc:
      'For more in-depth strategies and best practices, especially within the Google Cloud ecosystem, exploring resources like the "Five Best Practices for Prompt Engineering on Google Cloud" can provide valuable insights. (Note: This is a general reference, specific links may vary over time).',
    examplePrompt: 'Example Prompt',
    clarityAndSpecificity: 'Clarity and Specificity',
    clarityAndSpecificityDesc:
      'The cornerstone of any good prompt is absolute clarity and a high degree of specificity. Avoid ambiguity at all costs. Vague language, undefined terms, or implicit assumptions will often lead the AI to generate generic, irrelevant, or incorrect responses.\n\nClarity means using precise vocabulary and structuring your sentences so there\'s only one likely interpretation. Clearly state what you want the AI to *do* (the task) and *what* the output should be.\n\nSpecificity involves providing sufficient detail, context, constraints (like format, length, tone, style), and even examples if necessary. The more specific your prompt, the better the AI can understand your exact needs and tailor its output accordingly. Think of it as providing a detailed blueprint rather than a vague sketch.',
    contextAndExamples: 'Context and Examples',
    contextAndExamplesDesc:
      'Providing context and relevant examples helps the AI understand the task and generate more accurate outputs. For instance, if you\'re looking for a creative story, including a few sentences describing the desired tone or theme can significantly improve results.',
    fineTuningAndAdapting: 'Fine-tuning and Adapting',
    fineTuningAndAdaptingDesc:
      'Fine-tuning the AI model on specific tasks or domains using tailored prompts can enhance its performance. Adapting prompts based on user feedback or model outputs can further improve responses over time.',
    multiTurnConversations: 'Multi-turn Conversations',
    multiTurnConversationsDesc:
      'Designing prompts for multi-turn conversations allows users to engage in continuous and context-aware interactions with the AI, enhancing the overall user experience by building upon previous exchanges.',
  },

  ar: {
    // Introduction Section
    welcomeToStudio: 'مرحباً بك في استوديو هندسة الأوامر',
    welcomeToStudioP1:
      'مرحباً! هذا الاستوديو هو مجموعة أداتك الشاملة لتعلم هندسة الأوامر - فن وعلم صياغة مدخلات فعالة للغاية (أوامر) لتوجيه نماذج الذكاء الاصطناعي، مثل نماذج اللغات الكبيرة (LLMs)، نحو المخرجات التي تريدها بدقة. سواء كنت جديداً في مجال الذكاء الاصطناعي أو تتطلع إلى تحسين مهاراتك، فإن فهم كيفية هيكلة طلباتك أمر حاسم لتحقيق الإمكانات الكاملة للذكاء الاصطناعي.',
    welcomeToStudioP2:
      'هندسة الأوامر الفعالة لا تتعلق فقط بطرح الأسئلة؛ بل تتعلق بتقديم تعليمات واضحة، وسياق ذي صلة، وقيود محددة. تنطوي على التفكير استراتيجicamente في كيفية معالجة الذكاء الاصطناعي للمعلومات وكيف يمكنك توجيه هذه العملية. سيرشدك هذا الاستوديو عبر المبادئ التأسيسية، وأنواع الأوامر المتنوعة، وحالات الاستخدام الشائعة، والاستراتيجيات المتقدمة لمساعدتك في تحقيق نتائج أفضل بشكل كبير في تفاعلاتك مع الذكاء الاصطناعي.',
    welcomeToStudioP3:
      'أدناه، ستجد مثالاً على "أمر فائق" مشابه لما يشغل قسم ساحة اللعب لدينا. هذا يوضح مستوى التفاصيل والهيكل الذي يمكن أن يحول فكرة بسيطة إلى تعليمات قوية للذكاء الاصطناعي:',
    metaPromptTitle: 'مثال على الأمر الفائق',
    metaPromptIntro:
      '"أنت مجموعة أدوات عبقرية هندسة الأوامر بالذكاء الاصطناعي. غرضك الوحيد هو تحويل فكرة أساسية أو أمر بسيص يقدمه المستخدم إلى أمر شامل ومنظم للغاية وغير عادي التحديد مصمم لإنتاج مخرجات من ذكاء اصطناعي آخر تكون أكثر فعالية وبصيرة ودقة واستهدافاً بشكل كبير (مثالي 10 مرات) من المدخلات الأصلية.',
    yourTask: 'مهمتك:',
    metaPromptInstructions:
      'استقبل الفكرة البسيطة أو الأمر الأساسي للمستخدم. حلل نيته الأساسية. حدد المجالات التي تفتقر إلى التفاصيل أو السياق أو الهيكل أو القيود. ثم، أعادة صياغة وتوسيع بعناية إلى أمر متطور باستخدام المبادئ التالية:',
    metaPromptInstruction1:
      'تحديد دور/شخصية واضح: عين دوراً أو شخصية محددة وذات صلة للذكاء الاصطناعي المستهدف إذا كان ذلك مناسباً للمهمة.',
    metaPromptInstruction2:
      'تحديد المهمة بالتفصيل: قسّم المهمة إلى خطوات أو مكونات واضحة إذا لزم الأمر. استخدم أفعال إجراء قوية وغير غامضة.',
    metaPromptInstruction3:
      'إضافة سياق أساسي: قم بتضمين معلومات خلفية ذات صلة، أو معلمات، أو تفاصيل سيناريو مطلوبة للحصول على استجابة دقيقة ومفيدة.',
    metaPromptInstruction4:
      'دمج قيود محددة: حدد القيود أو المتطلبات مثل: الطول، التنسيق، النمط، النبرة، القيود السلبية.',
    metaPromptInstruction5: 'تحديد المخرجات المرغوبة: صف النتيجة المتوقعة بالتفصيل.',
    metaPromptInstruction6:
      'اقترح سلسلة التفكير/الأمثلة (إذا كان ذلك منطبقاً): قم بتضمين تعليمات للذكاء الاصطناعي لإظهار عمله أو تقديم أمثلة.',
    metaPromptInstruction7: 'ضمان الوضوح وعدم الغموض: يجب أن تكون كل تعليمة سهلة الفهم.',
    metaPromptInput: 'الإدخال: سيوفر المستخدم عبارة بسيطة أو أمر قصير.',
    metaPromptOutput:
      'المخرجات: قدم *فقط* الأمر المُنشأ والمحسّن والمفصل للغاية والمنظم.',
    whyPromptEngineeringImportant: 'لماذا هندسة الأوامر مهمة؟',
    improvedModelPerformance: 'تحسين أداء النموذج',
    improvedModelPerformanceDesc:
      'تؤدي الأوامر المصممة بعناية إلى مخرجات أكثر دقة وذات صلة وإفادة.',
    reducedBiasHarmful: 'تقليل التحيز والردور الضارة',
    reducedBiasHarmfulDesc:
      'يساعد الأوامر الدقيقة في التخفيف من التحيز وتقليل المحتوى غير المرغوب فيه.',
    increasedControl: 'زيادة التحكم والقدرة على التنبؤ',
    increasedControlDesc:
      'اكسب تحكماً أفضل في سلوك الذكاء الاصطناعي للحصول على نتائج متسقة ومرغوبة.',
    enhancedUserExperience: 'تحسين تجربة المستخدم',
    enhancedUserExperienceDesc:
      'تجعل الأوامر الواضحة تفاعلات الذكاء الاصطناعي أكثر بديهية وإرضاء.',
    craftingEffectivePrompts: 'صياغة أوامر فعالة',
    craftingEffectivePromptsDesc:
      'فهم قدرات النموذج والتنسيق المفضل له أمر ضروري. إليك العناصر الرئيسية:',

    // Prompt Types Section
    understandingPromptTypes: 'فهم أنواع الأوامر',
    understandingPromptTypesIntro:
      'هناك أنواع مختلفة من الأوامر المستخدمة في الذكاء الاصطناعي، يخدم كل منها غرضاً محدداً. إتقان هذه الأنواع يسمح بتحكم أكثر دقة في ردود الذكاء الاصطناعي.',
    directPromptsZeroShot: 'الأوامر المباشرة (بدون أمثلة)',
    directPromptsZeroShotDesc:
      'يتضمن التوجيه بدون أمثلة تزويد النموذج بتعليمات أو سؤال مباشر دون أي سياق إضافي أو أمثلة محددة للمهمة الحالية.',
    directPromptsZeroShotDetails:
      'يعتمد هذا على المعرفة المسبقة للنموذج لفهم وتنفيذ المهمة.\n\nالأمثلة: توليد الأفكار (مثلاً، "ولد أفكاراً إبداعية لمنتج مستدام")، والتلخيص ("لخص هذا المقال عن الطاقة المتجددة")، أو الترجمة ("ترجم \'مرحباً بالعالم\' إلى الفرنسية").',
    oneFewMultiShotPrompts: 'أوامر بمثال واحد أو عدة أمثلة أو عديدة',
    oneFewMultiShotPromptsDesc:
      'تتضمن هذه الطريقة تزويد النموذج بمثال واحد أو أكثر (طلقات) من أزواج الإدخال-المخرجات المرغوبة قبل تقديم الأمر الفعلي.',
    oneFewMultiShotPromptsDetails:
      'يساعد هذا النموذج على فهم المهمة والتنسيق المتوقع والنمط بشكل أفضل، مما يؤدي إلى استجابات أكثر دقة.\n\n• مثال واحد: مثال واحد.\n• عدة أمثلة: عدد قليل من الأمثلة (عادة 2-5).\n• أمثلة متعددة: العديد من الأمثلة، غالباً ما تستخدم للضبط الدقيق.',
    chainOfThoughtPrompts: 'أوامر سلسلة التفكير',
    chainOfThoughtPromptsDesc:
      'يشجع التوجيه بسلسلة التفكير النموذج على تقسيم الاستدلال المعقد إلى سلسلة من الخطوات الوسيطة، مما يؤدي إلى مخرجات نهائية أكثر شمولاً وهيكلة جيدة.',
    chainOfThoughtPromptsDetails:
      'بدلاً من مجرد طلب الإجابة، تطلب من النموذج "التفكير خطوة بخطوة" أو إظهار عملية استدلاله. هذا مفيد بشكل خاص للمهام الحسابية والاستدلال السليم والاستدلال الرمزي.',
    zeroShotCoTPrompts: 'أوامر سلسلة التفكير بدون أمثلة',
    zeroShotCoTPromptsDesc:
      'يجمع بين التوجيه بسلسلة التفكير والتوجيه بدون أمثلة عن طريق إضافة بسيطة "لنفكر خطوة بخطوة" أو عبارة مشابهة للأمر الأصلي.',
    zeroShotCoTPromptsDetails:
      'يمكن أن تؤدي هذه الإضافة البسيطة إلى تحسين مدهش في قدرة الاستدلال للنموذج دون الحاجة إلى أمثلة صريحة لعملية التفكير.',

    // Use Cases Section
    promptEngineeringUseCases: 'حالات استخدام وأمثلة على هندسة الأوامر',
    promptEngineeringUseCasesIntro:
      'استكشف أمثلة وسيناريوهات محددة توضح كيف تساعد هندسة الأوامر في إنتاج مخرجات مخصصة وذات صلة للذكاء الاصطناعي في مختلف المجالات.',
    languageAndTextGeneration: 'اللغة وتوليد النصوص',
    languageAndTextGenerationDesc: 'صياغة أوامر لمهام نصية متنوعة.',
    creativeWriting: 'الكتابة الإبداعية',
    creativeWritingDesc: 'حدد النوع والنبرة والأساس ونقاط الحبكة.',
    creativeWritingExample:
      'اكتب قصة قصيرة مشوقة (حوالي 300 كلمة) عن امرأة شابة تكتشف بوابة سحرية متوهجة في علية منزلها خلال عاصفة رعدية. يجب أن تكون النبرة غامضة وخطيرة قليلاً.',
    summarization: 'التلخيص',
    summarizationDesc: 'أمر الذكاء الاصطناعي بإنشاء تلخيصات موجزة تسجل المعلومات الرئيسية.',
    summarizationExample:
      'لخص الحجج الرئيسية والنتائج الرئيسية للمقال الإخباري التالي عن التطورات الأخيرة في أخلاقيات الذكاء الاصطناعي في ثلاث نقاط.',
    translation: 'الترجمة',
    translationDesc:
      'حدد اللغات المصدر والهدفية، مع ضمان الحفاظ على المعنى والسياق.',
    translationExample:
      'ترجم البريد الإلكتروني التجاري التالي من الإنجليزية إلى الألمانية المهنية، مع الحفاظ على نبرة رسمية: "السيد شميدت العزيز، نحن سعداء بتأكيد اجتماعنا يوم الثلاثاء القادم الساعة 10 صباحاً. يرجى إعلامنا ما إذا كان هذا الوقت لا يزال مناسبًا لك. مع أطيب التحيات، جين دو."',
    dialogueGeneration: 'توليد الحوارات',
    dialogueGenerationDesc: 'صمم أوامر تحاكي المحادثات، مع الحفاظ على السياق.',
    dialogueGenerationExample:
      'أنت "مساعد تقني"، روبوت محادثة ودود وصبور يساعد المستخدمين في مشاكل البرمجيات. يقول المستخدم: "يتوقف تطبيق تحرير الصور الخاص بي عن العمل عندما أحاول فتح ملفات كبيرة." استجب بتعاطف واطلب المزيد من التفاصيل للمساعدة في حل المشكلة.',
    questionAnswering: 'الإجابة على الأسئلة',
    questionAnsweringDesc: 'صياغة أوامر لأنواع مختلفة من الأسئلة.',
    openEndedQuestions: 'الأسئلة المفتوحة',
    openEndedQuestionsDesc: 'شجع الإجابات الشاملة بناءً على معرفة الذكاء الاصطناعي.',
    openEndedQuestionsExample:
      'اشرح مفهوم تقنية البلوك تشين، ومكوناتها الرئيسية، وتأثيرها المحتمل على مختلف الصناعات بخلاف العملات المشفرة. قدم ثلاثة أمثلة متميزة على الأقل.',
    specificQuestions: 'الأسئلة المحددة',
    specificQuestionsDesc:
      'استهدف معلومات محددة من السياق المقدم أو المعرفة الداخلية.',
    specificQuestionsExample:
      'وفقاً للورقة العلمية المقدمة (افترض أن الورقة مرفقة)، ما هي القيود الرئيسية التي اعترف بها الباحثون في دراستهم حول X؟',
    multipleChoiceQuestions: 'أسئلة الاختيار من متعدد',
    multipleChoiceQuestionsDesc:
      'اطلب من الذكاء الاصطناعي تحليل الخيارات واختيار الإجابة الأنسب.',
    multipleChoiceQuestionsExample:
      'أي من الآتي ليس غاز دفيئياً أساسياً؟ أ) ثاني أكسيد الكربون، ب) الميثان، ج) الأكسجين، د) أكسيد النيتروز. اشرح اختيارك.',
    hypotheticalQuestions: 'الأسئلة الافتراضية',
    hypotheticalQuestionsDesc:
      'استكشف السيناريوهات الافتراضية، مما يسمح للذكاء الاصطناعي بالاستدلال والتكهن.',
    hypotheticalQuestionsExample:
      'تخيل سيناريو يتم فيه تطبيق الدخل الأساسي الشامل (UBI) على مستوى العالم. ما هي ثلاث نتائج إيجابية وثلاث نتائج سلبية محتملة اجتماعياً واقتصادياً؟ قم بتقديم تبرير موجز لكل منها.',
    opinionBasedQuestions: 'الأسئلة القائمة على الرأي (مع تحفظات)',
    opinionBasedQuestionsDesc:
      'استخرج منظور الذكاء الاصطناعي (كمحاكاة) مع الاستدلال. ملاحظة: نماذج الذكاء الاصطناعي ليس لديها آراء شخصية ولكن يمكنها تجميع المعلومات لتكوين موقف مدروس.',
    opinionBasedQuestionsExample:
      'ناقش الاعتبارات الأخلاقية لاستخدام الذكاء الاصطناعي في عمليات التوظيف. قدم حججاً لضد، واختيار بمنظور متوازن حول التنفيذ المسؤول.',
    codeGeneration: 'توليد الكود',
    codeGenerationDesc: 'توجيه الذكاء الاصطناعي في مهام البرمجة المختلفة.',
    codeCompletion: 'إكمال الكود',
    codeCompletionDesc: 'قدم كود جزئي واطلب من الذكاء الاصطناعي إكماله.',
    codeCompletionExample:
      'أكمل وظيفة Python التالية التي تأخذ قائمة أرقام وترجع قائمة جديدة تحتوي فقط على الأرقام الزوجية:\n```python\ndef get_even_numbers(numbers):\n  # الكود هنا\n```',
    codeTranslation: 'ترجمة الكود',
    codeTranslationDesc: 'حدد اللغات المصدر والهدفية، مع الحفاظ على الوظائف.',
    codeTranslationExample:
      'ترجم مقطع كود Python التالي إلى JavaScript، مع ضمان الوظائف المتكافئة. كود Python يحسب مجموع مصفوفة:\n```python\ndef sum_array(arr):\n  total = 0\n  for x in arr:\n    total += x\n  return total\n```',
    codeOptimization: 'تحسين الكود',
    codeOptimizationDesc: 'اطلب من الذكاء الاصطناعي تحليل الكود واقتراح تحسينات.',
    codeOptimizationExample:
      'حلل كود Python التالي لحساب أرقام فيبوناتشي بشكل متكرر. حدد اختناقات الأداء المحتملة واقترح نسخة محسنة، مع شرح التحسينات.\n```python\ndef fib_recursive(n):\n  if n <= 1:\n    return n\n  else:\n    return fib_recursive(n-1) + fib_recursive(n-2)\n```',
    codeDebugging: 'تصحيح أخطاء الكود',
    codeDebuggingDesc:
      'قدم كود به أخطاء واطلب من الذكاء الاصطناعي تحديد المشاكل واقتراح الحلول.',
    codeDebuggingExample:
      'كود Java التالي من المفترض أن يقرأ ملف سطر بسطر، لكنه يطرح NullPointerException. حدد الخطأ، اشرح سببه، وقدم الكود المصحح.\n[الصق كود Java الخاطئ هنا]',
    imageGeneration: 'توليد الصور',
    imageGenerationDesc: 'صياغة أوامر لمولدات الصور بالذكاء الاصطناعي.',
    photorealisticImages: 'صور واقعية للغاية',
    photorealisticImagesDesc:
      'صف الصورة المرغوبة بالتفصيل (الكائنات، المشهد، الإضاءة، الأسلوب).',
    photorealisticImagesExample:
      'صورة مفصلة للغاية وواقعية لفهد ثلجي مهيب يستريح على صخرة ناتئة في الهيمالايا خلال غروب الشمس الذهبي. يجب أن تكون الإضاءة دافئة ومثيرة، مع إبراز ملمس فرائه. التقط بعدسة تقريب، عمق مجال ضحل.',
    artisticImages: 'صور فنية',
    artisticImagesDesc: 'حدد الأساليب الفنية والتقنيات وموضوع العمل.',
    artisticImagesExample:
      'لوحة انطباعية تصبح الفوضى النابضة بالحياة لسوق شارع باريسي مزدحم في يوم ممطر بعد الظهر. ركز على الانعكاسات على الأحجار الرصفة المبللة والأرقام الضبابية مع المظلات الملونة. أسلوب مونيه.',
    abstractImages: 'صور تجريدية',
    abstractImagesDesc:
      'شجع الذكاء الاصطناعي على توليد صور مفتوحة للتفسير باستخدام الأشكال والألوان والملمس.',
    abstractImagesExample:
      'عمل فني رقمي تجريدي يمثل مفهوم "المصادفة". استخدم خطوطاً متدفقة ومترابطة بدرجات الأزرق والذهبي، مع مصادر ضوء ناعمة متوهجة. أثار شعوراً بالاكتشاف غير المتوقع.',
    imageEditing: 'تحرير الصور',
    imageEditingDesc: 'قدم صورة وحدد التعديلات المرغوبة.',
    imageEditingExample:
      '(بافتراض تقديم صورة) للصورة المرفوعة لقط تجلس على كرسي: غيّر الخلفية إلى غابة خضراء خصبة. أضف فراشة صغيرة مسلية ترتدي على أنف القطة. تأكد من أن الإضاءة على القطة تتطابق مع خلفية الغابة الجديدة.',

    // Strategies Section
    strategiesForBetterPrompts: 'استراتيجيات كتابة أوامر أفضل',
    strategiesForBetterPromptsIntro:
      'تتطلب صياغة الأوامر الفعالة نهجاً استراتيجياً. فكر في هذه التكتيكات لتحسين مهاراتك في هندسة الأوامر وتحقيق مخرجات ذكاء اصطناعي متفوقة.',
    setClearGoals: '1. حدد أهدافاً وموضوعات واضحة',
    setClearGoalsDesc: 'حدد بدقة ما تريد أن يحققه الذكاء الاصطناعي.',
    useActionVerbs: 'استخدم أفعال الإجراء',
    useActionVerbsDesc: 'حدد الإجراء المطلوب بوضوح.',
    useActionVerbsExample:
      'ولد قائمة نقطية تلخص المزايا الرئيسية لمصادر الطاقة المتجددة على الوقود الأحفوري.',
    defineFormat: 'حدد الطول والتنسيق المطلوب',
    defineFormatDesc: 'كن صريحاً حول هيكل المخرجات.',
    defineFormatExample:
      'أكتب وصف منتج 250 كلمة لكرسي مكتبي مريح جديد، مع إبراز فوائده الرئيسية الثلاثة. التنسيق كثلاث فقرات قصيرة.',
    targetAudience: 'حدد الجمهور المستهدف',
    targetAudienceDesc: 'خصص اللغة والنبرة.',
    targetAudienceExample:
      'اشرح مفهوم البناء الضوئي بمصطلحات بسيطة مناسبة لطالب في الصف الخامس. استخدم تشبيهاً للمساعدة في الفهم.',
    provideContext: '2. قدم سياقاً ومعلومات خلفية',
    provideContextDesc:
      'امنح الذكاء الاصطناعي المعلومات اللازمة لفهم الطلب بالكامل.',
    includeRelevantFacts: 'قم بتضمين حقائق وبيانات ذات صلة',
    includeRelevantFactsDesc: 'ثبت الذكاء الاصطناعي بتفاصيل محددة.',
    includeRelevantFactsExample:
      'بافتراض أن متوسط سرعة الإنترنت العالمي هو X ميجابايت في الثانية وسوقنا المستهدف لديه متوسط Y ميجابايت في الثانية، اقترح ثلاث استراتيجيات لتحسين تطبيق الويب الخاص بنا لأوقات تحميل أسرع في هذا السوق.',
    referenceSpecificSources: 'أشير إلى مصادر أو مستندات محددة',
    referenceSpecificSourcesDesc: '(إذا كان منطقياً) وجه الذكاء الاصطناعي لاستخدام المواد المقدمة.',
    referenceSpecificSourcesExample:
      'بناءً على التقرير المالي للربع الثالث المرفق، حدد خطوط الإنتاج الثلاثة الأعلى من حيث الإيرادات وحلل اتجاهات نموها مقارنة بالربع الثاني.',
    defineKeyTerms: 'حدد المصطلحات والمفاهيم الرئيسية',
    defineKeyTermsDesc: 'ضمن الفهم، خاصة للموضوعات المتخصصة.',
    defineKeyTermsExample:
      'اشرح مفهوم "المنظمات المستقلة اللامركزية (DAOs)" في سياق تقنية البلوك تشين. حدد ما هي DAO، كيف تعمل عادة، وحالة استخدام واحدة محتملة.',
    useFewShotPrompting: '3. استخدم التوجيه بعدة أمثلة بشكل فعال',
    useFewShotPromptingDesc: 'قدم أمثلة لتوجيه الذكاء الاصطناعي في النمط والتنسيق والمحتوى.',
    provideInputOutputPairs: 'قدم أزواج إدخال-مخرجات',
    provideInputOutputPairsDesc: 'أظهر للذكاء الاصطناعي بالضبط نوع التحويل الذي تتوقعه.',
    provideInputOutputPairsExample: `ترجم الجمل التالية من الإنجليزية إلى الفرنسية:
الإنجليزية: "مرحباً، كيف حالك؟"
الفرنسية: "بونجور، كومون سافا؟"
الإنجليزية: "أنا أتعلم البرمجة."
الفرنسية: "جابريندي أ كودير."
الإنجليزية: "الطقس جميل اليوم."
الفرنسية:`,
    demonstrateDesiredStyle: 'أظهر النمط أو النبرة المطلوبة',
    demonstrateDesiredStyleDesc: 'يمكن أن تنقل الأمثلة الفروقات الدقيقة بشكل أفضل من الأوصاف.',
    demonstrateDesiredStyleExample: `أعادة صياغة شكوى العميل التالية بنبرة مهتمة ومتعاطفة.
الأصلية: "تطبيقك فظ ولن يعمل أبداً!"
إعادة الصياغة المتعاطفة: "أفهم أنك تعاني من بعض الإحباط مع التطبيق، وأنا آسف لسماع أنه لا يعمل كما هو متوقع. هل يمكنك إخباري بالمزيد عن المشاكل المحددة؟"
الأصلية: "هذا المنتج انكسر بعد يوم واحد، أريد استرداد أموالي الآن!"
إعادة الصياغة المتعاطفة:`,
    showDetailLevel: 'أظهر مستوى التفاصيل المطلوب',
    showDetailLevelDesc: 'وضح مدى إيجاز المخرجات أو اتساعها.',
    showDetailLevelExample: `لخص الفقرة التالية في جملة واحدة.
الفقرة: [فقرة طويلة عن حدث تاريخي]
الملخص بجملة واحدة: [ملخص موجز للحدث]
الفقرة: [فقرة طويلة أخرى]
الملخص بجملة واحدة:`,
    beSpecificUnambiguous: '4. كن محدداً وغير غامض',
    beSpecificUnambiguousDesc:
      'الوضوح يمنع سوء التفسير ويؤدي إلى نتائج أكثر دقة.',
    usePreciseLanguage: 'استخدم لغة دقيقة',
    usePreciseLanguageDesc: 'تجنب المصطلحات الغامضة. كن مباشراً.',
    usePreciseLanguageExample: `بدلاً من: "أخبرني عن الكلاب."
استخدم: "قائمة خمس سلالات كلاب مشهورة بكونها حيوانات أليفة جيدة للعائلات وصف باختصار الشخصية النموذجية لكل منها."`,
    quantifyRequests: 'كمّن طلباتك',
    quantifyRequestsDesc: 'استخدم الأرقام عندما يكون ذلك ممكناً.',
    quantifyRequestsExample: `بدلاً من: "اكتب مقالاً قصيراً."
استخدم: "اكتب مقالاً من حوالي 300 كلمة عن فوائد التمارين المنتظمة."`,
    breakDownTasks: 'قسّم المهام المعقدة',
    breakDownTasksDesc: 'قسّم طلب كبير إلى خطوات أصغر يمكن إدارتها.',
    breakDownTasksExample: `بدلاً من: "أنشئ حملة تسويقية."
استخدم: "طور اقتراح حملة تسويقية لشريط بروتين نباتي جديد. قم بتضمين:
1. ملف الجمهور المستهدف (العمر، الاهتمامات، نمط الحياة).
2. ثلاث رسائل تسويقية رئيسية.
3. قنوات التسويق المقترحة (وسائل التواصل الاجتماعي، المؤثرين، إلخ).
4. فكرتان ترويجيتان فريدتان."`,
    iterateExperiment: '5. كرّر وجرب',
    iterateExperimentDesc: 'هندسة الأوامر غالباً ما تكون عملية تكرارية.',
    iterateExperimentDetails: `• جرب صيغ مختلفة وكلمات رئيسية: أعد صياغة أمرك باستخدام المرادفات أو هياكل الجمل البديلة. التغييرات الصغيرة يمكن أن يكون لها تأثيرات كبيرة.
• ضبط مستوى التفاصيل والتحديد: أضف أو أزل المعلومات لضبط المخرجات بدقة.
• اختر أطوال أوامر مختلفة: جرب كلاً من الأوامر الموجزة القصيرة والأوامر الأطول والأكثر تفصيلاً للعثور على التوازن الأمثل لمهمتك.
• تحليل المخرجات وتحسينها: انتبه لما يولده الذكاء الاصطناعي. إذا لم يكن ما تريده، قم بمراجعة أمرك وحاول مرة أخرى.`,
    leverageCoT: '6. استفد من التوجيه بسلسلة التفكير للمهام المعقدة',
    leverageCoTDesc: 'شجع الذكاء الاصطناعي على "التفكير خطوة بخطوة" لاستدلال أفضل.',
    encourageStepByStep: 'شجع الاستدلال خطوة بخطوة',
    encourageStepByStepDesc: 'اطلب صراحة من الذكاء الاصطناعي تقسيم عمليته.',
    encourageStepByStepExample:
      'حل هذه المسألة الكلامية من خلال إظهار خطواتك: يغادر قطار المدينة أ الساعة 2:00 مساءً متجهاً بسرعة 60 ميلاً في الساعة. يغادر قطار آخر المدينة ب الساعة 3:00 مساءً متجهاً نحو المدينة أ بسرعة 80 ميلاً في الساعة. إذا كانت المدينة أ والمدينة ب تبعد 410 ميلاً، في أي وقت سيلتقيان؟ لنفكر خطوة بخطوة.',
    askForExplanation: 'اطلب من النموذج شرح استدلاله',
    askForExplanationDesc:
      'يساعد هذا في فهم عملية تفكير الذكاء الاصطناعي ويمكن أن يحسن جودة النتائج.',
    askForExplanationExample:
      'صنف مشاعر مراجعة الفيلم التالية إيجابية أو سلبية أو محايدة، واشرح استدلالك: "بينما كانت المرئيات مذهلة، بدا الحبكة غير متطورة والنهاية كانت فجائية."',
    guideLogicalSequence: 'وجه النموذج عبر تسلسل منطقي',
    guideLogicalSequenceDesc: 'لصناعة القرار المعقد، حدد عملية التفكير.',
    guideLogicalSequenceExample:
      'لتحديد ما إذا كانت ورقة البحث هذه ذات صلة بدراستي حول "الذكاء الاصطناعي في تشخيص الرعاية الصحية"، يرجى النظر في التالي وشرح نتائجك لكل منها: 1. هل يذكر الملخص التشخيص أو التصوير؟ 2. هل المنهجيات الموصوفة ذات صلة بالتعلم الآلي أو التعلم العميق؟ 3. هل تاريخ النشر خلال آخر 3 سنوات؟ بناءً على هذا، هل هي ذات صلة عالية، أو ذات صلة متوسطة، أو غير ذات صلة؟',
    furtherGuidance: 'توجيه إضافي',
    furtherGuidanceDesc:
      'للاستراتيجيات وأفضل الممارسات الأكثر تعمقاً، خاصة داخل نظام البيئة السحابية من Google، يمكن أن يوفر استكشاف الموارد مثل "أفضل خمس ممارسات لهندسة الأوامر على Google Cloud" رؤى قيمة. (ملاحظة: هذا مرجع عام، قد تختلف الروابط المحددة بمرور الوقت).',
    examplePrompt: 'أمر مثالي',
    clarityAndSpecificity: 'الوضوح والتحديد',
    clarityAndSpecificityDesc:
      'ركن أي أمر جيد هو الوضوح المطلق ودرجة عالية من التحديد. تجنب الغموض بكل التكاليف. اللغة الغامضة، أو المصطلحات غير المحددة، أو الافتراضات الضمنية ستؤدي غالباً إلى أن يولد الذكاء الاصطناعي ردود عامية أو غير ذات صلة أو غير صحيحة.\n\nيعني الوضوح استخدام مفردات دقيقة وهيكلة جملك بحيث يكون هناك تفسير محتمل واحد فقط. حدد بوضوح ما تريد أن يفعله الذكاء الاصطناعي *المهمة* و*ماذا* يجب أن تكون المخرجات.\n\nيتضمن التحديد توفير تفاصيل كافية وسياق وقيود (مثل التنسيق والطول والنبرة والأسلوب) وحتى أمثلة إذا لزم الأمر. كلما كان أمرك أكثر تحديداً، كلما تمكن الذكاء الاصطناعي من فهم احتياجاتك الدقيقة وتخصيص مخرجاته وفقاً لذلك. فكر في الأمر كتوفير مخطط تفصيلي بدلاً من رسم تقريبي غامض.',
    contextAndExamples: 'السياق والأمثلة',
    contextAndExamplesDesc:
      'تقديم السياق والأمثلة ذات الصلة يساعد الذكاء الاصطناعي على فهم المهمة وتوليد مخرجات أكثر دقة. على سبيل المثال، إذا كنت تبحث عن قصة إبداعية، فإن تضمين بضع جمل تصف النبرة أو الموضوع المرغوب فيه يمكن أن يحسن النتائج بشكل كبير.',
    fineTuningAndAdapting: 'الضبط الدقيق والتكيف',
    fineTuningAndAdaptingDesc:
      'ضبط النموذج الذكاء الاصطناعي على مهام أو مجالات محددة باستخدام أوامر مخصصة يمكن أن يعزز أداءه. تكييف الأوامر بناءً على ملاحظات المستخدم أو مخرجات النموذج يمكن أن يحسن الاستجابات بمرور الوقت.',
    multiTurnConversations: 'المحادثات متعددة الجولات',
    multiTurnConversationsDesc:
      'تصميم أوامر للمحادثات متعددة الجولات يسمح للمستخدمين بالتفاعل بشكل مستمر ووعي بالسياق مع الذكاء الاصطناعي، مما يعزز تجربة المستخدم الإجمالية من خلال البناء على التبادلات السابقة.',
  },
};

// Helper function to get content translation
export function tc(lang: Language, key: keyof ContentTranslations): string {
  return contentTranslations[lang][key];
}
