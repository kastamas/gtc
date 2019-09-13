import { message } from 'antd';
import { EErrorStatus } from 'common/enums/ErrorStatus.enum';
import { communicationMovie } from 'entities/Movie/Movie.communication';
import { all, call, takeEvery } from 'redux-saga/effects';

function* errorWatcher() {
  yield takeEvery('*', function* logger(action: any) {
    if (action.type.match('FAIL')) {
      // const { status } = action.payload;

      //if (status === EErrorStatus.InternalServerError) {
      //message.error('Something went wrong, please contact the support');
      // }

      console.log('ERROR', action.payload);
    }
  });
}

export default function* rootSaga(): any {
  yield all([errorWatcher(), ...communicationMovie.sagas]);
}
