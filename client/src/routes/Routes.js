import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HeroPage from '../views/heroPage/HeroPage';

function Routes() {
    return (

        <Switch>
            <Route exact path = '/' component = {HeroPage}></Route>

        </Switch>
    )
}
export default HeroPage