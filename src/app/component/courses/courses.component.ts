import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface course {course_name:string; course_desc : string; fee : number; location : string; start_date:Date; end_date: Date; course_facilitator : string;course_outline :any[];about_course:string};
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
StartDate : any;
EndDate : any;
StartTime : any = {hour: '', minute: '', meriden: "PM", format: 12};
EndTime : any = {hour: '', minute: '', meriden: "PM", format: 12};
hour : any;
minute : any;

finalstartdate : any;
finalenddate:any;
update_id: string;
state = '';
isshow = false;

Course : Observable<any[]>;
public courseCollection : AngularFirestoreCollection<course>;

  constructor(db: AngularFirestore)
   {
        this.courseCollection = db.collection<course>('courses');
        this.Course = db.collection('courses').valueChanges();
    }

  ngOnInit() {
  }

  onButton()
  {
    
    console.log(this.StartDate);
    console.log(this.EndDate);
    console.log(this.StartTime);
    console.log(this.EndTime);
  
  
  }

  addcourses()
  {
    console.log("calling add courses");
    console.log(this.StartDate)
    var coursename = (document.getElementById('course_name') as HTMLInputElement).value;
    console.log(coursename);
    coursename.trim();
    var coursedec = (document.getElementById('course_desc') as HTMLInputElement).value;
    console.log(coursedec);
    coursedec.trim();
    var fees = parseInt((document.getElementById('fee') as HTMLInputElement).value);
    console.log(fees);
    
    var locations = (document.getElementById('location') as HTMLInputElement).value;
    console.log(locations);
    locations.trim();
    var coursefac = (document.getElementById('facilitator') as HTMLInputElement).value;
    console.log(coursefac);
    coursefac.trim();

    var aboutcourse = (document.getElementById('about') as HTMLInputElement).value;
    console.log(aboutcourse);
    aboutcourse.trim();

    ///Remove the last dot from the string (Remaning)
    var courseoutline =  (document.getElementById('desc') as HTMLInputElement).value;
    courseoutline.substr(courseoutline.length-1);
    console.log(courseoutline);
    
    var outline = courseoutline.split(".");
    
    console.log(outline);

    outline.pop();
    console.log(outline);
    for(var i=0;i<outline.length;i++)
    {
      outline[i]=outline[i]+".";
      console.log(outline[i]);
    }
    this.finalstartdate = moment(this.StartDate).hours(this.StartTime.hour).minutes(this.StartTime.minute).toString();
    this.finalenddate = moment(this.EndDate).hours(this.EndTime.hour).minutes(this.EndTime.minute).toString();

    var dbdate = new Date(this.finalstartdate);
    var dbdate1 = new Date(this.finalenddate);

    const item : course = {course_name :coursename, course_desc : coursedec , fee : fees , location : locations , start_date : dbdate , end_date : dbdate1
      ,about_course : aboutcourse ,course_facilitator : coursefac ,course_outline : outline}
    console.log(item);
    this.courseCollection.add(item).then((res) => {
      console.log(res);
      location.reload(true);
    })
  }

  show() {
    console.log('call....show  ===>' + event.srcElement.id);
    let id;
    let val;
    val = event.srcElement.id;

    let data;

    const res = (this.courseCollection.ref.where('course_name', '==', val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log('this' + doc.id);
          id = doc.id;
          console.log(doc.data());
          console.log(doc.data().course_name);
        
          data = doc.data();
          console.log('idddddd===>>>' + id);

        });
      }
    )).then(() => { 
      (document.getElementById('course_name') as HTMLInputElement).value = data.course_name;
      (document.getElementById('course_desc') as HTMLInputElement).value = data.course_desc;
      (document.getElementById('fee') as HTMLInputElement).value = data.fee;
      (document.getElementById('location') as HTMLInputElement).value = data.location;
      (document.getElementById('facilitator') as HTMLInputElement).value = data.course_facilitator;
      (document.getElementById('desc') as HTMLInputElement).value = data.course_outline;
      (document.getElementById('about') as HTMLInputElement).value = data.about_course;

      

   
      var date_func = moment(data.start_date).format('MM/DD/YYYY');
      this.StartTime.hour = moment(data.start_date).hour();
      this.StartTime.minute = moment(data.start_date).minute();
      console.log('hour '+ this.StartTime.hour );
      console.log('minute '+ this.StartTime.minute );

      this.EndTime.hour = moment(data.end_date).hour();
      this.EndTime.minute = moment(data.end_date).minute();
      console.log('hour '+ this.EndTime.hour );
      console.log('minute '+ this.EndTime.minute );

      

      console.log(date_func);
      (document.getElementById('StartDate') as HTMLInputElement).value = date_func;
      var date_func1 = moment(data.end_date).format('MM/DD/YYYY');
      console.log(date_func1);
      (document.getElementById('EndDate') as HTMLInputElement).value = date_func1;
      (document.getElementById('add') as HTMLInputElement).innerHTML = 'update';
      (document.getElementById('h5') as HTMLInputElement).innerHTML = 'Update Course';
      this.update_id = id;
      console.log(this.update_id);
      
      this.openModule();
    });
  }

  checkButton() {
    console.log('call button');

    const val = (document.getElementById('add') as HTMLInputElement).innerHTML;
    console.log(val);
    console.log(val.localeCompare('ADD'));
    // tslint:disable-next-line:curly
    if (0 === val.localeCompare('ADD'))
     this.addcourses();
    // tslint:disable-next-line:curly
    else
     this.update();
  }
  update()
  {
      console.log("Calling Update Method");
      const val = (document.getElementById('course_name') as HTMLInputElement).value;
      val.trim();
      const val1 = (document.getElementById('course_desc') as HTMLInputElement).value;
      val1.trim();
      const val2 = parseInt((document.getElementById('fee') as HTMLInputElement).value);
      const val3 = (document.getElementById('location') as HTMLInputElement).value;
      val3.trim();

      var val4 = (document.getElementById('facilitator') as HTMLInputElement).value;
      val4.trim();

      var val5 = (document.getElementById('desc') as HTMLInputElement).value;
      val5.trim();
      var string1 = val5.split('.');
     
      string1.pop();
      for(var i=0;i<string1.length;i++)
    {
      string1[i]=string1[i].replace(",","");
      string1[i] =string1[i]+".";

      console.log(string1[i]);
    }
      var val6 = (document.getElementById('about') as HTMLInputElement).value;
      val6.trim();

      // var db_date = new Date(this.StartDate + '' + this.StartTime );
      // console.log(db_date);
      // var db_date1 = new Date(this.EndDate  + '' + this.EndTime);
      // console.log(db_date1);

      this.finalstartdate = moment(this.StartDate).hours(this.StartTime.hour).minutes(this.StartTime.minute).toString();
      this.finalenddate = moment(this.EndDate).hours(this.EndTime.hour).minutes(this.EndTime.minute).toString();
 
      console.log('end ' + this.finalenddate);
      console.log('start ' + this.finalstartdate);

     const item : course = {course_name:val , course_desc: val1 ,fee : val2 , location : val3 , start_date : this.finalstartdate ,end_date : this.finalenddate,
    course_facilitator:val4 ,course_outline : string1,about_course : val6 }
      console.log(item);
      console.log(this.update_id);
      this.courseCollection.doc(this.update_id).update(item).then((res) => 
    {
      console.log(res);
      location.reload(true);
    });
  }
  delete() {
    console.log('call....delete  ===>' + event.srcElement.id);
    let val;
    val = event.srcElement.id;
    let id;
    const res = (this.courseCollection.ref.where('course_name', '==', val).get().then(
      function a(querySnapshot) {
        querySnapshot.forEach(function (doc) {
          console.log(doc.id);
          id = doc.id;
     });
      }
    )).then(() => {
console.log("iddddddd" + id);
      this.courseCollection.doc(id).delete().then((res) =>
    {
      console.log(res);
      //location.reload(true);
    });
    });

  


  }

  openModule() {

    document.getElementById('myModal').style.display = 'block';
  }
  spanClick() {
    document.getElementById('myModal').style.display = 'none';

  }
  onChangeTime(){
    console.log('hello');
  }

}
