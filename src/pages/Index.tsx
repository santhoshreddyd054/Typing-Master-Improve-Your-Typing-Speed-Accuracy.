import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import heroRocket from "@/assets/hero-rocket.png";
import { Keyboard, Trophy, Target, Zap } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(1);

  const handleStartTest = () => {
    if (!userName.trim()) {
      toast({
        title: "Name required",
        description: "Please enter your name to start the typing test!",
        variant: "destructive",
      });
      return;
    }

    navigate("/test", { state: { userName, level: selectedLevel } });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-[hsl(220,90%,56%)] bg-clip-text text-transparent">
                  Master Your Typing Speed
                </h1>
                <p className="text-xl text-muted-foreground">
                  Challenge yourself with 20 progressive levels and track your improvements in real-time!
                </p>
              </div>

              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Keyboard className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">20 Levels</p>
                    <p className="text-sm text-muted-foreground">Progressive difficulty</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <Target className="text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Real-time Stats</p>
                    <p className="text-sm text-muted-foreground">Track your progress</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Zap className="text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Instant Results</p>
                    <p className="text-sm text-muted-foreground">Detailed feedback</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img 
                src={heroRocket} 
                alt="Typing Speed Test" 
                className="w-full max-w-md mx-auto animate-float"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Setup Section */}
      <div className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <Card className="p-8 shadow-[var(--shadow-card)] animate-fade-in">
          <div className="text-center mb-8">
            <Trophy className="w-16 h-16 mx-auto text-accent mb-4" />
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Ready to Start?
            </h2>
            <p className="text-muted-foreground">
              Enter your name and choose your starting level
            </p>
          </div>

          <div className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <Label htmlFor="userName" className="text-lg font-semibold">
                Your Name
              </Label>
              <Input
                id="userName"
                type="text"
                placeholder="Enter your name..."
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="h-12 text-lg"
                onKeyDown={(e) => e.key === "Enter" && handleStartTest()}
              />
            </div>

            {/* Level Selection */}
            <div className="space-y-3">
              <Label className="text-lg font-semibold">
                Choose Your Level (1-20)
              </Label>
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((level) => (
                  <button
                    key={level}
                    onClick={() => setSelectedLevel(level)}
                    className={`h-14 rounded-lg font-semibold text-lg transition-all ${
                      selectedLevel === level
                        ? "bg-gradient-to-r from-primary to-[hsl(220,90%,56%)] text-primary-foreground shadow-[var(--shadow-primary)] scale-105"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Level {selectedLevel}: {selectedLevel * 30} characters
              </p>
            </div>

            {/* Start Button */}
            <Button
              onClick={handleStartTest}
              variant="hero"
              size="lg"
              className="w-full h-14 text-lg"
            >
              Start Typing Test →
            </Button>
          </div>
        </Card>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card className="p-6 text-center space-y-3 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-primary)] transition-all">
            <div className="w-12 h-12 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-2xl">⏱️</span>
            </div>
            <h3 className="font-semibold text-foreground">5-Second Countdown</h3>
            <p className="text-sm text-muted-foreground">
              Get ready before each test with a countdown timer
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-success)] transition-all">
            <div className="w-12 h-12 mx-auto rounded-full bg-success/10 flex items-center justify-center">
              <span className="text-2xl">💪</span>
            </div>
            <h3 className="font-semibold text-foreground">Motivational Popups</h3>
            <p className="text-sm text-muted-foreground">
              Stay motivated with encouraging messages during tests
            </p>
          </Card>

          <Card className="p-6 text-center space-y-3 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-primary)] transition-all">
            <div className="w-12 h-12 mx-auto rounded-full bg-accent/10 flex items-center justify-center">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold text-foreground">Detailed Results</h3>
            <p className="text-sm text-muted-foreground">
              Get comprehensive stats and feedback after each test
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
