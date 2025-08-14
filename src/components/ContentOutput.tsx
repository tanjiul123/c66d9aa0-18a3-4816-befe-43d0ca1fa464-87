import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from './CopyButton';
import { FormattedContent } from './FormattedContent';
import { 
  BookOpen, 
  Hash, 
  Target, 
  TrendingUp, 
  MessageSquare, 
  Share2, 
  FileText,
  Newspaper,
  Download,
  Eye
} from 'lucide-react';
import { ContentResult } from '@/services/geminiService';

interface ContentOutputProps {
  result: ContentResult;
}

export const ContentOutput = ({ result }: ContentOutputProps) => {
  const { type, title, content, hashtags, keywords, engagementTips, estimatedReach } = result;

  const getTypeIcon = () => {
    switch (type) {
      case 'Facebook Post':
        return <MessageSquare className="h-6 w-6 text-white" />;
      case 'Instagram Post':
        return <Share2 className="h-6 w-6 text-white" />;
      case 'Twitter Post':
        return <MessageSquare className="h-6 w-6 text-white" />;
      case 'Blog Article':
        return <FileText className="h-6 w-6 text-white" />;
      case 'News Article':
        return <Newspaper className="h-6 w-6 text-white" />;
      default:
        return <BookOpen className="h-6 w-6 text-primary-foreground" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'Facebook Post':
        return '📘 ফেসবুক পোস্ট';
      case 'Instagram Post':
        return '📸 ইনস্টাগ্রাম পোস্ট';
      case 'Twitter Post':
        return '🐦 টুইটার পোস্ট';
      case 'Blog Article':
        return '📝 ব্লগ আর্টিকেল';
      case 'News Article':
        return '📰 নিউজ আর্টিকেল';
      default:
        return '📝 কনটেন্ট';
    }
  };

  const downloadContent = () => {
    const fullContent = `${title}\n\n${content}\n\nহ্যাশট্যাগ:\n${hashtags.map(tag => `#${tag}`).join(' ')}\n\nকীওয়ার্ড:\n${keywords.join(', ')}`;
    
    const element = document.createElement('a');
    const file = new Blob([fullContent], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${title.substring(0, 30)}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-8">
      {/* Content Title */}
      <Card className="p-8 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-soft">
              {getTypeIcon()}
            </div>
            <h3 className="text-xl font-bold text-foreground">{getTypeLabel()} শিরোনাম</h3>
          </div>
          
          <div className="bg-background/80 p-6 rounded-xl mb-6 border border-border/50 backdrop-blur-sm shadow-soft">
            <h1 className="text-2xl font-bold text-foreground leading-relaxed">{title}</h1>
          </div>
          
          <div className="flex gap-3">
            <CopyButton text={title} />
            <Button
              onClick={downloadContent}
              variant="outline"
              size="sm"
              className="gap-2 bg-gradient-card border-border hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300"
            >
              <Download className="h-4 w-4" />
              ডাউনলোড
            </Button>
          </div>
        </div>
      </Card>

      {/* Content Body */}
      <Card className="p-8 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-social rounded-xl shadow-soft">
                {getTypeIcon()}
              </div>
              <h3 className="text-xl font-bold text-foreground">{getTypeLabel()} কনটেন্ট</h3>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Eye className="h-4 w-4" />
              <span>{estimatedReach}</span>
            </div>
          </div>
          
          <div className="bg-background/80 p-8 rounded-xl border border-border/50 backdrop-blur-sm shadow-soft min-h-[400px]">
            <div className="flex justify-between items-start mb-6">
              <Badge variant="default" className="bg-gradient-primary text-primary-foreground">
                {getTypeLabel()}
              </Badge>
              <CopyButton text={content} />
            </div>
            
            <FormattedContent content={content} contentType={type} />
          </div>
        </div>
      </Card>

      {/* Hashtags & Keywords */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Hashtags */}
        <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-accent rounded-lg shadow-soft">
                <Hash className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground"># হ্যাশট্যাগ</h3>
            </div>
            
            <div className="bg-background/80 p-4 rounded-lg mb-4 border border-border/50 backdrop-blur-sm">
              <div className="flex flex-wrap gap-2">
                {hashtags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                    onClick={() => navigator.clipboard.writeText(`#${tag}`)}
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
            
            <CopyButton text={hashtags.map(tag => `#${tag}`).join(' ')} label="সব হ্যাশট্যাগ কপি" />
          </div>
        </Card>

        {/* Keywords */}
        <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-soft">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground">🎯 কীওয়ার্ড</h3>
            </div>
            
            <div className="bg-background/80 p-4 rounded-lg mb-4 border border-border/50 backdrop-blur-sm">
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                    onClick={() => navigator.clipboard.writeText(keyword)}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <CopyButton text={keywords.join(', ')} label="সব কীওয়ার্ড কপি" />
          </div>
        </Card>
      </div>

      {/* Engagement Tips */}
      <Card className="p-8 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-accent rounded-xl shadow-soft">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground">🚀 এনগেজমেন্ট বাড়ানোর টিপস</h3>
          </div>
          
          <div className="bg-background/80 p-6 rounded-xl mb-6 border border-border/50 backdrop-blur-sm shadow-soft">
            <div className="space-y-4">
              {engagementTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-background/50 transition-colors duration-200">
                  <div className="p-1.5 bg-gradient-primary rounded-full mt-1 flex-shrink-0">
                    <span className="block w-2 h-2 bg-primary-foreground rounded-full"></span>
                  </div>
                  <span className="text-base leading-relaxed text-foreground/90">{tip}</span>
                </div>
              ))}
            </div>
          </div>
          
          <CopyButton text={engagementTips.join('\n')} label="সব টিপস কপি করুন" />
        </div>
      </Card>
    </div>
  );
};