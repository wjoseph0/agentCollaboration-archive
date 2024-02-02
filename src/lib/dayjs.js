import dayjs from 'dayjs';
import RelativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/UTC';

dayjs.extend(RelativeTime);
dayjs.extend(utc);

export default dayjs;
