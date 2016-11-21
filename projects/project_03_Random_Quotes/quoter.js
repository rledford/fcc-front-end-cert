
function Quoter() {
    "use strict";
    this.lastQuoteIndext = -1;//the last index received from getRandomIndex
    this.webQuoteSource = "";//couldn't get a web scaper going at the time
    this.history=[];//history of visited quote indexes (not quotes)
    this.historyIndex = -1;//track where in the history
    
    this.getRandomIndex = function () {
        return parseInt(Math.random() * (quotes.length));
    };
    
    this.getRandomLocalQuote = function () {
        //dont loop forever...
        var tries = 5;
        var index = this.getRandomIndex();
        while(tries > 0){
            if (index != this.lastQuoteIndext) break;
            index = this.getRandomIndex();
            tries--;
        }
        this.lastQuoteIndext = index;
        this.history.push(index);
        this.historyIndex = this.history.length-1;
        return quotes[index];
    };
    
    this.getPrevQuote = function (){
        if (this.history.length > 0 && this.historyIndex >= 0){
            this.historyIndex--;
            return quotes[this.history[this.historyIndex]];
        }
        return null;
    };
    
    this.getNextQuote = function (){
        if (this.historyIndex < this.history.length-1){
            this.historyIndex++;
            return quotes[this.history[this.historyIndex]];
        }
        else{
            return this.getRandomLocalQuote();
        }
    };
}

//couldn's scrape off the directly off sites so grabbes some from site sources and extracted with Python
var quotes = [
	{"quote": "I love you the more in that I believe you had liked me for my own sake and for nothing else.",
	"author": "John Keats"},
	{"quote": "But man is not made for defeat. A man can be destroyed but not defeated.",
	"author": "Ernest Hemingway"},
	{"quote": "When you reach the end of your rope, tie a knot in it and hang on.",
	"author": "Franklin D. Roosevelt"},
	{"quote": "There is nothing permanent except change.",
	"author": "Heraclitus"},
	{"quote": "My sun sets to rise again.",
	"author": "Elizabeth Barrett Browning"},
	{"quote": "Let us sacrifice our today so that our children can have a better tomorrow.",
	"author": "A. P. J. Abdul Kalam"},
	{"quote": "The most difficult thing is the decision to act, the rest is merely tenacity. The fears are paper tigers. You can do anything you decide to do. You can act to change and control your life; and the procedure, the process is its own reward.",
	"author": "Amelia Earhart"},
	{"quote": "Do not mind anything that anyone tells you about anyone else. Judge everyone and everything for yourself.",
	"author": "Henry James"},
	{"quote": "There is no charm equal to tenderness of heart.",
	"author": "Jane Austen"},
	{"quote": "All that we see or seem is but a dream within a dream.",
	"author": "Edgar Allan Poe"},
	{"quote": "Lord, make me an instrument of thy peace. Where there is hatred, let me sow love.",
	"author": "Francis of Assisi"},
	{"quote": "If you cannot do great things, do small things in a great way.",
	"author": "Napoleon Hill"},
	{"quote": "Permanence, perseverance and persistence in spite of all obstacles, discouragements, and impossibilities: It is this, that in all things distinguishes the strong soul from the weak.",
	"author": "Thomas Carlyle"},
	{"quote": "Independence is happiness.",
	"author": "Susan B. Anthony"},
	{"quote": "The supreme art of war is to subdue the enemy without fighting.",
	"author": "Sun Tzu"},
	{"quote": "Keep your face always toward the sunshine - and shadows will fall behind you.",
	"author": "Walt Whitman"},
	{"quote": "Happiness can exist only in acceptance.",
	"author": "George Orwell"},
	{"quote": "Love has no age, no limit; and no death.",
	"author": "John Galsworthy"},
	{"quote": "You can't blame gravity for falling in love.",
	"author": "Albert Einstein"},
	{"quote": "There is only one corner of the universe you can be certain of improving, and that's your own self.",
	"author": "Aldous Huxley"},
	{"quote": "Honesty is the first chapter in the book of wisdom.",
	"author": "Thomas Jefferson"},
	{"quote": "The journey of a thousand miles begins with one step.",
	"author": "Lao Tzu"},
	{"quote": "Whoever is happy will make others happy too.",
	"author": "Anne Frank"},
	{"quote": "I have not failed. I've just found 10,000 ways that won't work.",
	"author": "Thomas A. Edison"},
	{"quote": "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
	"author": "Benjamin Franklin"},
	{"quote": "There is nothing on this earth more to be prized than true friendship.",
	"author": "Thomas Aquinas"},
	{"quote": "A leader is one who knows the way, goes the way, and shows the way.",
	"author": "John C. Maxwell"},
	{"quote": "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.",
	"author": "Marcus Aurelius"},
	{"quote": "If opportunity doesn't knock, build a door.",
	"author": "Milton Berle"},
	{"quote": "The secret of getting ahead is getting started.",
	"author": "Mark Twain"},
	{"quote": "Let us be grateful to people who make us happy, they are the charming gardeners who make our souls blossom.",
	"author": "Marcel Proust"},
	{"quote": "Always remember that you are absolutely unique. Just like everyone else.",
	"author": "Margaret Mead"},
	{"quote": "Wise men speak because they have something to say; Fools because they have to say something.",
	"author": "Plato"},
	{"quote": "If your actions inspire others to dream more, learn more, do more and become more, you are a leader.",
	"author": "John Quincy Adams"},
	{"quote": "A single rose can be my garden... a single friend, my world.",
	"author": "Leo Buscaglia"},
	{"quote": "Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success.",
	"author": "Swami Vivekananda"},
	{"quote": "Friends show their love in times of trouble, not in happiness.",
	"author": "Euripides"},
	{"quote": "You don't choose your family. They are God's gift to you, as you are to them.",
	"author": "Desmond Tutu"},
	{"quote": "Life is not a problem to be solved, but a reality to be experienced.",
	"author": "Soren Kierkegaard"},
	{"quote": "Today you are you! That is truer than true! There is no one alive who is you-er than you!",
	"author": "Dr. Seuss"},
	{"quote": "Education is the most powerful weapon which you can use to change the world.",
	"author": "Nelson Mandela"},
	{"quote": "Change your thoughts and you change your world.",
	"author": "Norman Vincent Peale"},
	{"quote": "Where there is love there is life.",
	"author": "Mahatma Gandhi"},
	{"quote": "Love isn't something you find. Love is something that finds you.",
	"author": "Loretta Young"},
	{"quote": "Don't walk behind me; I may not lead. Don't walk in front of me; I may not follow. Just walk beside me and be my friend.",
	"author": "Albert Camus"},
	{"quote": "In the end, it's not the years in your life that count. It's the life in your years.",
	"author": "Abraham Lincoln"},
	{"quote": "Success is not final, failure is not fatal: it is the courage to continue that counts.",
	"author": "Winston Churchill"},
	{"quote": "Do not go where the path may lead, go instead where there is no path and leave a trail.",
	"author": "Ralph Waldo Emerson"},
	{"quote": "Love is composed of a single soul inhabiting two bodies.",
	"author": "Aristotle"},
	{"quote": "Try to be a rainbow in someone's cloud.",
	"author": "Maya Angelou"}];