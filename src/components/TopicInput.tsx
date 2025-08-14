import { useState, useEffect } from 'react';
import { Send, Loader2, TrendingUp, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ContentType, ContentTone, AudienceType, ContentRequest } from '@/services/geminiService';

interface TopicInputProps {
  onGenerate: (request: ContentRequest) => void;
  isLoading: boolean;
  onGetTrendingTopics: () => Promise<string[]>;
}

export const TopicInput = ({ onGenerate, isLoading, onGetTrendingTopics }: TopicInputProps) => {
  const [topic, setTopic] = useState('');
  const [contentType, setContentType] = useState<ContentType>('Facebook Post');
  const [tone, setTone] = useState<ContentTone>('Friendly');
  const [audience, setAudience] = useState<AudienceType>('General Public');
  const [wordCount, setWordCount] = useState<'Short' | 'Medium' | 'Long'>('Medium');
  const [trendingTopics, setTrendingTopics] = useState<string[]>([]);
  const [loadingTrends, setLoadingTrends] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (topic.trim() && contentType && tone && audience) {
      onGenerate({
        topic: topic.trim(),
        contentType,
        tone,
        audience,
        wordCount,
        includeHashtags: true,
        includeEmojis: true
      });
    }
  };

  const loadTrendingTopics = async () => {
    setLoadingTrends(true);
    try {
      const topics = await onGetTrendingTopics();
      setTrendingTopics(topics);
    } catch (error) {
      console.error('Error loading trending topics:', error);
    } finally {
      setLoadingTrends(false);
    }
  };

  useEffect(() => {
    loadTrendingTopics();
  }, []);

  const getContentTypeIcon = (type: ContentType) => {
    switch (type) {
      case 'Facebook Post':
        return '📘';
      case 'Instagram Post':
        return '📸';
      case 'Twitter Post':
        return '🐦';
      case 'Blog Article':
        return '📝';
      case 'News Article':
        return '📰';
      default:
        return '📝';
    }
  };

  const getToneIcon = (toneType: ContentTone) => {
    switch (toneType) {
      case 'Professional':
        return '💼';
      case 'Friendly':
        return '😊';
      case 'Humorous':
        return '😄';
      case 'Motivational':
        return '🔥';
      case 'Storytelling':
        return '📚';
      default:
        return '😊';
    }
  };

  const getAudienceIcon = (audienceType: AudienceType) => {
    switch (audienceType) {
      case 'General Public':
        return '👥';
      case 'Students':
        return '🎓';
      case 'Professionals':
        return '💼';
      case 'Entrepreneurs':
        return '🚀';
      case 'Youth':
        return '🌟';
      default:
        return '👥';
    }
  };

  return (
    <Card className="p-8 bg-gradient-card border-border shadow-card hover:shadow-elegant transition-all duration-300 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-subtle opacity-50 pointer-events-none"></div>
      
      <form onSubmit={handleSubmit} className="space-y-6 relative">
        <div className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Sparkles className="h-6 w-6 text-primary-foreground" />
            </div>
            <label htmlFor="topic" className="text-xl font-semibold text-foreground">
              ভাইরাল কনটেন্ট তৈরি করুন
            </label>
          </div>

          {/* Content Type Selection */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">কনটেন্ট টাইপ</label>
              <Select value={contentType} onValueChange={(value: ContentType) => setContentType(value)}>
                <SelectTrigger className="h-12 bg-background/70 border-border focus:ring-primary focus:border-primary transition-all duration-200 text-base backdrop-blur-sm">
                  <SelectValue placeholder="কনটেন্ট টাইপ নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Facebook Post">
                    <div className="flex items-center gap-2">
                      <span>📘</span>
                      <span>ফেসবুক পোস্ট</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Instagram Post">
                    <div className="flex items-center gap-2">
                      <span>📸</span>
                      <span>ইনস্টাগ্রাম পোস্ট</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Twitter Post">
                    <div className="flex items-center gap-2">
                      <span>🐦</span>
                      <span>টুইটার/এক্স পোস্ট</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Blog Article">
                    <div className="flex items-center gap-2">
                      <span>📝</span>
                      <span>ব্লগ আর্টিকেল</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="News Article">
                    <div className="flex items-center gap-2">
                      <span>📰</span>
                      <span>নিউজ আর্টিকেল</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">টোন/স্টাইল</label>
              <Select value={tone} onValueChange={(value: ContentTone) => setTone(value)}>
                <SelectTrigger className="h-12 bg-background/70 border-border focus:ring-primary focus:border-primary transition-all duration-200 text-base backdrop-blur-sm">
                  <SelectValue placeholder="টোন নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professional">
                    <div className="flex items-center gap-2">
                      <span>💼</span>
                      <span>প্রফেশনাল</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Friendly">
                    <div className="flex items-center gap-2">
                      <span>😊</span>
                      <span>বন্ধুত্বপূর্ণ</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Humorous">
                    <div className="flex items-center gap-2">
                      <span>😄</span>
                      <span>হাস্যরসাত্মক</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Motivational">
                    <div className="flex items-center gap-2">
                      <span>🔥</span>
                      <span>অনুপ্রেরণামূলক</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Storytelling">
                    <div className="flex items-center gap-2">
                      <span>📚</span>
                      <span>গল্পের ছলে</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">টার্গেট অডিয়েন্স</label>
              <Select value={audience} onValueChange={(value: AudienceType) => setAudience(value)}>
                <SelectTrigger className="h-12 bg-background/70 border-border focus:ring-primary focus:border-primary transition-all duration-200 text-base backdrop-blur-sm">
                  <SelectValue placeholder="অডিয়েন্স নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="General Public">
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span>সাধারণ মানুষ</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Students">
                    <div className="flex items-center gap-2">
                      <span>🎓</span>
                      <span>শিক্ষার্থী</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Professionals">
                    <div className="flex items-center gap-2">
                      <span>💼</span>
                      <span>পেশাদার</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Entrepreneurs">
                    <div className="flex items-center gap-2">
                      <span>🚀</span>
                      <span>উদ্যোক্তা</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Youth">
                    <div className="flex items-center gap-2">
                      <span>🌟</span>
                      <span>তরুণ প্রজন্ম</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">কনটেন্ট দৈর্ঘ্য</label>
              <Select value={wordCount} onValueChange={(value: 'Short' | 'Medium' | 'Long') => setWordCount(value)}>
                <SelectTrigger className="h-12 bg-background/70 border-border focus:ring-primary focus:border-primary transition-all duration-200 text-base backdrop-blur-sm">
                  <SelectValue placeholder="দৈর্ঘ্য নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Short">
                    <div className="flex items-center gap-2">
                      <span>⚡</span>
                      <span>ছোট (১০০-৩০০ শব্দ)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Medium">
                    <div className="flex items-center gap-2">
                      <span>📝</span>
                      <span>মাঝারি (৩০০-৮০০ শব্দ)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="Long">
                    <div className="flex items-center gap-2">
                      <span>📚</span>
                      <span>বড় (৮০০+ শব্দ)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Topic Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">টপিক লিখুন</label>
            <div className="flex gap-3">
              <Input
                id="topic"
                type="text"
                placeholder="যেমন: ডিজিটাল মার্কেটিং এর ভবিষ্যৎ..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="flex-1 h-12 bg-background/70 border-border focus:ring-primary focus:border-primary transition-all duration-200 text-base backdrop-blur-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!topic.trim() || !contentType || isLoading}
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 px-6 h-12 font-semibold disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
                <span className="ml-2">
                  {getContentTypeIcon(contentType)} তৈরি করুন
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Trending Topics */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <p className="text-base font-medium text-muted-foreground">ট্রেন্ডিং টপিক</p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={loadTrendingTopics}
              disabled={loadingTrends}
              className="text-xs"
            >
              {loadingTrends ? (
                <Loader2 className="h-3 w-3 animate-spin mr-1" />
              ) : (
                <TrendingUp className="h-3 w-3 mr-1" />
              )}
              রিফ্রেশ
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {trendingTopics.map((trendTopic, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-200 px-3 py-1"
                onClick={() => setTopic(trendTopic)}
              >
                {trendTopic}
              </Badge>
            ))}
          </div>
        </div>
      </form>
    </Card>
  );
};