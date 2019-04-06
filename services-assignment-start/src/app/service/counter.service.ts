export class CounterService {
    theCount = 0;

    incrementCount(logMessage: string) {
        this.theCount++;
        console.log(logMessage + this.theCount);
    }
}