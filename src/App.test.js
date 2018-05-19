import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Link} from './App'

import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'
import { DOMElement } from "jsdom";

configure({ adapter: new Adapter() })

describe('<App/> shallow rendering', () => {
  it('should contain 1 p element', () => {
    const wrapper = shallow( <App /> )
    expect(wrapper.find('h1').text()).toBe("Welcome to React")
  })
  it('matches the snapshot', () => {
    const tree = shallow(<App/>)
    expect(toJson(tree)).toMatchSnapshot()
  })
})
describe('<App/> mount rendering', () => {
  it('should contain 1 p element', () => {
    const wrapper = mount( <App /> , { context: {}, attachTo: DOMElement })
    expect(wrapper.find('h1').text()).toBe("Welcome to React")
    wrapper.unmount()
  })
  it('matches the snapshot', () => {
    const tree = mount(<App/>)
    expect(toJson(tree)).toMatchSnapshot()
    tree.unmount()
  })
  it('updates component with new state', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find('.blue').length).toBe(1)
    expect(wrapper.find('.red').length).toBe(0)
    wrapper.setState({mainColor: 'red'})
    expect(wrapper.find('.blue').length).toBe(0)
    expect(wrapper.find('.red').length).toBe(1)
  })
  it('on button click changes p text', () => {
    const wrapper = shallow(<App />)
    const button = wrapper.find('button')
    expect(wrapper.find('.button-state').text()).toBe('No!')
    button.simulate('click')
    expect(wrapper.find('.button-state').text()).toBe('Yes!')
  })
  it('on input change, title changes text', () => {
    const wrapper = shallow(<App />)
    const input = wrapper.find('input')
    expect(wrapper.find('h3').text()).toBe('')
    input.simulate('change', {currentTarget: {value:'Ric'} })
    expect(wrapper.find('h3').text()).toBe('Ric')
  })
  it('calls componentDidMount, updates p tag ', () => {
    jest.spyOn(App.prototype, 'componentDidMount')
    const wrapper = shallow(<App />)
    expect(App.prototype.componentDidMount.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifeCycle').text()).toBe('componentDidMount')
  })
  it('setProps calls componentWillReceivePorops, updates p tag', () => {
    jest.spyOn(App.prototype, 'componentWillReceiveProps')
    const wrapper = shallow(<App/>)
    wrapper.setProps({ hide: true })
    expect(App.prototype.componentWillReceiveProps.mock.calls.length).toBe(1)
    expect(wrapper.find('.lifeCycle').text()).toBe('componentWillReceiveProps')
  })
  it('handlesString funditon returns correctly', () => {
    const wrapper = shallow(<App/>)
    const trueReturn = wrapper.instance().handleStrings('Hello World')
    const falseReturn = wrapper.instance().handleStrings('')
    expect(trueReturn).toBe(true)
    expect(falseReturn).toBe(true)
  })
})

describe('<Link /> shallow rendering', () => {
  it('link componpont accepts address prop', () => {
    const wrapper = shallow(<Link address="google.com"/>)
    expect(wrapper.instance().props.address).toBe('google.com')
  })
  it('a tag node renders href correctly', () => {
    const wrapper = shallow(<Link address='google.com' />)
    expect(wrapper.props().href).toBe('google.com')
  })
  it('returns null with true hide prop', () => {
    const wrapper = shallow(<Link hide={false} />)
    expect(wrapper.find('a').length).toBe(1)
    wrapper.setProps({hide:true})
    expect(wrapper.get(0)).toBeNull()
  })
})

/* 
describe('<Link /> mount rendering', () => {
  it('link componpont accepts address prop', () => {
    const wrapper = mount(<Link address="google.com"/>)
    expect(wrapper.instance().props.address).toBe('google.com')
  })
  it('a tag node renders href correctly', () => {
    const wrapper = mount(<Link address='google.com' />)
    expect(wrapper.props().href).toBe('google.com')
  })
  it('returns null with true hide prop', () => {
    const wrapper = mount(<Link hide={false} />)
    expect(wrapper.find('a').length).toBe(1)
    wrapper.setProps({hide:true})
    expect(wrapper.get(0)).toBeNull()
  })
})
 */

/* enzyme
disableLifecycleMethods  = ignores the CDM, CDU lifecyle methods
exisits()
children()
hasClass()
SELECTORS x 5
_CSS SELECTORS_
element           'h1'
class             '.class'
id                '#id'
attribute         '[href="ric"]'
operators         '+ - ~'
or combine        'a[href="ric"]'
_PROP SELECTORS_
find prop attr     '[text="something"]'
_Component Constructor_
using display name we can find pass that name as string
_Object Property Selector_
search for attributes like ' alt="logo" ' 
___________
enzyme-to-json, converts the shallow snapshot to a more human readable JSON
to update snapshots in jest **press u**

*/