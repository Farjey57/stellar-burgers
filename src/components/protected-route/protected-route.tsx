import { userSelectors } from '../../services/slices/user';
import { useSelector } from '../../services/store';
import { Preloader } from '@ui';
import { Navigate, useLocation } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth
}: ProtectedRouteProps) => {
  const user = useSelector(userSelectors.getUser);
  const userCheck = useSelector(userSelectors.getUserCheck);
  const location = useLocation();

  if (!userCheck) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const from = location.state?.from || { pathname: '/' };

    return (
      <Navigate to={from} state={{ background: from?.state?.background }} />
    );
  }

  if (!onlyUnAuth && !user) {
    return (
      <Navigate
        to='/login'
        state={{
          from: location
        }}
      />
    );
  }

  return children;
};
