import { observable, action } from 'mobx';
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import { observer, PropTypes as ObservablePropTypes } from 'mobx-react';


class Store {
    @observable cache = { queue: [] }
    @action refresh = () => {
        this.cache.queue.push(1);
    }
}
const store = new Store();

@observer
class Bar extends Component {
    static propTypes = {
        queue: PropTypes.array
        // queue: ObservablePropTypes.observableArray
    };
    render() {
        const queue = this.props.queue;
        return <span>{queue.length}</span>
    }
}
class Foo extends Component {
    static propTypes = {
        cache: PropTypes.object
        // cache: ObservablePropTypes.observableObject
    };
    render() {
        const cache = this.props.cache;
        return <div>
            <button onClick={this.props.refresh}>Refresh</button>
            <Bar queue={cache.queue}></Bar>
        </div>
    }
}

ReactDom.render(<Foo cache={store.cache} refresh={store.refresh}></Foo>, document.querySelector('#root'))