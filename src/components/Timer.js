

export default class Timer {
    // Store the duration and start the timer

    p5;
    constructor(p5,_duration, start = false ) {
        this.p5 = p5;
        this.startTime = this.p5.millis();
        this.duration = _duration;
        this.paused = false;
        this.pauseStartTime = 0;        // this will be millis() after the pause()
        this.totalPauseTime = 0;        // so we can make accurate calculations
    }

// MAIN FUNCTIONS
    //starts the timer if it was expired or paused
    start() { 
        if( this.expired() ) {            
            this.startTime = this.p5.millis();      // restarts counting millis
        }
        else if( this.paused ) { 
             // unpauses, add paused amount to total pause tume
            this.totalPauseTime += this.p5.millis() - this.pauseStartTime;
            this.paused = false; 
        }
    }

    // returns true if the timer is expired, e.g. if millis() is greater than startTime + duration
    expired() {
        return (this.startTime + this.duration + this.getPauseTime() ) < this.p5.millis();
    }

    // restarts timer regardless of status
    reset(){
        this.startTime = this.p5.millis();
         this.totalPauseTime = 0;

        if( this.paused ) {
            this.pauseStartTime = this.startTime;
        }
        else {
            this.pauseStartTime = 0;
        }
    }

    // pauses the timer 
    pause(){
        if( this.paused === false ) {
            this.pauseStartTime = this.p5.millis();
            this.paused = true; 
        }
    }
    
    // adds x millis to the remaining duration. 
    addTime(x){
        this.duration += x; 
    }

    // set the duration, doesn't start the timer
    setTimer(_duration) {
        this.duration = _duration;
    }
    
    //forces an expired() state by setting remaining duration to zero. 
    endTimer(){
        this.duration = 0; 
    }

// SIMPLE ACCESSORS
    // accessor: returns true/false, indicating paused state
    isPaused() {
        return this.paused;
    }

    // returns remaining time in milliseconds, zero if timer is done
    getRemainingTime() {
        if( this.expired() ) {
            return 0;
        }
        
        // never return a neg number + account for pause time
        let rt = this.startTime + this.duration + this.getPauseTime() - this.p5.millis();
        if( rt < 0 )
            rt = 0;
        return rt;
    }  

    // returns remaining % of timer, 0.0 through 1.0
    getPercentageRemaining() {
        if( this.duration === 0 )  { 
            return 0.0;     // avoid div by zero error
        }
        if( this.expired() ) { 
            return 0.0;
        }

        return this.getRemainingTime()/this.duration;
    }

    // returns elapsed % of timer, 0.0 through 1.0
    getPercentageElapsed() {
        return 1.0 - this.getPercentageRemaining(); //refactor to remove duplication
    }	

    // we use this to account for all paused actions: return active and past pause times
    getPauseTime() {
        let pauseTime = this.totalPauseTime;

        if( this.paused ) {
            pauseTime += (this.p5.millis() - this.pauseStartTime);
        }

        return pauseTime;
    } 	
}