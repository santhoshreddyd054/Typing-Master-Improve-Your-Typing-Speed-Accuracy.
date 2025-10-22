import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CountdownTimer from "@/components/CountdownTimer";
import TestResults from "@/components/TestResults";
import { getRandomText } from "@/data/testTexts";
import { Home, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const TypingTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userName, level } = location.state || { userName: "User", level: 1 };
  
  const [showCountdown, setShowCountdown] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [testText, setTestText] = useState(() => getRandomText(level));
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location.state, navigate]);

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setTestStarted(true);
    setStartTime(Date.now());
    inputRef.current?.focus();
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;
    setUserInput(input);

    // Count mistakes
    let mistakeCount = 0;
    for (let i = 0; i < input.length; i++) {
      if (input[i] !== testText[i]) {
        mistakeCount++;
      }
    }
    setMistakes(mistakeCount);
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    toast({
      title: "Pasting not allowed",
      description: "Please type the text manually!",
      variant: "destructive",
    });
  };

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
  };

  const calculateResults = () => {
    const timeTaken = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;
    const correctCharacters = userInput.split('').filter((char, index) => char === testText[index]).length;
    const accuracy = Math.round((correctCharacters / testText.length) * 100);
    const wpm = Math.round((correctCharacters / 5) / (timeTaken / 60));

    return {
      wpm: isNaN(wpm) || !isFinite(wpm) ? 0 : wpm,
      accuracy: isNaN(accuracy) ? 0 : accuracy,
      mistakes,
      timeTaken,
      correctCharacters,
    };
  };

  const handleFinish = () => {
    if (userInput.length === 0) {
      toast({
        title: "No input detected",
        description: "Please type something before finishing!",
        variant: "destructive",
      });
      return;
    }
    setTestFinished(true);
  };

  const handleRetry = () => {
    setUserInput("");
    setMistakes(0);
    setTestFinished(false);
    setTestStarted(false);
    setShowCountdown(true);
    setStartTime(null);
    setTestText(getRandomText(level)); // Get new random text
  };

  const handleNextLevel = () => {
    if (level < 20) {
      navigate("/test", { state: { userName, level: level + 1 }, replace: true });
      handleRetry();
    }
  };

  const handleHome = () => {
    navigate("/");
  };

  if (testFinished) {
    const results = calculateResults();
    return (
      <TestResults
        {...results}
        level={level}
        totalCharacters={testText.length}
        userName={userName}
        onRetry={handleRetry}
        onNextLevel={handleNextLevel}
        onHome={handleHome}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      {showCountdown && <CountdownTimer onComplete={handleCountdownComplete} />}

      <div className="max-w-4xl mx-auto space-y-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-[hsl(220,90%,56%)] bg-clip-text text-transparent">
              Level {level} Challenge
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {userName}! Type the text below accurately.
            </p>
          </div>
          <Button onClick={handleHome} variant="outline" size="sm">
            <Home className="mr-2" />
            Home
          </Button>
        </div>

        {/* Stats Bar */}
        <Card className="p-4 shadow-[var(--shadow-card)]">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-primary">{testText.length}</p>
              <p className="text-sm text-muted-foreground">Characters</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-destructive">{mistakes}</p>
              <p className="text-sm text-muted-foreground">Mistakes</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-success">
                {Math.round((userInput.split('').filter((char, index) => char === testText[index]).length / testText.length) * 100) || 0}%
              </p>
              <p className="text-sm text-muted-foreground">Accuracy</p>
            </div>
          </div>
        </Card>

        {/* Test Text Display */}
        <Card className="p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-accent" />
            <h2 className="text-xl font-semibold text-foreground">Type this text:</h2>
          </div>
          <div 
            className="text-xl leading-relaxed p-4 bg-muted rounded-lg mb-6 min-h-[150px] select-none"
            onCopy={handleCopy}
            onContextMenu={(e) => e.preventDefault()}
          >
            <p className="text-foreground whitespace-pre-wrap">{testText}</p>
          </div>

          {/* Input Area */}
          <div className="space-y-4">
            <textarea
              ref={inputRef}
              value={userInput}
              onChange={handleInputChange}
              onPaste={handlePaste}
              onCopy={handleCopy}
              disabled={!testStarted || testFinished}
              className="w-full h-40 p-4 text-xl font-mono bg-background border-2 border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none disabled:opacity-50"
              placeholder={testStarted ? "Start typing here..." : "Test will start after countdown..."}
            />

            <div className="flex justify-end">
              <Button
                onClick={handleFinish}
                disabled={!testStarted || userInput.length === 0}
                variant="success"
                size="lg"
              >
                Finish Test
              </Button>
            </div>
          </div>
        </Card>

        {/* Progress Indicator */}
        <Card className="p-4 shadow-[var(--shadow-card)]">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-foreground">
                {userInput.length} / {testText.length} characters
              </span>
            </div>
            <div className="h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-[hsl(220,90%,56%)] transition-all duration-300"
                style={{ width: `${Math.min((userInput.length / testText.length) * 100, 100)}%` }}
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TypingTest;
