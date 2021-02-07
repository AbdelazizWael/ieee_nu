export const header = () => ({
    headers: {
        'Authorization': 'Token ' + localStorage.getItem('token')
    }
});

export const managePaginatedState = (operation, state, object) => {
    const results = state.results || [];
    console.log(state)

    const skeleton = {
        count: state.count || 0,
        next: state.next || null,
        previous: state.previous || null,
        results: []
    }

    switch (operation) {

        case 'create':
            var newResults = [...results, object]
            return { ...skeleton, results: newResults, count: skeleton.count + 1 }

        case 'update':
            newResults = [];
            results.forEach(result => {
                if (result.id === object.id) {
                    newResults.push(object);
                } else {
                    newResults.push(result);
                }
            });
            return { ...skeleton, results: newResults };

        case 'delete':
            newResults = [];
            results.forEach(result => {
                if (result.id !== object) {
                    newResults.push(result);
                }
            });
            return { ...skeleton, results: newResults, count: skeleton.count - 1 };

        default:
            console.log('redux.utils.managePaginatedState has defaulted.')
            return state;
    }
}

export const manageState = (operation, state, object) => {
    switch (operation) {

        case 'create':
            return () => {
                return [...state, object]
            }

        case 'update':
            return () => {
                var newResults = [];
                state.forEach(result => {
                    if (result.id === object.id) {
                        newResults.push(object);
                    } else {
                        newResults.push(result);
                    }
                });
                return newResults;
            }

        case 'delete':
            return () => {
                var newResults = [];
                state.forEach(result => {
                    if (result.id !== object.id) {
                        newResults.push(result);
                    }
                });
                return newResults;
            }

        default:
            console.log('redux.utils.manageState has defaulted.')
            return state;
    }
}