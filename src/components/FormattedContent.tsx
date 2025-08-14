import React from 'react';
import { ContentType } from '@/services/geminiService';

interface FormattedContentProps {
  content: string;
  contentType: ContentType;
  className?: string;
}

export const FormattedContent = ({ content, contentType, className = '' }: FormattedContentProps) => {
  const formatContent = (text: string) => {
    // Split by line breaks and process each line
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    return lines.map((line, index) => {
      // Add proper spacing around emojis
      const formattedLine = line.replace(/([^\s])([🔥💡📌✅🎯🚀💰📈🔴⭐️📱💪🌟🎉🏆🔥🎊✨💥🔥🚀💯⚡️🌈🎨🎭🎪🎯🎲🎪🎯🔥🎊💰🎨🏆🎯🔥💡📌✅🎯🚀💰📈🔴⭐️📱💪🌟🎉🏆🔥🎊✨💥🔥🚀💯⚡️🌈🎨🎭🎪🎯🎲🎪🎯])/g, '$1 $2');
      
      // Check if line is a heading (starts with #)
      const isHeading = line.startsWith('#');
      const headingLevel = isHeading ? (line.match(/^#+/) || [''])[0].length : 0;
      
      // Check if line starts with bullet point or emoji
      const isBulletPoint = /^[•✅🔥💡📌🎯🚀💰📈🔴⭐️📱💪🌟🎉🏆🎊✨💥💯⚡️🌈🎨🎭🎪🎲-]/.test(formattedLine);
      
      // Check if line is numbered list
      const isNumberedList = /^\d+\./.test(formattedLine);
      
      // Check if line is a quote (starts with >)
      const isQuote = line.startsWith('>');
      
      if (isHeading) {
        const headingText = formattedLine.replace(/^#+\s*/, '');
        const HeadingTag = headingLevel === 1 ? 'h1' : 
                          headingLevel === 2 ? 'h2' : 
                          headingLevel === 3 ? 'h3' : 'h4';
        
        return (
          <HeadingTag 
            key={index} 
            className={`font-bold text-foreground ${
              headingLevel === 1 ? 'text-2xl mb-4 mt-6' :
              headingLevel === 2 ? 'text-xl mb-3 mt-5' :
              headingLevel === 3 ? 'text-lg mb-2 mt-4' :
              'text-base mb-2 mt-3'
            } ${index === 0 ? 'mt-0' : ''}`}
          >
            {headingText}
          </HeadingTag>
        );
      }
      
      if (isQuote) {
        const quoteText = formattedLine.replace(/^>\s*/, '');
        return (
          <blockquote 
            key={index} 
            className="border-l-4 border-primary pl-4 italic text-foreground/80 my-4 bg-primary/5 py-2 rounded-r-lg"
          >
            {quoteText}
          </blockquote>
        );
      }
      
      // Special formatting for social media posts
      if (contentType === 'Facebook Post' || contentType === 'Instagram Post' || contentType === 'Twitter Post') {
        // Highlight hashtags
        const withHashtags = formattedLine.replace(/#(\w+)/g, '<span class="text-primary font-semibold">#$1</span>');
        
        return (
          <div 
            key={index} 
            className={`
              ${isBulletPoint ? 'ml-4' : ''} 
              ${isNumberedList ? 'ml-4' : ''}
              ${index > 0 ? 'mt-3' : ''} 
              leading-relaxed text-foreground/90 text-lg
            `}
            dangerouslySetInnerHTML={{ __html: withHashtags }}
          />
        );
      }
      
      return (
        <div key={index} className={`
          ${isBulletPoint ? 'ml-4' : ''} 
          ${isNumberedList ? 'ml-4' : ''}
          ${index > 0 ? 'mt-3' : ''} 
          leading-relaxed text-foreground/90
        `}>
          {formattedLine}
        </div>
      );
    });
  };

  return (
    <div className={`leading-relaxed ${className}`}>
      {formatContent(content)}
    </div>
  );
};