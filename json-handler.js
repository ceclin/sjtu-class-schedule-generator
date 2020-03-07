const range = require('lodash/range');

function parseJc(course) {
    const arr = course.jcs.split(/-/).map(it => parseInt(it, 10));
    return {
        from: arr[0],
        to: arr[1],
    };
}

function parseWeeks(course) {
    const weeks = course.zcd;
    const res = weeks.match(/^(\d+)-(\d+)周(\((单|双)\))?$/);
    if (res) {
        return range(parseInt(res[1], 10), parseInt(res[2], 10) + 1, res[3] && 2);
    } else {
        return [...weeks.matchAll(/(\d+)周/g)].map(it => parseInt(it[1], 10));
    }
}

function parseNote(course) {
    const res = {};
    const note = course.xkbz;
    res.note = note;
    const match = note.match(/会议号：(\d+).*?密码：(\d+)/);
    if (match) {
        const zoom = {};
        zoom.id = match[1];
        zoom.password = match[2];
        res.zoom = zoom;
    }
    return res;
}


exports.handle = async path => require(path).kbList
    .flatMap(course => ({
        day: course.xqj,
        name: course.kcmc,
        jc: parseJc(course),
        weeks: parseWeeks(course),
        campus: course.xqmc,
        location: course.cdmc,
        teacher: course.xm,
        class: course.jxbmc,
        ...parseNote(course),
    }));
