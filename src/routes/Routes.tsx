import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import SearchPage from '../pages/SearchPage/SearchPage';
import ComicsPage from '../pages/ComicsPage/ComicsPage';
import NotFound from '../pages/NotFound/NotFound';

class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/' component={SearchPage} />
                <Route path='/comics/:characterId' component={ComicsPage} />
                <Route component={NotFound} />
            </Switch>
        )
    }
}

export default Routes