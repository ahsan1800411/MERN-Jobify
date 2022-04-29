import React, { useState } from 'react';
import Wrapper from '../assets/wrappers/ChartsContainer';
import { useAppContext } from './../context/AppContext';
import AreaChart from './AreaChart';
import BarChart from './BarChart';
const ChartsContainer = () => {
  const [barChart, setBarChart] = useState(true);
  const { monthlyApplications: data } = useAppContext();
  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button type='button' onClick={() => setBarChart(!barChart)}>
        {barChart ? 'AreaChart' : 'BarChart'}
      </button>
      {barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
    </Wrapper>
  );
};

export default ChartsContainer;
