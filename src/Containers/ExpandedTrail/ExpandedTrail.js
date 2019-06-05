import React, { Component } from 'react';
import Ratings from 'react-ratings-declarative';
import noPhoto from '../../Media/no-photo.png';
import './ExpandedTrail.scss'
import { getMyHikes} from '../../APICalls'


export class ExpandedTrail extends Component {
  constructor() {
    super()
    this.state = {trail: {}}
  }

  componentDidMount() {
    this.getAllTrailIfno(this.props.match.params.id)
  }

  handleClick = (e) => {
    window.history.back()
  }

  getAllTrailIfno = (id) => {
    getMyHikes(id)
    .then(result => this.setState({trail: result.trails[0]}))
  }  

  render() {
    const { name, difficulty, stars, starVotes, length, imgMedium, summary, conditionStatus, conditionDetails, conditionDate, low, ascent, descent, high, url } = this.state.trail
    const image = imgMedium || noPhoto
    const bg = {backgroundImage: `url(${image})`}
    const diff = `https://cdn.apstatic.com/img/diff/${difficulty}.svg`
    return (
      <div className='trail-overlay'>
        <div className='expanded-trail'>
          <section className='main-img' style={bg}>
            <article className='img-overlay'>
              <h1>{name}</h1>
              <Ratings rating={stars} widgetRatedColors='#df7975' title={starVotes}>
                <Ratings.Widget widgetDimension="25px"/>
                <Ratings.Widget widgetDimension="25px"/>
                <Ratings.Widget widgetDimension="25px"/>
                <Ratings.Widget widgetDimension="25px"/>
                <Ratings.Widget widgetDimension="25px"/>
              </Ratings>
            </article>
          </section>
          <section className='trail-description'>
            <article className='basic-info'>
              <img src={diff} alt={difficulty}/>
              <p>{stars} stars from {starVotes} votes</p>
              <p>{length} miles</p>
            </article>
            <article className='condition-elevation'>
              <div>
                <h1>Conditions</h1>
                <table>
                  <tbody>
                    <tr>
                      <td>Condition:</td>
                      <td>{conditionStatus}</td>
                    </tr>
                    <tr>
                      <td>Details:</td>
                      <td>{conditionDetails}</td>
                    </tr>
                    <tr>
                      <td>Date:</td>
                      <td>{conditionDate}.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h1>Elevation</h1>
                <table>
                  <tbody>
                    <tr> 
                      <td>Ascent</td>
                      <td>{ascent} ft.</td>
                    </tr>
                    <tr>
                      <td>Descent:</td>
                      <td>{descent} ft.</td>
                    </tr>
                    <tr>
                      <td>Highest Point:</td>
                      <td>{high} ft.</td>
                    </tr>
                    <tr>
                      <td>Lowest Point:</td>
                      <td>{low} ft.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </article>
            <article>
              <p>{summary}</p>
            </article>
            <article>
              <a href={url} target="_blank"  rel="noopener noreferrer">
                <button >
                  REI
                </button>
              </a>
              <button onClick={() => this.handleClick()}>x</button>
            </article>          
          </section>
        </div>
      </div>
    )
  }
}

export default ExpandedTrail;