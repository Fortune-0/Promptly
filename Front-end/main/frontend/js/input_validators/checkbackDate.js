import * as say from "../variable_names/inputVar.js"
import { checkDate } from "../error_messages/date_error.js";
import { checkTime } from "../error_messages/time_error.js";

const   thisDay = new Date().getDate(),
        thisMonth = new Date().getMonth(),
        thisHour = new Date().getHours(),
        thisMinute = new Date().getMinutes(),
        thisSecond = new Date().getSeconds(),
        thisYear = new Date().getFullYear();

export function checkBackDateTime () {
    let taskDate = new Date(say.taskDateTimeEl.value),
        userMonth = taskDate.getMonth(),
        userDay = taskDate.getDate(),
        userYear = taskDate.getFullYear(),
        taskTime = new Date(say.taskDateTimeEl.value),
        userHour = taskTime.getHours(),
        userMinutes = taskTime.getMinutes(),
        userSecs = taskTime.getSeconds();

    if (userMonth == thisMonth && userDay == thisDay && userHour < thisHour) {
        checkTime();
        say.dateEm.textContent = "Please input this hour or later";
        return true;
    } else if (userMonth == thisMonth && userDay == thisDay && userHour == thisHour && userMinutes <= thisMinute && userSecs <= thisSecond) {
        checkTime();
        say.dateEm.textContent = "Please input some mins in the future";
        return true;
    }

    if (userYear < thisYear) {
        checkDate();
        say.dateEm.textContent = "Please input this year or later.";
        return true;
    } else if (userMonth < thisMonth) {
        checkDate();
        say.dateEm.textContent = "Please input this month or later.";
        return true;
    } else if (userYear == thisYear && userMonth == thisMonth && userDay < thisDay) {
        checkDate();
        say.dateEm.textContent = "Please input today or later.";
        return true;
    }
    return false;
};