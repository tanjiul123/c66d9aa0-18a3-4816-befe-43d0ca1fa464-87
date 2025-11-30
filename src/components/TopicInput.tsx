import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Wand2, Lightbulb } from 'lucide-react';
import { ContentRequest, ContentType, ContentTone, AudienceType } from '@/services/geminiService';
import { toast } from 'sonner';

interface TopicInputProps {
  onGenerate: (request: ContentRequest) => void;
  isLoading: boolean;
  onGetSuggestedTopics: () => Promise<string[]>;
}

export const TopicInput = ({ onGenerate, isLoading, onGetSuggestedTopics }: TopicInputProps) => {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState<ContentType>('Project Ideas');
  const [tone, setTone] = useState<ContentTone>('Professional');
  const [audience, setAudience] = useState<AudienceType>('Students');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [suggestedTopics, setSuggestedTopics] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!topic.trim()) {
      toast.error('Please enter a topic');
      return;
    }

    onGenerate({
      topic: topic.trim(),
      contentType,
      tone,
      audience,
      additionalDetails: additionalDetails.trim()
    });
  };

  const handleGetSuggestions = async () => {
    setIsLoadingSuggestions(true);
    try {
      const topics = await onGetSuggestedTopics();
      setSuggestedTopics(topics);
      toast.success('Topic suggestions loaded!');
    } catch (error) {
      toast.error('Failed to load suggestions');
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleTopicClick = (suggestedTopic: string) => {
    setTopic(suggestedTopic);
    toast.success(`Topic selected: ${suggestedTopic}`);
  };

  return (
    <Card className="p-8 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-subtle opacity-40 pointer-events-none"></div>
      
      <div className="relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Topic Input */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="topic" className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Enter Your Topic
              </Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleGetSuggestions}
                disabled={isLoadingSuggestions}
                className="bg-gradient-primary/10 border-primary/30 hover:bg-gradient-primary hover:text-primary-foreground transition-all"
              >
                <Wand2 className="h-4 w-4 mr-2" />
                {isLoadingSuggestions ? 'Loading...' : 'Get Suggestions'}
              </Button>
            </div>
            
            <Textarea
              id="topic"
              placeholder="E.g., Machine Learning in Healthcare, Smart Home Automation System, Climate Change Analysis..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="min-h-[100px] bg-background/80 border-border focus:ring-primary focus:border-primary transition-all backdrop-blur-sm resize-none text-base"
            />
          </div>

          {/* Suggested Topics */}
          {suggestedTopics.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium text-muted-foreground">Suggested Topics (Click to use)</Label>
              <div className="flex flex-wrap gap-2">
                {suggestedTopics.map((suggestedTopic, index) => (
                  <Button
                    key={index}
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleTopicClick(suggestedTopic)}
                    className="bg-gradient-card border-border hover:bg-gradient-primary hover:text-primary-foreground transition-all"
                  >
                    {suggestedTopic}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Content Type */}
          <div className="space-y-3">
            <Label htmlFor="contentType" className="text-base font-semibold text-foreground">
              Content Type
            </Label>
            <Select value={contentType} onValueChange={(value) => setContentType(value as ContentType)}>
              <SelectTrigger className="bg-background/80 border-border focus:ring-primary backdrop-blur-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Project Ideas">💡 Project Ideas</SelectItem>
                <SelectItem value="Project Report">📋 Project Report</SelectItem>
                <SelectItem value="Assignment Solution">📚 Assignment Solution</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Tone & Audience */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="tone" className="text-base font-semibold text-foreground">
                Tone
              </Label>
              <Select value={tone} onValueChange={(value) => setTone(value as ContentTone)}>
                <SelectTrigger className="bg-background/80 border-border focus:ring-primary backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional">Professional</SelectItem>
                  <SelectItem value="Academic">Academic</SelectItem>
                  <SelectItem value="Creative">Creative</SelectItem>
                  <SelectItem value="Technical">Technical</SelectItem>
                  <SelectItem value="Detailed">Detailed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label htmlFor="audience" className="text-base font-semibold text-foreground">
                Target Audience
              </Label>
              <Select value={audience} onValueChange={(value) => setAudience(value as AudienceType)}>
                <SelectTrigger className="bg-background/80 border-border focus:ring-primary backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Students">Students</SelectItem>
                  <SelectItem value="Researchers">Researchers</SelectItem>
                  <SelectItem value="Professionals">Professionals</SelectItem>
                  <SelectItem value="Beginners">Beginners</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-3">
            <Label htmlFor="details" className="text-base font-semibold text-foreground">
              Additional Details (Optional)
            </Label>
            <Textarea
              id="details"
              placeholder="Add any specific requirements, constraints, or focus areas..."
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="min-h-[80px] bg-background/80 border-border focus:ring-primary focus:border-primary transition-all backdrop-blur-sm resize-none text-base"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isLoading || !topic.trim()}
            size="lg"
            className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300 h-14 text-lg font-semibold disabled:opacity-50"
          >
            <Sparkles className="h-6 w-6 mr-2" />
            {isLoading ? 'Generating...' : 'Generate Content'}
          </Button>
        </form>
      </div>
    </Card>
  );
};
