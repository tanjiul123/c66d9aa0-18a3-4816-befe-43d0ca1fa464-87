import { GoogleGenerativeAI } from '@google/generative-ai';

export type ContentType = 'Project Ideas' | 'Project Report' | 'Assignment Solution';
export type ContentTone = 'Professional' | 'Academic' | 'Creative' | 'Technical' | 'Detailed';
export type AudienceType = 'Students' | 'Researchers' | 'Professionals' | 'Beginners' | 'Advanced';

export interface ContentRequest {
  topic: string;
  contentType: ContentType;
  tone: ContentTone;
  audience: AudienceType;
  additionalDetails?: string;
}

export interface ContentResult {
  type: ContentType;
  title: string;
  content: string;
  sections: string[];
  keywords: string[];
  tips: string[];
  estimatedLength: string;
}

const CONTENT_PROMPTS = {
  'Project Ideas': `
You are a creative project idea generator and innovation consultant.

Topic: "{{TOPIC}}"
Tone: {{TONE}}
Audience: {{AUDIENCE}}
Additional Details: {{DETAILS}}

Generate 5-7 unique and innovative project ideas related to the topic.

Structure:

🎯 **Introduction**:
- Brief overview of the topic domain
- Why these projects are relevant and valuable

💡 **Project Ideas** (5-7 ideas):
For each project idea include:
- Project Name (creative and memorable)
- Description (2-3 sentences)
- Key Features (3-4 bullet points)
- Technology Stack suggestion
- Difficulty Level (Beginner/Intermediate/Advanced)
- Estimated Timeline
- Impact & Value

🚀 **Implementation Tips**:
- Getting started advice
- Resources needed
- Common challenges to avoid

Special Instructions:
- Make ideas innovative and practical
- Consider current trends and technologies
- Ensure feasibility for the target audience
- Include real-world applications
`,

  'Project Report': `
You are an expert academic writer and project documentation specialist.

Topic: "{{TOPIC}}"
Tone: {{TONE}}
Audience: {{AUDIENCE}}
Additional Details: {{DETAILS}}

Create a comprehensive project report with the following structure:

📋 **Title & Abstract**:
- Compelling project title
- Executive summary (150-200 words)
- Key objectives and outcomes

🎯 **Introduction**:
- Background and context
- Problem statement
- Project objectives
- Scope and limitations

🔍 **Literature Review / Background Research**:
- Current state of the field
- Related work and existing solutions
- Research gaps identified

⚙️ **Methodology**:
- Approach and framework
- Tools and technologies used
- Implementation process
- System architecture/design

📊 **Results & Analysis**:
- Key findings and outcomes
- Data analysis and interpretation
- Performance metrics
- Comparative analysis

💡 **Discussion**:
- Interpretation of results
- Implications and significance
- Challenges faced and solutions
- Future improvements

🎬 **Conclusion**:
- Summary of achievements
- Contribution to the field
- Recommendations
- Future scope

📚 **References & Resources**:
- Suggested reading materials
- Tools and frameworks

Special Instructions:
- Use formal academic language
- Include specific details and examples
- Make it publication-ready
- Ensure logical flow between sections
`,

  'Assignment Solution': `
You are an expert educator and assignment solution provider.

Topic: "{{TOPIC}}"
Tone: {{TONE}}
Audience: {{AUDIENCE}}
Additional Details: {{DETAILS}}

Create a comprehensive assignment solution with deep explanations:

📝 **Assignment Overview**:
- Understanding the question/problem
- Key concepts involved
- Learning objectives

💡 **Theoretical Foundation**:
- Core concepts explanation
- Relevant theories and principles
- Background knowledge needed

🔬 **Step-by-Step Solution**:
- Break down the problem
- Detailed solution process
- Each step explained thoroughly
- Formulas/algorithms used
- Code snippets (if applicable)
- Diagrams and examples

📊 **Analysis & Verification**:
- Result validation
- Alternative approaches
- Comparison of methods
- Error analysis

🎯 **Key Takeaways**:
- Important points to remember
- Common mistakes to avoid
- Best practices
- Related concepts

📚 **Practice & Extension**:
- Similar problems to practice
- Advanced variations
- Real-world applications
- Further study resources

🌟 **Study Tips**:
- How to master this topic
- Effective learning strategies
- Resources for deeper understanding

Special Instructions:
- Explain every step clearly
- Use examples and analogies
- Include visual descriptions
- Make it easy to understand
- Provide complete, detailed solutions
- Focus on learning, not just answers
`
};

const KEYWORD_PROMPTS = {
  'Project Ideas': 'Generate 10-15 relevant keywords and trending tags for these project ideas',
  'Project Report': 'Generate 10-15 academic keywords and research tags for this project report',
  'Assignment Solution': 'Generate 10-15 study keywords and concept tags for this assignment topic'
};

export class GeminiService {
  private genAI: GoogleGenerativeAI | null = null;
  private apiKey: string = '';

  constructor(apiKey?: string) {
    if (apiKey) {
      this.setApiKey(apiKey);
    }
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    this.genAI = new GoogleGenerativeAI(apiKey);
  }

  async generateContent(request: ContentRequest): Promise<ContentResult> {
    if (!this.genAI) {
      throw new Error('Gemini API key not set. Please provide your API key.');
    }

    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const contentPrompt = this.buildContentPrompt(request);
    
    try {
      const contentResult = await model.generateContent(contentPrompt);
      const contentResponse = await contentResult.response;
      const contentText = contentResponse.text();

      const keywordPrompt = this.buildKeywordPrompt(request);
      const keywordResult = await model.generateContent(keywordPrompt);
      const keywordResponse = await keywordResult.response;
      const keywordText = keywordResponse.text();

      return this.parseResponse(contentText, keywordText, request);
    } catch (error) {
      console.error('Error generating content:', error);
      throw new Error('Failed to generate content. Please try again.');
    }
  }

  private buildContentPrompt(request: ContentRequest): string {
    const basePrompt = CONTENT_PROMPTS[request.contentType];
    
    return basePrompt
      .replace('{{TOPIC}}', request.topic)
      .replace('{{TONE}}', request.tone)
      .replace('{{AUDIENCE}}', request.audience)
      .replace('{{DETAILS}}', request.additionalDetails || 'No additional details provided') + `

Output in the following format:

CONTENT_TITLE_START
[Write the title here]
CONTENT_TITLE_END

CONTENT_BODY_START
[Write the main content here with all sections]
CONTENT_BODY_END

SECTIONS_START
[List main section headings, one per line]
SECTIONS_END

TIPS_START
[Provide 5-7 helpful tips related to this content]
TIPS_END

ESTIMATED_LENGTH_START
[Estimated word count and reading time]
ESTIMATED_LENGTH_END`;
  }

  private buildKeywordPrompt(request: ContentRequest): string {
    return `${KEYWORD_PROMPTS[request.contentType]} for topic: "${request.topic}"

Output in the following format:

KEYWORDS_START
[Write keywords here, one per line]
KEYWORDS_END`;
  }

  private parseResponse(contentText: string, keywordText: string, request: ContentRequest): ContentResult {
    try {
      const titleMatch = contentText.match(/CONTENT_TITLE_START\s*([\s\S]*?)\s*CONTENT_TITLE_END/);
      const title = titleMatch ? titleMatch[1].trim() : `${request.contentType} Title`;

      const contentMatch = contentText.match(/CONTENT_BODY_START\s*([\s\S]*?)\s*CONTENT_BODY_END/);
      const content = contentMatch ? contentMatch[1].trim() : 'Failed to generate content';

      const sectionsMatch = contentText.match(/SECTIONS_START\s*([\s\S]*?)\s*SECTIONS_END/);
      const sectionsText = sectionsMatch ? sectionsMatch[1].trim() : '';
      const sections = sectionsText.split('\n').map(s => s.trim().replace(/^[-•]\s*/, '')).filter(s => s.length > 0);

      const tipsMatch = contentText.match(/TIPS_START\s*([\s\S]*?)\s*TIPS_END/);
      const tipsText = tipsMatch ? tipsMatch[1].trim() : '';
      const tips = tipsText.split('\n').map(tip => tip.trim().replace(/^[-•]\s*/, '')).filter(tip => tip.length > 0);

      const lengthMatch = contentText.match(/ESTIMATED_LENGTH_START\s*([\s\S]*?)\s*ESTIMATED_LENGTH_END/);
      const estimatedLength = lengthMatch ? lengthMatch[1].trim() : 'Comprehensive content';

      const keywordMatch = keywordText.match(/KEYWORDS_START\s*([\s\S]*?)\s*KEYWORDS_END/);
      const keywordsText = keywordMatch ? keywordMatch[1].trim() : '';
      const keywords = keywordsText.split('\n').map(k => k.trim()).filter(k => k.length > 0);

      return {
        type: request.contentType,
        title,
        content,
        sections: sections.length > 0 ? sections : ['Introduction', 'Main Content', 'Conclusion'],
        keywords: keywords.length > 0 ? keywords : ['Research', 'Study', 'Project'],
        tips: tips.length > 0 ? tips : ['Plan thoroughly', 'Stay organized', 'Seek feedback'],
        estimatedLength
      };
    } catch (error) {
      console.error('Error parsing response:', error);
      throw new Error('Failed to parse generated content');
    }
  }

  async getSuggestedTopics(): Promise<string[]> {
    if (!this.genAI) {
      return [
        'Machine Learning Applications',
        'Web Development Projects',
        'Data Science Analysis',
        'Mobile App Development',
        'IoT Smart Systems',
        'Blockchain Technology',
        'Cloud Computing',
        'Cybersecurity Solutions',
        'AI Chatbot Development',
        'E-commerce Platform'
      ];
    }

    const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Suggest 10 trending and popular topics for student projects, research, and assignments in technology and academia. Only provide topic names, one per line.`;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      return text.split('\n')
        .map(topic => topic.trim().replace(/^\d+\.\s*/, ''))
        .filter(topic => topic.length > 0)
        .slice(0, 10);
    } catch (error) {
      console.error('Error getting suggested topics:', error);
      return [
        'Machine Learning Applications',
        'Web Development Projects',
        'Data Science Analysis',
        'Mobile App Development',
        'IoT Smart Systems'
      ];
    }
  }
}
