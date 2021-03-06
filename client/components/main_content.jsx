import React, { Component } from 'react';

import IconRow from './icon_row';
import Testimonials from './testimonials';
import PH from './ph';
import Contact from './contact';

class MainContent extends Component {
  constructor(props) {
    super(props)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = { visItem: this.props.visItem }
  }

  componentWillReceiveProps(props){
    const navMap = this.returnNavMap();
    this.setState((prevState, currProps) => {
      return { ...prevState, visItem: currProps.visItem };
    });
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll() {
    const nav = document.querySelector('.nav.container')
    ,     mainBody = document.querySelector('.main-content').getBoundingClientRect()
    ,     navPosition = nav.getBoundingClientRect()

    if (navPosition.top <= 0 && this.state.visItem != 'contact') nav.classList.add('sticky')
    if (mainBody.top >= 0) nav.classList.remove('sticky')
  }


  handleClick(navItem, e){
    e.stopPropagation()
    this.setState({visItem: navItem.alias})
  }

  renderNav(){
    const navMap = this.returnNavMap();
    return navMap.map((navItem, i) => {
      let classes = (this.state.visItem == navItem.alias)
        ? "subtitle is-3 nav-item active"
        : "subtitle is-3 nav-item"

      return (
        <h2 className={classes}
            key={i}
            onClick={this.handleClick.bind(this, navItem)} >
          <span className="clickable" role="link">{navItem.name}</span>
        </h2>
      )
    });
  }

  renderSubsection(section){
    if (section == 'testimonials') return <Testimonials />
    if (section == 'ph-services') return <PH />
    if (section == 'contact') return <Contact />
    if (section == 'benefits' || section == 'why') return (
      <IconRow section={section} onClick={this.handleClick.bind(this, section)} />
    )
  }

  returnNavMap(){
    const navMap = [
      {
        id: 0,
        name: 'Benefits',
        alias: 'benefits',
      },
      {
        id: 1,
        name: 'Why Kinetico',
        alias: 'why',
      },
      {
        id: 2,
        name: 'Testimonials',
        alias: 'testimonials',
      },
      {
        id: 3,
        name: 'Plumbing and Heating Services',
        alias: 'ph-services',
      },
      {
        id: 4,
        name: 'Contact',
        alias: 'contact',
      },
    ]
    return navMap;
  }

  render(){
    const navMap = this.returnNavMap();

    return (
      <section className='main-content'>
        <article className="nav container">
          { this.renderNav(navMap) }
        </article>
        { this.renderSubsection(this.state.visItem) }
      </section>
    )
  }
}

export default MainContent
