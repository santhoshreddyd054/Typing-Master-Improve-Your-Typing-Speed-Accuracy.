import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import celebrationImage from "@/assets/celebration.png";
import motivationImage from "@/assets/motivation.png";
import { Trophy, Target, AlertCircle, Clock, TrendingUp } from "lucide-react";

interface TestResultsProps {
  wpm: number;
  accuracy: number;
  mistakes: number;
  timeTaken: number;
  level: number;
  totalCharacters: number;
  correctCharacters: number;
  userName: string;
  onRetry: () => void;
  onNextLevel: () => void;
  onHome: () => void;
}

const TestResults = ({
  wpm,
  accuracy,
  mistakes,
  timeTaken,
  level,
  totalCharacters,
  correctCharacters,
  userName,
  onRetry,
  onNextLevel,
  onHome,
}: TestResultsProps) => {
  const getPerformanceMessage = () => {
    if (accuracy >= 95 && wpm >= 60) return "Outstanding! 🏆";
    if (accuracy >= 90 && wpm >= 50) return "Excellent Work! ⭐";
    if (accuracy >= 85 && wpm >= 40) return "Great Job! 🎯";
    if (accuracy >= 75) return "Good Effort! 💪";
    return "Keep Practicing! 📚";
  };

  const getGrade = () => {
    if (accuracy >= 95 && wpm >= 60) return "A+";
    if (accuracy >= 90 && wpm >= 50) return "A";
    if (accuracy >= 85 && wpm >= 40) return "B+";
    if (accuracy >= 80 && wpm >= 35) return "B";
    if (accuracy >= 75) return "C+";
    return "C";
  };

  const getResultImage = () => {
    if (accuracy >= 90 && wpm >= 50) return celebrationImage;
    return motivationImage;
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-4xl w-full space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center space-y-4">
          <img 
            src={getResultImage()} 
            alt="Result" 
            className="w-48 h-48 mx-auto animate-float drop-shadow-2xl"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-[hsl(220,90%,56%)] bg-clip-text text-transparent">
            {getPerformanceMessage()}
          </h1>
          <p className="text-xl text-muted-foreground">
            Well done, {userName}! Here are your results for Level {level}
          </p>
        </div>

        {/* Main Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-6 text-center space-y-2 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-primary)] transition-all">
            <Trophy className="w-12 h-12 mx-auto text-accent" />
            <p className="text-5xl font-bold text-primary">{wpm}</p>
            <p className="text-muted-foreground">Words Per Minute</p>
          </Card>

          <Card className="p-6 text-center space-y-2 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-success)] transition-all">
            <Target className="w-12 h-12 mx-auto text-success" />
            <p className="text-5xl font-bold text-success">{accuracy}%</p>
            <p className="text-muted-foreground">Accuracy</p>
          </Card>

          <Card className="p-6 text-center space-y-2 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-primary)] transition-all">
            <div className="text-6xl font-bold text-primary mx-auto">
              {getGrade()}
            </div>
            <p className="text-muted-foreground">Overall Grade</p>
          </Card>
        </div>

        {/* Detailed Stats */}
        <Card className="p-6 space-y-4 shadow-[var(--shadow-card)]">
          <h2 className="text-2xl font-bold text-foreground mb-4">Detailed Statistics</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <AlertCircle className="w-8 h-8 text-destructive flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-foreground">{mistakes}</p>
                <p className="text-sm text-muted-foreground">Mistakes Made</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <Clock className="w-8 h-8 text-primary flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-foreground">{timeTaken}s</p>
                <p className="text-sm text-muted-foreground">Time Taken</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <TrendingUp className="w-8 h-8 text-success flex-shrink-0" />
              <div>
                <p className="text-2xl font-bold text-foreground">{correctCharacters}</p>
                <p className="text-sm text-muted-foreground">Correct Characters</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
              <div className="w-8 h-8 flex items-center justify-center bg-primary rounded-full text-primary-foreground font-bold flex-shrink-0">
                {level}
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalCharacters}</p>
                <p className="text-sm text-muted-foreground">Total Characters</p>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 mt-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completion Progress</span>
              <span className="font-semibold text-foreground">{accuracy}%</span>
            </div>
            <div className="h-4 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success to-primary transition-all duration-1000 rounded-full"
                style={{ width: `${accuracy}%` }}
              />
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={onRetry} variant="outline" size="lg">
            Retry Level {level}
          </Button>
          {level < 20 && (
            <Button onClick={onNextLevel} variant="hero" size="lg">
              Continue to Level {level + 1} →
            </Button>
          )}
          <Button onClick={onHome} variant="secondary" size="lg">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TestResults;
