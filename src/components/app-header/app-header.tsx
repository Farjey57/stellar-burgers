import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/user';

export const AppHeader: FC = () => {
  const user = useSelector(userSelectors.getUser);

  return <AppHeaderUI userName={user?.name} />;
};
