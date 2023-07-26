import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { AppRootStateType } from '../store/store';

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
