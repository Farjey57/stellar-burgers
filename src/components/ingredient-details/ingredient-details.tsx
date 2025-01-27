import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { ingredientsSelectors } from '../../services/slices/ingredients';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const ingredientData = useSelector((state) =>
    ingredientsSelectors.getIngredientsById(state, params.id)
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
