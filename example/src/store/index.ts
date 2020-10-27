import { createStore } from '@wellyes/redux-kit';

import { rootReducer } from './root.reducer';

export const store = createStore(rootReducer);
