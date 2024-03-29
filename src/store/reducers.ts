import { ThunkDispatch } from 'redux-thunk';
import { combineReducers, Dispatch, Action } from 'redux';
import { PetsState } from './Pets/PetsState';
import { TodayState } from './Today/TodayState';
import { LoginState, SessionState } from './Login/LoginState';
import { CheckSessionReducer, LoginReducer } from './Login/reducer';
import { PetsReducer } from './Pets/reducer';
import { TodayReducer } from './Today/reducer';
import { TherapyReducer } from './Therapy/reducer';
import { TherapyState } from './Therapy/TherapyState';

export type RootState = {
    Pets: PetsState;
    Today: TodayState;
    Login: LoginState;
    Session: SessionState;
    Therapy: TherapyState;
};

export const reducers = combineReducers({
    Pets: PetsReducer,
    Today: TodayReducer,
    Login: LoginReducer,
    Session: CheckSessionReducer,
    Therapy: TherapyReducer,
});

export type RootStore = ReturnType<typeof reducers>;

export type DispatchType = Dispatch<Action> & ThunkDispatch<RootStore, any, Action>;
