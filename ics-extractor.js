const fs = require('fs').promises;
const ics = require('ics');
const moment = require('moment');

const config = require('./merged-config');

function createEvents(events) {
    return new Promise((resolve, reject) => ics.createEvents(events, (err, res) => {
        if (err) {
            reject(err);
        } else {
            if (res) {
                resolve(res);
            } else {
                reject(new Error('failed to generate ics file'))
            }
        }
    }));
}

module.exports = async arr => {
    const events = [];
    for (e of arr) {
        for (w of e.weeks) {
            const end = moment(`${config.firstMonday}T${config.timetable[e.jc.to - 1].to}`)
                .add({ days: e.day - 1, weeks: w - 1 });
            if (moment().isSameOrAfter(end)) {
                continue;
            }
            const start = moment(`${config.firstMonday}T${config.timetable[e.jc.from - 1].from}`)
                .add({ days: e.day - 1, weeks: w - 1 });
            const item = {
                title: e.name,
                location: `${e.campus}-${e.location}`,
                description: `${e.class} | ${e.note}`,
                status: 'CONFIRMED',
                organizer: { name: e.teacher },
                start: [start.year(), start.month() + 1, start.date(), start.hour(), start.minute()],
                end:
                    [end.year(), end.month() + 1, end.date(), end.hour(), end.minute()],
            };
            if (e.zoom) {
                item.url = `zoommtg://zoom.us/join?confno=${e.zoom.id}&pwd=${e.zoom.password}&uname=${encodeURIComponent(config.zoomName)}`
            }
            events.push(item);
        }
    }
    const data = await createEvents(events);
    fs.writeFile('SJTU-class-schedule.ics', data);
};
