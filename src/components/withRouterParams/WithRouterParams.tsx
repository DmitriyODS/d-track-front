import React from 'react';
import { useParams } from 'react-router-dom';

function withRouterParams(Component: any) {
  function ComponentWithRouterParams(props: any) {
    let params = useParams();
    return <Component routerParams={params} {...props} />;
  }

  return ComponentWithRouterParams;
}

export default withRouterParams;
