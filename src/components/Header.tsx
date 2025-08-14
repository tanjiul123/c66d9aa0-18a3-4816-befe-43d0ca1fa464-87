import { Zap, TrendingUp } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center mb-12">
      <div className="relative">
        {/* Gradient background blur effect */}
        <div className="absolute inset-0 bg-gradient-primary opacity-10 blur-3xl rounded-full scale-150"></div>
        
        <div className="relative flex items-center justify-center gap-4 mb-6">
          <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow hover:shadow-elegant transition-all duration-300 group">
            <Zap className="h-10 w-10 text-primary-foreground group-hover:scale-110 transition-transform duration-300" />
          </div>
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1">
              ভাইরাল কনটেন্ট মেকার
            </h1>
            <p className="text-base text-muted-foreground font-medium">AI-Powered Bangla Content Creator</p>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-foreground/80 leading-relaxed mb-4">
            AI দিয়ে তৈরি করুন ভাইরাল সোশ্যাল মিডিয়া পোস্ট, ব্লগ আর্টিকেল এবং আকর্ষণীয় কনটেন্ট
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
            <span className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              ভাইরাল পোস্ট
            </span>
            <span className="flex items-center gap-2">🎯 টার্গেটেড অডিয়েন্স</span>
            <span className="flex items-center gap-2">📱 সব প্ল্যাটফর্ম</span>
            <span className="flex items-center gap-2">🚀 ইনস্ট্যান্ট জেনারেশন</span>
          </div>
        </div>
      </div>
    </header>
  );
};