import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function AttendanceChart(){

const data = {

labels:["Present","Absent"],

datasets:[{

  data:[85,15],

  backgroundColor:[
    "#4CAF50",
    "#f44336"
  ]

}]
};

return(

<div style={{width:"300px",margin:"auto"}}>

  <h3>Attendance Percentage</h3>

  <Pie data={data} />

</div>


)
}
