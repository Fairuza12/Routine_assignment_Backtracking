const sheets = require('./FileReader.js');
const time = require('time');
const teacher = sheets['TeacherList'];
const course = sheets['CourseList'];
const slot = sheets['FreeSlot'];
var teachers = [];
for(var i=0;i<teacher.length;i++)
{
    const teacherInfo = {'Initial':null, 'Name':null, 'Courses':[], 
        'Slots': {'Sunday':[], 'Monday':[], 'Tuesday':[],'Wednesday':[],'Thursday':[]},
        Availability: [true,true,true,true,true]};
    teacherInfo.Initial = teacher[i]['Teacher Initial'];
    teacherInfo.Name = teacher[i]['Full Name'];
    for(var j=0;j<course.length;j++)
    {
        if(course[j]['Teacher Initial']==teacher[i]['Teacher Initial'])
        {
            var no_of_courses = Object.keys(course[j]).length;
            for(var k=1;k<no_of_courses;k++)
            {
                courseNo = 'Course ' + k;
                teacherInfo.Courses.push(course[j][courseNo]);
            }
        }
    }
    var separate;
    var duration;
    var slot_array = [];
    for(var j=0;j<slot.length;j++)
    {
        if(slot[j]['Teacher Initial'] == teacher[i]['Teacher Initial'])
        {
            if(Slots[j].Sunday!=undefined)
            {
                separate = Slots[j].Sunday.split(';');
            }
            else{
                separate = [];
            }
            for(var l=0;l<separate.length;l++)
            {
                duration = separate[l].split('-');
                duration[0] = time(duration[0],'HH:MMA');
                duration[1] = time(duration[1],'HH:MMA');
                slot_array.push(duration[0],duration[1]);
            }
            teacherInfo.Slots.Sunday = slot_array;
            slot_array = [];
            if(Slots[j].Monday!=undefined)
            {
                separate = Slots[j].Monday.split(';');
            }
            else{
                separate = [];
            }
            for(var l=0;l<separate.length;l++)
            {
                duration = separate[l].split('-');
                duration[0] = time(duration[0],'HH:MMA');
                duration[1] = time(duration[1],'HH:MMA');
                slot_array.push(duration[0],duration[1]);
            }
            teacherInfo.Slots.Monday = slot_array;
            slot_array = [];
            if(Slots[j].Tuesday!=undefined)
            {
                separate = Slots[j].Tuesday.split(';');
            }
            else{
                separate = [];
            }
            for(var l=0;l<separate.length;l++)
            {
                duration = separate[l].split('-');
                duration[0] = time(duration[0],'HH:MMA');
                duration[1] = time(duration[1],'HH:MMA');
                slot_array.push(duration[0],duration[1]);
            }
            teacherInfo.Slots.Tuesday = slot_array;
            slot_array = [];
            if(Slots[j].Wednesday!=undefined)
            {
                separate = Slots[j].Wednesday.split(';');
            }
            else{
                separate = [];
            }
            for(var l=0;l<separate.length;l++)
            {
                duration = separate[l].split('-');
                duration[0] = time(duration[0],'HH:MMA');
                duration[1] = time(duration[1],'HH:MMA');
                slot_array.push(duration[0],duration[1]);
            }
            teacherInfo.Slots.Wednesday = slot_array;
            slot_array = [];
            if(Slots[j].Thursday!=undefined)
            {
                separate = Slots[j].Thursday.split(';');
            }
            else{
                separate = [];
            }
            for(var l=0;l<separate.length;l++)
            {
                duration = separate[l].split('-');
                duration[0] = time(duration[0],'HH:MMA');
                duration[1] = time(duration[1],'HH:MMA');
                slot_array.push(duration[0],duration[1]);
            }
            teacherInfo.Slots.Thursday = slot_array;
            slot_array = [];
        }
    }
    teacher.push(teacherInfo);
}
module.exports = teacher;