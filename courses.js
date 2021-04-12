const sheets = require('./FileReader.js');
const courses = sheets['CourseList'];
var course = [];
var no_of_courses;
for(var i=0;i<courses.length;i++)
{
    no_of_courses = Object.keys(courses[i]).length;
    for(var j=1;j<no_of_courses;j++)
    {
        const courseInfo = {'Code':null,'Type':theory,'Year':null,'Credits':3,
            'ClassTime' : 1.5, 'ClassPerWeek' : 2, 'teachers':[], 'Availability' :true};
        var course_No = 'Course'+ j;
        courseInfo.Code = courses[i][course_No];
        courseInfo.teachers.push(courses[i]['Teacher Initial']);
        var separate =  courses[i][course_No].split('');
        courseInfo.Year = separate[1][0];
        if(separate[1][2]=='1')
        {
            courseInfo.Type = 'Lab';
            courseInfo.Credits = 1.5;
            courseInfo.ClassPerWeek = 1;
            courseInfo.ClassTime = 3;
        }
        course.push(courseInfo);
    }
}

for(var i=0;i<course.length;i++)
{
    for(var j=i+1;j<course.length;j++)
    {
        if(course[i].Code==course[j].Code)
        {
            course[i].teachers.push(course[j].teachers[0]);
            course.splice(j,1);
        }
    }
}

module.exports = course;