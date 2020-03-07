const customConfig = require('./config');

const defaultConfig = {
    zoomName: '思源湖旁小学僧',
    timetable: [
        { from: '08:00', to: '08:45' }, // 第1节
        { from: '08:55', to: '09:40' }, // 第2节
        { from: '10:00', to: '10:45' }, // 第3节
        { from: '10:55', to: '11:40' }, // 第4节
        { from: '12:00', to: '12:45' }, // 第5节
        { from: '12:55', to: '13:40' }, // 第6节
        { from: '14:00', to: '14:45' }, // 第7节
        { from: '14:55', to: '15:40' }, // 第8节
        { from: '16:00', to: '16:45' }, // 第9节
        { from: '16:55', to: '17:40' }, // 第10节
        { from: '18:00', to: '18:45' }, // 第11节
        { from: '18:55', to: '19:40' }, // 第12节
        { from: '19:40', to: '20:20' }, // 第13节
        { from: '20:20', to: '21:00' }, // 第14节
    ]
};

module.exports = { ...defaultConfig, ...customConfig };
