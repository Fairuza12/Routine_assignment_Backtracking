const sheets = require('./FileReader.js');
const courses = sheets['CourseList'];
var semester = [];
var no_of_courses;
for(var i=0;i<CourseList.length;i++)
{
    no_of_courses = Object.keys(CourseList[i]).length;
    for(var j=1;j<no_of_courses;j++)
    {
        const batch = {'year_no':null,'Availability':[true,true,true,true,true]}
        var course_No = 'Course '+ j ;
        var separate = courses[i][course_No].split('');
        batch.year_no = separate[1][0];
        var flag = false;
        for(var k=0;k<semester.length;k++)
        {
            if(batch.year_no==semester.year_no)
            {
                flag = true;
                break;
            }
        }
        if(flag==false)
        {
            semester.push(batch);
        }
    }
}
module.exports(semester);
