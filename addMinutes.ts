/**

    addMinutes

    Adds the given number of minutes to the given time and returns
    the result time as a string.

    @param {string} originalTime - the start time to add minutes to
      format follows "[H]H:MM {AM|PM}", i.e. "12:34 PM"
    @param {number} minutesToAdd - an integer value representing
    @return {string} the result time with minutes added
      format follows "HH:MM {AM|PM}", i.e. "12:34 PM"

*/
export default function addMinutes(originalTime: string, minutesToAdd: number)
{
    // regular expression for validating time format
    const timeFormatCheck: RegExp = /^((1[0-2])|(0?[1-9])):(([1-5][0-9])|(0[0-9]))[ ]([aA]|[pP])[mM]$/gm;

    // some immutable constants for calculating time arithmetic
    const MINUTES_IN_AN_HOUR = 60;
    const MAX_HOUR = 12;

    // ensure valid params given
    if (isNaN(minutesToAdd) || minutesToAdd < 0) {
        throw new Error('Bad minutes param');
    }

    if (!timeFormatCheck.test(originalTime)) {
        throw new Error('Bad time format');
    }

    // parse/extract time variables
    const [ numbers, originalAmPm ] = originalTime.trim().split(' ');
    const [ originalHour, originalMinute ] = numbers.split(':').map(n => parseInt(n, 10));

    // calculate new minute value
    const totalMinutes: number = minutesToAdd + originalMinute;
    const newMinuteValue: number = totalMinutes % MINUTES_IN_AN_HOUR;

    // calculate hours
    const hoursToAdd: number = totalMinutes >= MINUTES_IN_AN_HOUR ? Math.floor(totalMinutes / MINUTES_IN_AN_HOUR) : 0;
    let newAmPmValue: string = originalAmPm.toUpperCase();
    let newHourValue: number = originalHour;

    // handle hour arithmetic
    if (hoursToAdd) {
        // get the new hour and check if ante meridiem flip is needed
        let shouldFlipAmPm: boolean = !!(((hoursToAdd + originalHour) / MAX_HOUR) % 2);
        newHourValue = (hoursToAdd + originalHour) % MAX_HOUR;

        // convert the hour value of 0 to 12 if needed
        newHourValue = newHourValue || MAX_HOUR;

        // if starting on hour 12, AM/PM is already initially flipped for us.
        // therefore we should negate the flip status
        if (originalHour === MAX_HOUR) {
            shouldFlipAmPm = !shouldFlipAmPm;
        }

        // adjust ante meridiem
        if (shouldFlipAmPm) {
            newAmPmValue = newAmPmValue === 'AM' ? 'PM' : 'AM'
        }
    }

    // inflate to double digit HH:MM
    const expandedHour = newHourValue.toString().padStart(2, '0');
    const expandedMinute = newMinuteValue.toString().padStart(2, '0');
    
    return `${expandedHour}:${expandedMinute} ${newAmPmValue}`;
}



