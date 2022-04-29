import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { StatsContainer, ChartsContainer, Loading } from './../../components';

const Stats = () => {
  const { isLoading, monthlyApplications, showStats } = useAppContext();

  useEffect(() => {
    showStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
};

export default Stats;
