const array = require('./array.js');
const time = require('time');
const teachers = array['teachers'];
const courses = array['courses'];
const semester = array['semester'];
const time_slot = ['8:30 am','10:00 am','11:30 am','2:00 am','3:30 am'];
const Availability = [true,true,true,true,true];
var starting_time;
var theory_ending_time;
var lab_ending_time;
for(var i=0;i<5;i++)
{
    time_slot[i] = time(time_slot[i],'HH:MMA');
}
const routine = {'Sunday':[],'Monday':[],'Tuesday':[],'Wednesday':[],'Thursday':[]};

function getDuration(i)
{
    starting_time = time_slot[i];
    theory_ending_time = time_slot[i].clone();
    theory_ending_time.add(1.5+'hours');
    lab_ending_time = time_slot[i].clone();
    lab_ending_time.add(3+'hours');
}
function slotAssign(dayOfWeek)
{
    for(var i=0;i<5;i++)
    {
        getDuration(i);
        for(var j=0;j<courses.length;j++)
        {
            courseAssign(dayOfWeek,i,j);
        }
    }
}
function courseAssign(dayOfWeek,i,j)
{
    var batch = semester.find(o=>o.year_no==courses.Year);
    if(courses[i].ClassPerWeek>0 && courses[i].Availability==true && batch.Availability[i]==true)
    {
        if(courses[j].Type=='Theory')
        {
            if(assignTheoryTeacher(dayOfWeek,i,j))
            {
                routine[dayOfWeek].push([time(starting_time).format('HH:MMA'),courses[j].Code,courses[j].teachers[0]]);
				batch.Availability[i] = false;
				courses[j].Availability = false;
				courses[j].ClassPerWeek --;
            }
        }
        if(courses[j].Type == 'Lab' && i!=2 && i!=4)
        {
            if(assignLabTeacher(dayOfWeek,i,j))
            {
                if(courses[j].teachers.length == 1)
                {
                    routine[dayOfWeek].push([time(starting_time).format('HH:MMA'),courses[j].Code,courses[j].teachers[0]]);
                }
                else if(courses[j].teachers.length == 2)
                {
                    routine[dayOfWeek].push([time(starting_time).format('HH:MMA'),courses[j].Code,courses[j].teachers[0],courses[j].teachers[1]]);
                }
                batch.Availability[i] = false;
                batch.Availability[i+1] = false;
                courses[j].available = false;
                courses[j].ClassPerWeek --;		
            }
        }
    }
}
function assignTheoryTeacher(day,i,j)
{
    var teacher = teachers.find(o => o.initial == courses[j].teachers[0]);
	if(teacher.availability[i] == false)
    {
		return false;
	}
	var weekday = teacher.slot[day];
	for(var k=0; k<weekday.length; k++)
    {
		if(weekday[k][0]<=starting_time && weekday[k][1]>=theory_ending_time)
        {
			teacher.Availability[i] = false;
			return true;
		}
	}
	return false;
}
function assignLabTeacher(dayOfWeek,i,j)
{
    var teacher1;
	var teacher2;
	if(courses[j].teacher.length == 1)
    {
		teacher1 = teachers.find(o => o.initial == courses[j].teachers[0]);
		if(teacher1.available[i] == false)
        {
			 return false;
		}
		var weekday = teacher1.slots[dayOfWeek];
		for(var k=0; k<weekday.length; k++)
        {
			if(weekday[k][0]<=starting_time && weekday[k][1]>=lab_ending_time)
            {
				teacher1.Availability[i] = false;
				teacher1.Availability[i+1] = false;
				return true;
			}
		}
	}
	else
    {
		teacher1 = teachers.find(o => o.initial == courses[j].teachers[0]);
		teacher2 = teachers.find(o => o.initial == courses[j].teachers[1]);
		if(teacher1.Availability[i] == false || teacher2.Availability[i] == false)
        {
			return false;
		}
		var weekday1 = teacher1.slot[dayOfWeek];
		var weekday2 = teacher2.slot[dayOfWeek];
		var teacher1_free = false;
		var teacher2_free = false;
		for(var k=0; k<weekday1.length; k++)
        {
			if(weekday1[k][0]<=starting_time && weekday1[k][1]>=lab_ending_time)
            {
				teacher1_free = true;
				break;
			}
		}
		for(var k=0; k<weekday2.length; k++)
        {
			if(weekday2[k][0]<=starting_time && weekday2[k][1]>=lab_ending_time)
            {
				teacher2_free = true;
				break;
			}
		}
		if(teacher1_free && teacher2_free)
        {
			teacher1.Availability[i] = false;
			teacher2.Availability[i] = false;
			teacher1.Availability[i+1] = false;
			teacher2.Availability[i+1] = false;
			return true;
		}

	}

	return false;
}
slotAssign('Sunday');
reset();
slotAssign('Monday');
reset();
slotAssign('Tuesday');
reset();
slotAssign('Wednesday');
reset();
slotAssign('Thursday');
reset();
function reset()
{
    for(var v=0;v<teachers.length;v++)
    {
        for(var i=0;i<5;i++)
        {
            teachers[v].Availability[j] = true;
        }
    }
    for(var v=0;v<semester.length;v++)
    {
        for(var i=0;i<5;i++)
        {
            semester[v].Availability[j] = true;
        }
    }
    for(var j=0;j<courses.length;j++)
    {
        courses[i].Availability = true;
    }
}

module.exports = routine;