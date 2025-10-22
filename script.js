// Typing Speed Test Application
class TypingSpeedTest {
    constructor() {
        this.currentLevel = 1;
        this.maxLevel = 20;
        this.charactersPerLevel = 30;
        this.currentText = '';
        this.userInput = '';
        this.startTime = null;
        this.endTime = null;
        this.mistakes = 0;
        this.isTestActive = false;
        this.countdownInterval = null;
        this.testInterval = null;
        this.username = '';
        
        this.motivationalMessages = [
            "You've got this! Focus and type fast!",
            "Amazing! Keep up the great work!",
            "You're doing fantastic! Don't stop!",
            "Incredible speed! You're on fire!",
            "Outstanding! You're a typing master!",
            "Brilliant! Keep that momentum going!",
            "Excellent! You're unstoppable!",
            "Phenomenal! You're breaking records!",
            "Spectacular! You're a typing legend!",
            "Magnificent! You're absolutely crushing it!"
        ];
        
        this.achievementMessages = [
            "You're doing amazing!",
            "Fantastic typing skills!",
            "You're a speed demon!",
            "Incredible accuracy!",
            "You're unstoppable!",
            "Outstanding performance!",
            "You're a typing master!",
            "Brilliant work!",
            "You're on fire!",
            "Phenomenal skills!"
        ];
        
        this.cartoonCharacters = ['🎯', '🚀', '⭐', '🏆', '💎', '🔥', '⚡', '🌟', '🎊', '🎉'];
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.generateText();
    }
    
    bindEvents() {
        // Homepage events
        document.getElementById('startTest').addEventListener('click', () => this.startTest());
        document.getElementById('username').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.startTest();
        });
        document.getElementById('helpBtn').addEventListener('click', () => this.showHelp());
        document.getElementById('closeHelp').addEventListener('click', () => this.hideHelp());
        
        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('helpModal');
            if (e.target === modal) {
                this.hideHelp();
            }
        });
        
        // Test page events
        document.getElementById('homeBtn').addEventListener('click', () => this.goHome());
        document.getElementById('finishBtn').addEventListener('click', () => this.finishTest());
        document.getElementById('userInput').addEventListener('input', (e) => this.handleInput(e));
        
        // Results page events
        document.getElementById('nextLevelBtn').addEventListener('click', () => this.nextLevel());
        document.getElementById('retryBtn').addEventListener('click', () => this.retryLevel());
        document.getElementById('homeFromResultsBtn').addEventListener('click', () => this.goHome());
    }
    
    startTest() {
        const usernameInput = document.getElementById('username');
        this.username = usernameInput.value.trim();
        
        if (!this.username) {
            alert('Please enter your name to start the test!');
            usernameInput.focus();
            return;
        }
        
        this.showPage('testPage');
        this.startCountdown();
    }
    
    startCountdown() {
        let countdown = 5;
        const countdownElement = document.getElementById('countdownNumber');
        const countdownContainer = document.getElementById('countdown');
        const testTimer = document.getElementById('testTimer');
        
        // Show motivation popup
        this.showMotivationPopup();
        
        this.countdownInterval = setInterval(() => {
            countdownElement.textContent = countdown;
            
            if (countdown <= 0) {
                clearInterval(this.countdownInterval);
                countdownContainer.style.display = 'none';
                testTimer.classList.remove('hidden');
                this.startTypingTest();
            }
            countdown--;
        }, 1000);
    }
    
    showMotivationPopup() {
        const popup = document.getElementById('motivationPopup');
        const userNameDisplay = document.getElementById('userNameDisplay');
        const motivationText = document.getElementById('motivationText');
        const motivationSubtext = document.getElementById('motivationSubtext');
        
        userNameDisplay.textContent = this.username;
        motivationSubtext.textContent = this.motivationalMessages[Math.floor(Math.random() * this.motivationalMessages.length)];
        
        popup.style.display = 'block';
        
        // Hide popup after 3 seconds
        setTimeout(() => {
            popup.style.display = 'none';
        }, 3000);
    }
    
    startTypingTest() {
        this.isTestActive = true;
        this.startTime = Date.now();
        this.userInput = '';
        this.mistakes = 0;
        
        const userInputElement = document.getElementById('userInput');
        userInputElement.disabled = false;
        userInputElement.focus();
        
        // Start test timer
        this.testInterval = setInterval(() => {
            this.updateTestTimer();
        }, 100);
        
        this.updateDisplay();
    }
    
    updateTestTimer() {
        if (!this.startTime) return;
        
        const elapsed = Date.now() - this.startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        
        document.getElementById('timerDisplay').textContent = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    handleInput(e) {
        if (!this.isTestActive) return;
        
        this.userInput = e.target.value;
        this.checkProgress();
        this.updateDisplay();
        
        // Check if test is complete
        if (this.userInput.length >= this.currentText.length) {
            this.finishTest();
        }
    }
    
    checkProgress() {
        let mistakes = 0;
        const userText = this.userInput;
        const targetText = this.currentText;
        
        for (let i = 0; i < userText.length; i++) {
            if (userText[i] !== targetText[i]) {
                mistakes++;
            }
        }
        
        this.mistakes = mistakes;
    }
    
    updateDisplay() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        const textToType = document.getElementById('textToType');
        const finishBtn = document.getElementById('finishBtn');
        
        // Update progress
        const progress = (this.userInput.length / this.currentText.length) * 100;
        progressFill.style.width = `${progress}%`;
        progressText.textContent = `${this.userInput.length} / ${this.currentText.length} characters`;
        
        // Update text display with highlighting
        this.highlightText();
        
        // Show finish button when user has typed something
        if (this.userInput.length > 0) {
            finishBtn.classList.remove('hidden');
        } else {
            finishBtn.classList.add('hidden');
        }
    }
    
    highlightText() {
        const textToType = document.getElementById('textToType');
        const userText = this.userInput;
        const targetText = this.currentText;
        
        let html = '';
        
        for (let i = 0; i < targetText.length; i++) {
            if (i < userText.length) {
                if (userText[i] === targetText[i]) {
                    html += `<span class="correct">${targetText[i]}</span>`;
                } else {
                    html += `<span class="incorrect">${targetText[i]}</span>`;
                }
            } else if (i === userText.length) {
                html += `<span class="current">${targetText[i]}</span>`;
            } else {
                html += targetText[i];
            }
        }
        
        textToType.innerHTML = html;
    }
    
    finishTest() {
        if (!this.isTestActive) return;
        
        this.isTestActive = false;
        this.endTime = Date.now();
        
        clearInterval(this.testInterval);
        
        // Disable input
        document.getElementById('userInput').disabled = true;
        
        // Calculate results
        const results = this.calculateResults();
        this.showResults(results);
    }
    
    calculateResults() {
        const timeTaken = (this.endTime - this.startTime) / 1000; // in seconds
        const charactersTyped = this.userInput.length;
        const wordsTyped = charactersTyped / 5; // Standard: 5 characters = 1 word
        const wpm = Math.round((wordsTyped / timeTaken) * 60);
        const accuracy = Math.round(((charactersTyped - this.mistakes) / charactersTyped) * 100);
        const cps = Math.round((charactersTyped / timeTaken) * 100) / 100;
        
        return {
            wpm: Math.max(0, wpm),
            accuracy: Math.max(0, accuracy),
            timeTaken: Math.round(timeTaken * 100) / 100,
            charactersTyped,
            mistakes: this.mistakes,
            level: this.currentLevel,
            cps
        };
    }
    
    showResults(results) {
        this.showPage('resultsPage');
        
        // Update result displays
        document.getElementById('resultsUserName').textContent = this.username;
        document.getElementById('wpm').textContent = results.wpm;
        document.getElementById('accuracy').textContent = `${results.accuracy}%`;
        document.getElementById('timeTaken').textContent = `${results.timeTaken}s`;
        document.getElementById('charactersTyped').textContent = results.charactersTyped;
        document.getElementById('mistakes').textContent = results.mistakes;
        document.getElementById('levelCompleted').textContent = results.level;
        document.getElementById('cps').textContent = results.cps;
        
        // Update cartoon character and achievement
        this.updateCartoonCharacter(results);
        
        // Show appropriate buttons
        const nextLevelBtn = document.getElementById('nextLevelBtn');
        if (this.currentLevel < this.maxLevel) {
            nextLevelBtn.style.display = 'inline-flex';
        } else {
            nextLevelBtn.style.display = 'none';
        }
    }
    
    updateCartoonCharacter(results) {
        const characterBody = document.querySelector('.character-body');
        const achievementText = document.getElementById('achievementText');
        
        // Select character based on performance
        let characterIndex = 0;
        if (results.wpm >= 60) characterIndex = 9;
        else if (results.wpm >= 50) characterIndex = 8;
        else if (results.wpm >= 40) characterIndex = 7;
        else if (results.wpm >= 30) characterIndex = 6;
        else if (results.wpm >= 20) characterIndex = 5;
        else if (results.wpm >= 15) characterIndex = 4;
        else if (results.wpm >= 10) characterIndex = 3;
        else if (results.wpm >= 5) characterIndex = 2;
        else characterIndex = 1;
        
        characterBody.textContent = this.cartoonCharacters[characterIndex];
        achievementText.innerHTML = `<p>${this.achievementMessages[characterIndex]}</p>`;
    }
    
    nextLevel() {
        if (this.currentLevel < this.maxLevel) {
            this.currentLevel++;
            this.generateText();
            this.showPage('testPage');
            this.startCountdown();
        }
    }
    
    retryLevel() {
        this.generateText();
        this.showPage('testPage');
        this.startCountdown();
    }
    
    goHome() {
        this.currentLevel = 1;
        this.generateText();
        this.showPage('homepage');
        document.getElementById('username').value = '';
        document.getElementById('username').focus();
    }
    
    showHelp() {
        document.getElementById('helpModal').style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    hideHelp() {
        document.getElementById('helpModal').style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    generateText() {
        const characters = this.currentLevel * this.charactersPerLevel;
        this.currentText = this.generateRandomText(characters);
        
        // Update display
        document.getElementById('currentLevel').textContent = this.currentLevel;
        document.getElementById('charCount').textContent = characters;
        document.getElementById('textToType').textContent = this.currentText;
        document.getElementById('userInput').value = '';
        document.getElementById('progressFill').style.width = '0%';
        document.getElementById('progressText').textContent = `0 / ${characters} characters`;
    }
    
    generateRandomText(length) {
        const sentences = [
            "The quick brown fox jumps over the lazy dog.",
            "Hello world! This is a typing speed test application.",
            "Computer keyboards help us practice and improve our skills.",
            "Accuracy matters when measuring words per minute.",
            "Every challenge brings us to a new level of progress.",
            "Achievement comes through dedication and persistence.",
            "Master experts started as beginners with patience.",
            "Advanced intermediate professionals develop through practice.",
            "Programming and coding require software technology skills.",
            "Digital modern future innovation drives creative solutions.",
            "Problem solving helps us think, learn, and grow.",
            "Success comes from motivation and inspiration daily.",
            "Focus and concentration improve mindfulness and clarity.",
            "Typing speed tests help developers improve their skills.",
            "Practice makes perfect in every skill we learn.",
            "Technology advances through innovation and creativity.",
            "Learning new skills requires patience and dedication.",
            "Success is achieved through consistent practice and effort.",
            "Modern applications help users improve their productivity.",
            "Digital tools enhance our learning and development process.",
            "Professional developers use various programming languages daily.",
            "Creative solutions emerge from focused problem solving.",
            "Technology innovation drives modern software development.",
            "Practice and persistence lead to mastery of skills.",
            "Learning programming requires dedication and continuous effort.",
            "Digital transformation changes how we work and learn.",
            "Modern software development involves multiple technologies.",
            "Professional growth comes through continuous learning and practice.",
            "Innovation in technology creates new opportunities daily.",
            "Success in programming requires patience and consistent effort."
        ];
        
        let text = '';
        let currentLength = 0;
        
        // Start with a random sentence
        let sentenceIndex = Math.floor(Math.random() * sentences.length);
        
        while (currentLength < length) {
            const sentence = sentences[sentenceIndex];
            
            // If adding this sentence would exceed the length, try to fit what we can
            if (currentLength + sentence.length + 1 <= length) {
                text += (text ? ' ' : '') + sentence;
                currentLength = text.length;
                sentenceIndex = (sentenceIndex + 1) % sentences.length;
            } else {
                // Try to find a shorter sentence that fits
                let foundFit = false;
                for (let i = 0; i < sentences.length; i++) {
                    const testSentence = sentences[i];
                    if (currentLength + testSentence.length + 1 <= length) {
                        text += (text ? ' ' : '') + testSentence;
                        currentLength = text.length;
                        foundFit = true;
                        break;
                    }
                }
                
                if (!foundFit) {
                    // If no complete sentence fits, add words until we reach the target
                    const words = sentence.split(' ');
                    for (const word of words) {
                        if (currentLength + word.length + 1 <= length) {
                            text += (text ? ' ' : '') + word;
                            currentLength = text.length;
                        } else {
                            break;
                        }
                    }
                }
                break;
            }
        }
        
        return text.substring(0, length);
    }
    
    showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        document.getElementById(pageId).classList.add('active');
        
        // Reset test state
        if (pageId === 'testPage') {
            this.isTestActive = false;
            clearInterval(this.countdownInterval);
            clearInterval(this.testInterval);
            document.getElementById('userInput').disabled = true;
            document.getElementById('finishBtn').classList.add('hidden');
            document.getElementById('countdown').style.display = 'flex';
            document.getElementById('testTimer').classList.add('hidden');
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TypingSpeedTest();
});
