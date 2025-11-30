import { Lightbulb, FileText, GraduationCap } from 'lucide-react';

export const Header = () => {
  return (
    <header className="text-center mb-16 relative">
      <div className="inline-flex items-center gap-3 mb-6 bg-gradient-hero p-4 rounded-2xl backdrop-blur-sm border border-border/30">
        <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
          <Lightbulb className="h-8 w-8 text-primary-foreground" />
        </div>
        <div className="p-3 bg-gradient-accent rounded-xl shadow-glow-red">
          <FileText className="h-8 w-8 text-accent-foreground" />
        </div>
        <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
          <GraduationCap className="h-8 w-8 text-primary-foreground" />
        </div>
      </div>
      
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight tracking-tight">
        Project & Study Generator
      </h1>
      
      <p className="text-xl md:text-2xl text-foreground/80 max-w-3xl mx-auto leading-relaxed">
        Generate innovative project ideas, comprehensive reports, and detailed assignment solutions
      </p>
      
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-primary/20 rounded-full border border-primary/30">
          <Lightbulb className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Creative Ideas</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-accent/20 rounded-full border border-accent/30">
          <FileText className="h-5 w-5 text-accent" />
          <span className="text-sm font-medium text-foreground">Detailed Reports</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-primary/20 rounded-full border border-primary/30">
          <GraduationCap className="h-5 w-5 text-primary" />
          <span className="text-sm font-medium text-foreground">Complete Solutions</span>
        </div>
      </div>
    </header>
  );
};
