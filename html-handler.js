const JSDOM = require('jsdom').JSDOM;
const range = require('lodash/range');

function parseWeeks(details) {
    const weeks = details[0].textContent.trim().slice(3);
    const res = weeks.match(/^(\d+)-(\d+)周(\((单|双)\))?$/);
    if (res) {
        this.weeks = range(parseInt(res[1], 10), parseInt(res[2], 10) + 1, res[3] && 2);
    } else {
        this.weeks = [...weeks.matchAll(/(\d+)周/g)].map(it => parseInt(it[1], 10));
    }
}

function parseLocation(details) {
    const where = details[1].textContent.trim().split(/ +/);
    this.campus = where[0].slice(3);
    this.location = where[1].slice(5);
}

function parseNote(details) {
    const note = details[5].textContent;
    this.note = note.trim();
    const res = note.match(/会议号：(\d+).*?密码：(\d+)/);
    if (res) {
        const zoom = {};
        zoom.id = res[1];
        zoom.password = res[2];
        this.zoom = zoom;
    }
}


exports.handle = async path => {
    const { document } = (await JSDOM.fromFile(path)).window;
    const days = [1, 2, 3, 4, 5, 6, 7];
    return days.map(it => `#ylkbTable table #xq_${it}`)
        .map(selector => document.querySelector(selector))
        .map(it => it.children)
        .map(it => {
            const arr = [];
            for (let index = 1; index < it.length; index++) {
                const element = it[index];
                arr.push(element.children);
            }
            return arr;
        })
        .flatMap((it, index) => {
            const arr = [];
            for (course of it) {
                const item = { day: index + 1 };
                // parse jc
                const jc = course[0].children[0].textContent.split('-')
                    .map(it => parseInt(it, 10));
                item.jc = {};
                item.jc.from = jc[0];
                item.jc.to = jc[1];
                // extract course info
                const info = course[1].children[0].children;
                item.name = info[0].textContent.trim();
                // extract detailed info
                const details = info[1].children;
                parseWeeks.call(item, details);
                parseLocation.call(item, details);
                item.teacher = details[2].textContent.trim().slice(3);
                item.class = details[3].textContent.trim().slice(4);
                parseNote.call(item, details);
                // push into array
                arr.push(item);
            }
            return arr;
        })
};
