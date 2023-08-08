import './styles/styles.scss';

import loadHome from './scripts/UI';
import { currentDate, checkThisWeek, checkToday, formatDate } from './scripts/dateManager';
import createTask from './scripts/task';

loadHome();

// const alo = createTask('alo','sluadr','07/08/2023',true,true);

// console.log(alo);


// console.log(checkToday(currentDate()));
// console.log(checkThisWeek(currentDate()));
// console.log(formatDate(currentDate()));
