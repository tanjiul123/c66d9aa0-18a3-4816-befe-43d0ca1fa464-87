import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CopyButton } from './CopyButton';
import { FormattedContent } from './FormattedContent';
import { 
  Lightbulb, 
  FileText, 
  GraduationCap, 
  Target, 
  BookOpen, 
  Download,
  List
} from 'lucide-react';
import { ContentResult } from '@/services/geminiService';

interface ContentOutputProps {
  result: ContentResult;
}

export const ContentOutput = ({ result }: ContentOutputProps) => {
  const { type, title, content, sections, keywords, tips, estimatedLength } = result;

  const getTypeIcon = () => {
    switch (type) {
      case 'Project Ideas':
        return <Lightbulb className="h-6 w-6 text-white" />;
      case 'Project Report':
        return <FileText className="h-6 w-6 text-white" />;
      case 'Assignment Solution':
        return <GraduationCap className="h-6 w-6 text-white" />;
      default:
        return <FileText className="h-6 w-6 text-white" />;
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case 'Project Ideas':
        return '💡 Project Ideas';
      case 'Project Report':
        return '📋 Project Report';
      case 'Assignment Solution':
        return '📚 Assignment Solution';
      default:
        return '📝 Content';
    }
  };

  const getGradient = () => {
    switch (type) {
      case 'Project Ideas':
        return 'bg-gradient-primary';
      case 'Project Report':
        return 'bg-gradient-accent';
      case 'Assignment Solution':
        return 'bg-gradient-primary';
      default:
        return 'bg-gradient-primary';
    }
  };

  const downloadContent = () => {
    const fullContent = `${title}\n\n${content}\n\nKeywords:\n${keywords.join(', ')}\n\nTips:\n${tips.join('\n')}`;
    
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
      {/* Title Card */}
      <Card className="p-8 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className={`p-3 ${getGradient()} rounded-xl shadow-glow`}>
              {getTypeIcon()}
            </div>
            <h3 className="text-xl font-bold text-foreground">{getTypeLabel()}</h3>
          </div>
          
          <div className="bg-background/80 p-6 rounded-xl mb-6 border border-border/50 backdrop-blur-sm shadow-soft">
            <h1 className="text-3xl font-bold text-foreground leading-relaxed">{title}</h1>
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
              Download
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Content Card */}
      <Card className="p-8 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none"></div>
        
        <div className="relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className={`p-3 ${getGradient()} rounded-xl shadow-glow`}>
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Content</h3>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{estimatedLength}</span>
            </div>
          </div>
          
          <div className="bg-background/80 p-8 rounded-xl border border-border/50 backdrop-blur-sm shadow-soft">
            <div className="flex justify-between items-start mb-6">
              <Badge variant="default" className={`${getGradient()} text-white`}>
                {getTypeLabel()}
              </Badge>
              <CopyButton text={content} />
            </div>
            
            <FormattedContent content={content} contentType={type} />
          </div>
        </div>
      </Card>

      {/* Sections & Keywords */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sections */}
        <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-soft">
                <List className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Sections</h3>
            </div>
            
            <div className="bg-background/80 p-4 rounded-lg mb-4 border border-border/50 backdrop-blur-sm">
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-background/50 transition-colors"
                  >
                    <span className="text-primary font-bold">{index + 1}.</span>
                    <span className="text-foreground/90">{section}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <CopyButton text={sections.join('\n')} label="Copy Sections" />
          </div>
        </Card>

        {/* Keywords */}
        <Card className="p-6 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none"></div>
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-accent rounded-lg shadow-glow-red">
                <Target className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Keywords</h3>
            </div>
            
            <div className="bg-background/80 p-4 rounded-lg mb-4 border border-border/50 backdrop-blur-sm">
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-all duration-200 border-accent/30"
                    onClick={() => navigator.clipboard.writeText(keyword)}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </div>
            
            <CopyButton text={keywords.join(', ')} label="Copy Keywords" />
          </div>
        </Card>
      </div>

      {/* Tips Card */}
      <Card className="p-8 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-subtle opacity-30 pointer-events-none"></div>
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <Lightbulb className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-foreground">💡 Helpful Tips</h3>
          </div>
          
          <div className="bg-background/80 p-6 rounded-xl mb-6 border border-border/50 backdrop-blur-sm shadow-soft">
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-background/50 transition-colors duration-200">
                  <div className="p-1.5 bg-gradient-primary rounded-full mt-1 flex-shrink-0">
                    <span className="block w-2 h-2 bg-white rounded-full"></span>
                  </div>
                  <span className="text-base leading-relaxed text-foreground/90">{tip}</span>
                </div>
              ))}
            </div>
          </div>
          
          <CopyButton text={tips.join('\n')} label="Copy All Tips" />
        </div>
      </Card>
    </div>
  );
};
