import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime.js';
import utc from 'dayjs/plugin/utc.js';

dayjs.extend(RelativeTime);
dayjs.extend(utc);

export default dayjs;
