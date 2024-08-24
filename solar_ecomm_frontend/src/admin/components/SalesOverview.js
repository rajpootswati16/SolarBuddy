import React from 'react'
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { dataset } from '../Data/dataset';

export default function SalesOverview() {

    const chartSetting = {
        yAxis: [
          {
            label: 'Solar Products (pcs)',
          },
        ],
        width: 600,
        height: 330,
        sx: {
          [`.${axisClasses.left} .${axisClasses.label}`]: {
            transform: 'translate(-12px, 0)',
          },
        },
      };

    const valueFormatter = (value) => `${value}pcs`;  

  return (
    <div style={{display:'flex',width:'60%',height:'73%',background:'#dfe6e9',borderRadius:'10px',flexDirection:'column'}}>
      <div style={{fontWeight:600,fontSize:'1.5vw',paddingLeft:'2vw',paddingTop:'1vw'}}>
          Overview
        </div>
      <div>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',paddingLeft:'2vw',fontWeight:'bold',marginTop:'1.5vw'}}>
        <BarChart 
        dataset={dataset}
        xAxis={[{ scaleType: 'band', dataKey: 'month',label:'Month Sale (in pcs)' }]}
        series={[
          { dataKey: 'HAVELLES', label: 'HAVELLES', valueFormatter },
          { dataKey: 'WAAREE', label: 'WAAREE', valueFormatter },
          { dataKey: 'Luminous', label: 'Luminous', valueFormatter },
          { dataKey: 'IncaSolar', label: 'Inca Solar', valueFormatter },
        ]}
        {...chartSetting}
        />
      </div>
      </div>
      
    </div>
  )
}
