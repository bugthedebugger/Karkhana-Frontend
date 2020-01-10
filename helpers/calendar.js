import moment from "moment";

export default {
    formatEventsResonse(eventsData) {
        if (!eventsData.length) return null;

        let dateFormat = "D MMM";
        let events = {};
        eventsData.forEach(event => {
            let date = moment(event.start.dateTime).format(dateFormat);
            if (events[date]) events[date].push(this.formatSingleEvent(event));
            else events[date] = [this.formatSingleEvent(event)];
        });

        // sort events by date
        let sortedEvents = {};
        Object.keys(events).sort(function (a, b) {
            return moment(a, dateFormat).toDate() - moment(b, dateFormat).toDate();
        }).forEach(function (key) {
            sortedEvents[key] = events[key];
        })

        return sortedEvents;
    },

    formatSingleEvent(event) {
        return {
            title: event.summary,
            location: event.location,
            startTime: moment(event.start.dateTime).format("h:MM A")
        };
    },

    buildUrl(calendar) {
        const timeMin = new Date().toISOString();
        const timeMax = calendar.endOf("month").toISOString();
        return `${process.env.CAL_BASE_URL}/${process.env.CAL_ID}/events?timeMin=${timeMin}&timeMax=${timeMax}&key=${process.env.CAL_API_KEY}`;
    },

    assignEvents(events, calendarData) {
        let eventDates = Object.keys(events).map(date => parseInt(date.split(' ')[0]));
        calendarData.forEach((row, i) => {
            row.forEach((dateItem, j) => {
                if (eventDates.includes(dateItem.date)) {
                    calendarData[i][j].hasEvent = true;
                }
            })
        })
    },

    initCalendar(calendar) {
        const lastDateOfMonth = calendar.endOf("month").date();
        const firstDayOfMonth = calendar.startOf("month").day();

        const calendarData = [];
        // generate linear calendar data
        let linearData = [];
        for (let i = 0; i < firstDayOfMonth; i++) linearData[i] = null;
        let dateCount = 1;
        for (let i = firstDayOfMonth; dateCount <= lastDateOfMonth; i++) {
            linearData[i] = {
                date: dateCount,
                currentDate: dateCount === new Date().getDate()
            };
            dateCount++;
        }

        // convert to 2D array
        let rowIndex = 0;
        for (let i = 0; i < linearData.length; i++) {
            if (i % 7 === 0 && i !== 0) rowIndex++;
            if (calendarData[rowIndex])
                calendarData[rowIndex].push(linearData[i]);
            else calendarData[rowIndex] = [linearData[i]];
        }

        // fill next and prev month cells
        let firstRow = calendarData[0];
        if (firstRow.includes(null)) {
            const lastDayOfLastMonth = calendar
                .subtract(1, "month")
                .endOf("month")
                .date();
            let count = 0;
            for (let i = firstRow.lastIndexOf(null); i >= 0; i--) {
                firstRow[count++] = {
                    date: lastDayOfLastMonth - i,
                    disabled: true
                };
            }
            calendar.add(1, "month");
        }

        let lastRow = calendarData[calendarData.length - 1];
        let count = 1;
        while (lastRow.length !== 7) {
            lastRow.push({
                date: count++,
                disabled: true
            });
        }

        return calendarData;
    }
}