import Anthropic from '@anthropic-ai/sdk';
import { Article, QualityAssessment } from '../types';
import { config } from '../utils/config';

export class ClaudeClient {
  private client: Anthropic;
  private config: any;

  constructor() {
    this.config = config.getConfig('claude') as any;
    this.client = new Anthropic({
      apiKey: this.config.apiKey,
    });
  }

  async assessQuality(article: Article): Promise<QualityAssessment> {
    try {
      const prompt = `${this.config.prompts.qualityAssessment}

Article Title: ${article.title}
Source: ${article.source}
Content Preview: ${article.content.substring(0, 500)}...
URL: ${article.url}
Current Score: ${article.score}
Engagement: ${JSON.stringify(article.engagement)}`;

      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: this.config.settings.maxTokens,
        temperature: this.config.settings.temperature,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const content = response.content[0];
      if (content.type === 'text') {
        try {
          return JSON.parse(content.text);
        } catch (parseError) {
          // If JSON parsing fails, extract info from text response
          const score = this.extractScore(content.text);
          return {
            score,
            reasoning: content.text,
            isRecommended: score >= 7
          };
        }
      }

      throw new Error('Unexpected response format from Claude');
    } catch (error) {
      console.error('Error assessing article quality:', error);
      return {
        score: 5,
        reasoning: 'Error during quality assessment',
        isRecommended: false
      };
    }
  }

  async summarizeContent(article: Article): Promise<string> {
    try {
      const prompt = `${this.config.prompts.contentSummarization}

Article Title: ${article.title}
Source: ${article.source}
Content: ${article.content}
URL: ${article.url}`;

      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: this.config.settings.maxTokens,
        temperature: this.config.settings.temperature,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const content = response.content[0];
      if (content.type === 'text') {
        return content.text.trim();
      }

      throw new Error('Unexpected response format from Claude');
    } catch (error) {
      console.error('Error summarizing content:', error);
      return 'Summary unavailable due to processing error.';
    }
  }

  async generateFAQ(article: Article): Promise<Array<{question: string, answer: string}>> {
    try {
      const prompt = `${this.config.prompts.faqGeneration}

Article Title: ${article.title}
Source: ${article.source}
Content: ${article.content}
Summary: ${article.summary || 'Not available'}`;

      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: this.config.settings.maxTokens,
        temperature: this.config.settings.temperature,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const content = response.content[0];
      if (content.type === 'text') {
        return this.parseFAQResponse(content.text);
      }

      throw new Error('Unexpected response format from Claude');
    } catch (error) {
      console.error('Error generating FAQ:', error);
      return [];
    }
  }

  async checkDuplicate(article1: Article, article2: Article): Promise<{isDuplicate: boolean, similarity: number, reason: string}> {
    try {
      const prompt = `${this.config.prompts.duplicateDetection}

Article 1:
Title: ${article1.title}
Source: ${article1.source}
Content Preview: ${article1.content.substring(0, 300)}...

Article 2:
Title: ${article2.title}
Source: ${article2.source}
Content Preview: ${article2.content.substring(0, 300)}...`;

      const response = await this.client.messages.create({
        model: this.config.model,
        max_tokens: this.config.settings.maxTokens,
        temperature: this.config.settings.temperature,
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ]
      });

      const content = response.content[0];
      if (content.type === 'text') {
        try {
          return JSON.parse(content.text);
        } catch (parseError) {
          // Fallback to text analysis
          const isDuplicate = content.text.toLowerCase().includes('duplicate') || 
                             content.text.toLowerCase().includes('similar');
          return {
            isDuplicate,
            similarity: isDuplicate ? 0.8 : 0.2,
            reason: content.text
          };
        }
      }

      throw new Error('Unexpected response format from Claude');
    } catch (error) {
      console.error('Error checking for duplicates:', error);
      return {
        isDuplicate: false,
        similarity: 0,
        reason: 'Error during duplicate detection'
      };
    }
  }

  async processArticle(article: Article): Promise<Article> {
    console.log(`Processing article: ${article.title}`);

    // Run quality assessment and summarization in parallel
    const [qualityAssessment, summary, faq] = await Promise.all([
      this.assessQuality(article),
      this.summarizeContent(article),
      this.generateFAQ(article)
    ]);

    return {
      ...article,
      qualityScore: qualityAssessment.score,
      summary,
      faq,
      isApproved: qualityAssessment.isRecommended && qualityAssessment.score >= 7
    };
  }

  private extractScore(text: string): number {
    // Try to extract a score from text if JSON parsing fails
    const scoreMatch = text.match(/score[:\s]*(\d+)/i);
    if (scoreMatch) {
      return parseInt(scoreMatch[1], 10);
    }
    
    // Default scoring based on keywords
    const positiveWords = ['excellent', 'great', 'good', 'high quality', 'recommended'];
    const negativeWords = ['poor', 'bad', 'low quality', 'not recommended'];
    
    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.reduce((count, word) => 
      count + (lowerText.includes(word) ? 1 : 0), 0);
    const negativeCount = negativeWords.reduce((count, word) => 
      count + (lowerText.includes(word) ? 1 : 0), 0);
    
    return Math.max(1, Math.min(10, 5 + positiveCount - negativeCount));
  }

  private parseFAQResponse(text: string): Array<{question: string, answer: string}> {
    const faq: Array<{question: string, answer: string}> = [];
    
    // Try to parse structured FAQ format
    const qaPairs = text.split(/\n\s*\n/);
    
    for (const pair of qaPairs) {
      const lines = pair.trim().split('\n');
      if (lines.length >= 2) {
        const question = lines[0].replace(/^[Q\d\.\s*:]+/i, '').trim();
        const answer = lines.slice(1).join(' ').replace(/^[A\d\.\s*:]+/i, '').trim();
        
        if (question && answer) {
          faq.push({ question, answer });
        }
      }
    }
    
    return faq.slice(0, 5); // Limit to 5 FAQ items
  }
}